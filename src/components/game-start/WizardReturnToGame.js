import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setAutoReload } from '../../actions/gameActions';
import { setGameStarting, setStartWizardPage } from '../../actions/startWizardActions';
import './StartWizard.css';

class WizardReturnToGame extends React.Component {
  state = {
    gamePassword: '',

    playerNames: [],
    playerName: '',
    
    gameNames: [],
    gameId: '',

    game: null,
    board: null,

    error: '',
  }

  componentDidMount() {
    this.fetchGameNames();
  }

  fetchGameNames = () => {
    axios.get('/games')
      .then((response) => {
        this.setState({ gameNames: response.data.games });
        // this.setState({ gamePassword: 'denni' });
      })
      .catch(err => console.log(err));
  }

  onSelectedGameChange = (event) => {
    let gameId = event.target.value;
    //console.log('onSelectedGameChange:', gameId);
    this.setState({gameId});
    this.loadGame(gameId);
  }

  loadGame = (gameId) => {
    this.setState({ error: null });
    axios.get(`/games/${gameId}`)
    .then((response) => {
      let game = response.data;
      // console.log('loadGame-scoreTable rows:', game.scoreTable.rows.length);
      this.loadBoard(game);
    })
    .catch(err => {
      console.log('loadGame', err);
      this.setState({ error: err });
    });
  }

  loadBoard = (game) => {
    axios.get(`/boards/${game.board}`)
    .then(( response ) => {
      let board = response.data;
      let playerNames = game.players.map(g => g.name);
      this.setState({
        game,
        board,
        playerName: '',
        playerNames: playerNames
      });
    })
    .catch(err => {
      console.log('loadBoard', err);
      this.setState({ error: err });
    });
  }

  onPlayerNameChanged = (event) => {
    let playerName = event.target.value;
    let player = this.state.game.players.find(p => p.name === playerName);
    // console.log('onPlayerNameChanged:', playerName, player);
    this.setState({
      playerName,
      player
    });
  }
    
  onGamePasswordChange = (event) => {
    let pwd = event.target.value;
    // console.log('onGamePasswordChange:', pwd);
    this.setState({gamePassword: pwd});
  }

  onPrevButtonClicked = (event) => {
    this.props.setStartWizardPage(1);
  }

  onNextButtonClicked = (event) => {
    if (this.state.game.password !== this.state.gamePassword) {
      this.setState({
        error: 'Wrong game password!'
      });
      return;
    }

    this.props.setPlayer(this.state.player);
    this.props.setGameAndBoard(this.state.game, this.state.board);
    this.props.setAutoReload(true);
    this.props.setGameStarting(false);
  }

  render() {
    const gameChooser = 
      <select className="combobox form-control" name="gameChooser" id="game"
        onChange={this.onSelectedGameChange} value={this.state.gameId}
      >
        <option value="">Select Game</option> 
        {
          this.state.gameNames.map((game, key) => {
            return <option value={game._id} key={key}>{game.name}</option>;
          })
        } 
      </select>;

    const playerChooser = 
      <select className="combobox form-control" name="colorChooser" id="penColor"
        onChange={this.onPlayerNameChanged} value={this.state.playerName}
      >
        <option value="">Select your name</option>
        {
          this.state.playerNames.map((name, key) => {
            return <option value={name} key={key}
            >
              {name}
            </option>;
          })
        } 
      </select>;
    
    const nextButtonDisabledStyle = 
      (this.state.playerName && this.state.playerName.length > 0 &&
      this.state.gameId && this.state.gameId.length > 0 &&
      this.state.gamePassword && this.state.gamePassword.length > 0) ?
      '' : 'disabled';

    return (
      <div className="card text-center align-middle mt-3">
        <div className="card-header">
          <h5>Return to Game Settings</h5>
        </div>
        <div className="card-body">

          <div className="form-group text-left">
            <label htmlFor="game">Game Password:</label>
            <input type="password" className="form-control" id="gamePassword" placeholder="Enter password..."
              onChange={this.onGamePasswordChange} value={this.state.gamePassword}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game:</label>
            {gameChooser}
          </div>

          <div className="form-group text-left">
            <label htmlFor="player">Player:</label>
            {playerChooser}
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
    setAutoReload: (isAutoReload) => { dispatch(setAutoReload(isAutoReload)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardReturnToGame);
