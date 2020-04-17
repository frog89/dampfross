import React from 'react';
import { connect } from 'react-redux';

import NextPlayerImg from '../images/next-player.png';
import { setSaveGameNeeded } from '../actions/gameActions';

import './NextPlayer.css';

class NextPlayer extends React.Component {
  onNextPlayerClicked = (event) => {
    let players = this.props.game.players;
    let next = this.props.nextPlayerIndex + 1;
    if (next > players.length - 1) {
      next = 0;
    }
    this.props.setNextPlayer(next);
    this.props.setSaveGameNeeded(true);
  }

  render() {
    const nextPlayerButton = 
      <a href="/#"><img src={NextPlayerImg} alt="Next Player" 
        title="Set next player"
        onClick={this.onNextPlayerClicked}/></a>;

    let players = this.props.game.players;
    let playerIndex = this.props.nextPlayerIndex;
    let playerName = players[playerIndex].name;
    return (
      <div className="row justify-content-start">
        <div className="col-auto align-self-center">
          <p className="next_player_text">Current Player:<br/>{playerName}</p>
        </div>
        <div className="col-auto align-self-center">
          {nextPlayerButton}
        </div>
      </div>
    )
  }
}

const setNextPlayer = (playerIndex) => {
  return {
    type: 'SET_NEXT_PLAYER',
    playerIndex
  }
} 

const mapStateToProps = (state) => {
  return {
    nextPlayerIndex: state.session.nextPlayerIndex,
    game: state.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNextPlayer: playerIndex => { dispatch(setNextPlayer(playerIndex)) },
    setSaveGameNeeded: isNeeded => { dispatch(setSaveGameNeeded(isNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextPlayer);