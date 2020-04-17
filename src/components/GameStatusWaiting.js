import React from 'react';
import { connect } from 'react-redux';

import { setSaveGameNeeded } from '../actions/gameActions';
import * as Constants from '../constants';
import './GameStatusWaiting.css';

class GameStatusWaiting extends React.Component {
  onStartButtonClicked = (event) => {
    this.props.setGameStatus(Constants.GAME_STATUS_RUNNING);
    this.props.setSaveGameNeeded(true);
  }

  render() {
    return (
      <div className="row justify-content-start">
        <div className="col-auto align-self-center">
          <p className="narrow_text">Waiting for<br/>        
          other players...</p>
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

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameStatus: (status) => { dispatch(setGameStatus(status)) },
    setSaveGameNeeded: (isNeeded) => { dispatch(setSaveGameNeeded(isNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatusWaiting);
