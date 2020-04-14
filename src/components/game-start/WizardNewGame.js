import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './StartWizard.css';

class WizardNewGame extends React.Component {
  state = {
    playerName: null,
    gameName: null,
    gamePassword: null,
    penColor: null,
    boardId: null,
    boards: [],
    error: null,
  }

  componentDidMount() {
    this.fetchBoardNames();
  }

  fetchBoardNames = () => {
    axios.get('http://localhost:5000/boards')
      .then(( { data } ) => {
        this.setState({ boards: data.boards });
      })
      .catch(err => console.log(err));
  }
  
  createGame = () => {
    console.log('createGame', this.state);
    let game = {
      name: this.state.gameName,
      password: this.state.gamePassword,
      players: [{
        name: this.state.playerName,
        penColor: this.state.penColor
      }],
      dices: {
        redA: 0, whiteA: 0, redB: 0, whiteB: 0,
      },
      scoreTable: { 
        isVisible: true,
        rows: [{
          no: 1,
          scores: [],
        }],  
      },
      puppets: [],
      drawLines: [],
      board: this.state.boardId,
    };

    axios.post('http://localhost:5000/games', game)
      .then((response) => {
        console.log('create-new-success', response.data);
        this.props.setGame(response.data);
      })
      .catch(err => {
        console.log('create-new-err', err);
        this.setState({error: err.response.data.message});
      });
  }
  prevButtonClicked = (event) => {
    this.props.setStartWizardPage(1);
  }

  nextButtonClicked = (event) => {
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
      <select className="combobox form-control" name="gameChooser" id="board"
        onChange={this.onBoardChange}
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
        onChange={this.onPenColorChange}
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
              onChange={this.onPlayerNameChange}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game Name:</label>
            <input type="text" className="form-control" id="gameName" placeholder="Enter name..."
              onChange={this.onGameNameChange}
            />
          </div>

          <div className="form-group text-left">
            <label htmlFor="game">Game Password:</label>
            <input type="password" className="form-control" id="gamePassword" placeholder="Enter password..."
              onChange={this.onGamePasswordChange}
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
          <button className="btn btn-primary" onClick={this.prevButtonClicked}>Prev</button>
          <a href="/#" className={`btn btn-primary ml-2 ${nextButtonDisabledStyle}`}
            onClick={this.nextButtonClicked}
          >
            Next
          </a>
        </div>
      </div>
    )
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

const setGame = (game) => {
  return (dispatch) => {
    axios.get(`http://localhost:5000/boards/${game.board}`)
      .then(( { data } ) => {
        console.log('setGame-board', data);
        dispatch({
          type: 'SET_GAME',
          game: game,
          board: data
        })
      })
      .catch(err => console.log(err));
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
    setGame: (game) => { dispatch(setGame(game)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardNewGame);
