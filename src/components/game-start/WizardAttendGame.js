import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import mongoose from 'mongoose';

import { setAutoReload, saveGame } from '../../actions/gameActions';
import { setGameStarting, setStartWizardPage } from '../../actions/startWizardActions';
import { setKonvaRedrawNeeded } from '../../actions/konvaActions';
import './StartWizard.css';

class WizardAttendGame extends React.Component {
  state = {
    playerName: '',
    gamePassword: '',
    penColor: '',
    gameId: '',
    games: [],
    error: '',
  }

  componentDidMount() {
    this.fetchGameNames();
  }

  fetchGameNames = () => {
    axios.get('http://localhost:5000/games/waiting')
      .then((response) => {
        this.setState({ games: response.data.games });
        this.setState({
          playerName: "Stephan",
          gamePassword: "xy",
          penColor: "darkgreen",
        });
      })
      .catch(err => console.log(err));
  }

  onGameChange = (event) => {
    this.setState({gameId: event.target.value});
  }

  loadGame = (gameId) => {
    axios.get(`http://localhost:5000/games/${gameId}`)
    .then((response) => {
      let game = response.data;
      //console.log('loadGame', game);
      if (game.players.find(p => p.name === this.state.playerName)) {
        this.setState({ error: 'Player does already exists. Choose another name!'});
        return;
      }
      if (game.players.find(p => p.penColor === this.state.penColor)) {
        this.setState({ error: 'Pen color does already exists. Choose another color!'});
        return;
      }
      if (game.password !== this.state.gamePassword) {
        this.setState({ error: 'Wrong game password!'});
        return;
      }
      this.loadBoard(game);
    })
    .catch(err => {
      console.log('loadGame', err);
      this.setState({ error: err });
    });
  }

  loadBoard = (game) => {
    axios.get(`http://localhost:5000/boards/${game.board}`)
    .then(( response ) => {
      let board = response.data;
      let currentPlayer = { 
        _id: mongoose.Types.ObjectId(),
        name: this.state.playerName,
        penColor: this.state.penColor
      };
      game.players.push(currentPlayer);

      let puppetPos = window.getPosForNewPuppet(game.puppets.length);
      let puppet = { x: puppetPos.x, y: puppetPos.y, playerId: currentPlayer._id }
      game.puppets.push(puppet);

      saveGame(game, 
        (game) => this.saveGameSuccessCallback(game, board, currentPlayer),
        (err) => this.saveGameErrorCallback(err));
    })
    .catch(err => {
      console.log('loadBoard', err);
      this.setState({ error: err });
    });
  }

  saveGameSuccessCallback = (game, board, player) => {
    this.props.setPlayer(player);
    this.props.setGameAndBoard(game, board);
    this.props.setAutoReload(true);
    this.props.setKonvaRedrawNeeded(true);
    this.props.setGameStarting(false);
  }

  saveGameErrorCallback = (err) => {
    console.log('saveGame-err', err);
    this.setState({error: err.data.message});
  };

  onPlayerNameChange = (event) => {
    this.setState({playerName: event.target.value});
  }
    
  onGamePasswordChange = (event) => {
    this.setState({gamePassword: event.target.value});
  }

  onPenColorChange = (event) => {
    this.setState({penColor: event.target.value});
  }

  onPrevButtonClicked = (event) => {
    this.props.setStartWizardPage(1);
  }

  onNextButtonClicked = (event) => {
    this.loadGame(this.state.gameId);
  }

  render() {
    const gameChooser = 
      <select className="combobox form-control" name="gameChooser" id="game"
        onChange={this.onGameChange} value={this.state.gameId}
      >
        <option value="">Select Game</option> 
        {
          this.state.games.map((game, key) => {
            return <option value={game._id} key={key}>{game.name}</option>;
          })
        } 
      </select>;

    const penChooser = 
      <select className="combobox form-control" name="colorChooser" id="penColor"
        onChange={this.onPenColorChange} value={this.state.penColor}
      >
        <option value="">Select Color</option>
        {
          this.props.penColors.map((color, key) => {
            return <option value={color.colorValue} key={key}
              style={{background: `${color.colorValue}`, color: 'black'}}
            >
              {color.colorName}
            </option>;
          })
        } 
      </select>;
    
    const nextButtonDisabledStyle = 
      (this.state.playerName && this.state.playerName.length > 0 &&
      this.state.gameId && this.state.gameId.length > 0 &&
      this.state.gamePassword && this.state.gamePassword.length > 0 &&
      this.state.penColor && this.state.penColor.length > 0) ?
      '' : 'disabled';

    return (
      <div className="card text-center align-middle mt-3">
        <div className="card-header">
          <h5>Attend Game Settings</h5>
        </div>
        <div className="card-body">
          <div className="form-group text-left">
            <label htmlFor="player">Player Name:</label>
            <input type="text" className="form-control" id="player" placeholder="Enter name..."
              onChange={this.onPlayerNameChange} value={this.state.playerName}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game:</label>
            {gameChooser}
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game Password:</label>
            <input type="password" className="form-control" id="gamePassword" placeholder="Enter password..."
              onChange={this.onGamePasswordChange} value={this.state.gamePassword}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="penColor">Pen Color:</label>
            {penChooser}
          </div>

          <div className="form-group text-left">
          {
            (this.state.error) ?
            <p className="text-danger">{this.state.error}</p>
            :
            <span/>
          }
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-primary" onClick={this.onPrevButtonClicked}>Prev</button>
          <a href="/#" className={`btn btn-primary ml-2 ${nextButtonDisabledStyle}`}
            onClick={this.onNextButtonClicked}
          >
            Next
          </a>
        </div>
      </div>
    )
  }
}

const setPlayer = (player) => {
  return {
    type: 'SET_PLAYER',
    player: player,
  }
}

const setGameAndBoard = (game, board) => {
  return {
    type: 'SET_GAME_AND_BOARD',
    game: game,
    board: board
  }
} 

const mapStateToProps = (state) => {
  return {
    penColors: state.session.penColors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStartWizardPage: (page) => { dispatch(setStartWizardPage(page)) },
    setGameAndBoard: (game, board) => { dispatch(setGameAndBoard(game, board)) },
    setPlayer: (player) => { dispatch(setPlayer(player)) },
    setGameStarting: (isStarting) => { dispatch(setGameStarting(isStarting)) },
    setKonvaRedrawNeeded: (isRedrawNeeded) => { dispatch(setKonvaRedrawNeeded(isRedrawNeeded)) },
    setAutoReload: (isAutoReload) => { dispatch(setAutoReload(isAutoReload)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardAttendGame);
