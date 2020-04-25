import React from 'react';
import { connect } from 'react-redux';

import * as Constants from '../constants';
import './GameStatusWaiting.css';

class GameStatusWaiting extends React.Component {
  onStartButtonClicked = (event) => {
    let gameToSave = { ...this.props.game };
    gameToSave.status = Constants.GAME_STATUS_RUNNING;
    this.props.cbFuncs.cbSaveGame(gameToSave);
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

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameStatusWaiting);
