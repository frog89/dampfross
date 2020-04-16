import React from 'react';
import { connect } from 'react-redux';

import { saveGame } from '../actions/gameActions';
import * as Constants from '../constants';

class GameStatusWaiting extends React.Component {
  onStartButtonClicked = (event) => {
    this.props.saveRunningGame();
  }

  render() {
    return (
      <div className="row justify-content-start">
        <div className="col-auto align-self-center">
          <span>Waiting for other players...</span>
        </div>
        <div className="col-auto align-self-center">
          <a href="/#" className="btn btn-primary"
            onClick={this.onStartButtonClicked}
          >
            Start Game
          </a>        
        </div>
      </div>
    )
  }
}

const setGameStatus = (status) => {
  return {
    type: 'SET_GAME_STATUS',
    status
  }
}
const saveChangedGame = (game) => {
  return (dispatch) => {
    saveGame(game, (newGame) => {
      dispatch({
        type: 'SAVE_GAME'
      });
    }, (err) => console.log(err))
  }
}

const saveRunningGame = () => {
  return (dispatch, getState) => {
    dispatch(setGameStatus(Constants.GAME_STATUS_RUNNING));

    let state = getState();
    dispatch(saveChangedGame(state.game));
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameStatus: (status) => { dispatch(setGameStatus(status)) },
    saveChangedGame: (game) => { dispatch(saveChangedGame(game)) },
    saveRunningGame: () => { dispatch(saveRunningGame()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatusWaiting);
