import React from 'react';
import axios from 'axios';
import mongoose from 'mongoose';
import { connect } from 'react-redux';
import { getFirstRow } from '../../actions/scoreTableActions';
import * as Constants from '../../constants';
import './StartWizard.css';

class WizardNewGame extends React.Component {
  state = {
    playerName: '',
    gameName: '',
    gamePassword: '',
    penColor: '',
    boardId: '',
    boards: [],
    error: '',
  }

  componentDidMount() {
    this.fetchBoardNames();
  }

  fetchBoardNames = () => {
    axios.get('http://localhost:5000/boards')
      .then(( { data } ) => {
        this.setState({ boards: data.boards });
        this.setState({
          playerName: "Frank",
          gameName: "oesi",
          gamePassword: "xy",
          penColor: "darkorange",
          boardId: "5e95793a033c5c0f382b39ea"
        });
      })
      .catch(err => console.log(err));
  }
  
  createGame = () => {
    //console.log('createGame', this.state);
    let currentPlayer = {
      _id: mongoose.Types.ObjectId(),
      name: this.state.playerName,
      penColor: this.state.penColor
    };
    let players = [currentPlayer];
    let puppetPos = window.getPosForNewPuppet(0);
    let puppet = { x: puppetPos.x, y: puppetPos.y, playerId: currentPlayer._id }
    let firstScoreTableRow = getFirstRow(players);
    let game = {
      name: this.state.gameName,
      password: this.state.gamePassword,
      status: Constants.GAME_STATUS_WAITING_FOR_PLAYERS,
      players: players,
      dices: {
        redA: 0, whiteA: 0, redB: 0, whiteB: 0,
      },
      scoreTable: { 
        isVisible: true,
        rows: [firstScoreTableRow],
      },
      puppets: [puppet],
      drawLines: [],
      board: this.state.boardId,
    };

    axios.post('http://localhost:5000/games', game)
      .then((response) => {
        //console.log('create-new-success', response.data);
        this.loadBoard(response.data);
      })
      .catch(err => {
        console.log('create-new-err', err);
        this.setState({error: err.response.data.message});
      });
  }

  loadBoard = (game) => {
    axios.get(`http://localhost:5000/boards/${game.board}`)
    .then(( response ) => {
      //console.log('loadBoard', game, response.data);
      this.props.setPlayer(game.players[0]);
      this.props.setGameAndBoard(game, response.data);
    })
    .catch(err => console.log(err));
  }

  onPrevButtonClicked = (event) => {
    this.props.setStartWizardPage(1);
  }

  onNextButtonClicked = (event) => {
    this.createGame();
  }

  onPlayerNameChange = (event) => {
    this.setState({playerName: event.target.value});
  }
  
  onGameNameChange = (event) => {
    this.setState({gameName: event.target.value});
  }
  
  onGamePasswordChange = (event) => {
    this.setState({gamePassword: event.target.value});
  }

  onPenColorChange = (event) => {
    this.setState({penColor: event.target.value});
  }
  
  onBoardChange = (event) => {
    this.setState({boardId: event.target.value});
  }

  render() {
    const boardChooser = 
      <select className="combobox form-control" name="boardChooser" id="board"
        onChange={this.onBoardChange} value={this.state.boardId}
      >
        <option value="">Select Board</option> 
        {
          this.state.boards.map((board, key) => {
            return <option value={board._id} key={key}>{board.name}</option>;
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
      this.state.gameName && this.state.gameName.length > 0 &&
      this.state.gamePassword && this.state.gamePassword.length > 0 &&
      this.state.penColor && this.state.penColor.length > 0 &&
      this.state.boardId && this.state.boardId.length > 0) ?
      '' : 'disabled';

    return (
      <div className="card text-center align-middle mt-3">
        <div className="card-header">
          <h5>New Game Settings</h5>
        </div>
        <div className="card-body">
          <div className="form-group text-left">
            <label htmlFor="player">Player Name:</label>
            <input type="text" className="form-control" id="player" placeholder="Enter name..."
              onChange={this.onPlayerNameChange} value={this.state.playerName}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game Name:</label>
            <input type="text" className="form-control" id="gameName" placeholder="Enter name..."
              onChange={this.onGameNameChange} value={this.state.gameName}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game Password:</label>
            <input type="password" className="form-control" id="gamePassword" placeholder="Enter password..."
              onChange={this.onGamePasswordChange} value={this.state.gamePassword}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="board">Board:</label>
            {boardChooser}
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

export const fetchUsers = () => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(( { data} ) => {
        dispatch({
          type: 'FETCH_USERS',
          payload: data
        })

      })
  }
}

const setGameAndBoard = (game, board) => {
  return {
    type: 'SET_GAME_AND_BOARD',
    game: game,
    board: board
  }
} 

const setStartWizardPage = (page) => {
  return {
    type: 'SET_START_WIZARD_PAGE',
    page
  }
} 

const mapStateToProps = (state) => {
  return {
    penColors: state.attendStatus.penColors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStartWizardPage: (page) => { dispatch(setStartWizardPage(page)) },
    setGameAndBoard: (game, board) => { dispatch(setGameAndBoard(game, board)) },
    setPlayer: (player) => { dispatch(setPlayer(player)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardNewGame);
