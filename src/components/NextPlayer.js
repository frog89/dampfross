import React from 'react';
import { connect } from 'react-redux';

import NextPlayerImg from '../images/next-player.png';
import { setGame } from '../actions/gameActions';

import './NextPlayer.css';

class NextPlayer extends React.Component {
  onNextPlayerClicked = (event) => {
    let players = this.props.game.players;
    let next = this.props.game.nextPlayerIndex + 1;
    if (next > players.length - 1) {
      next = 0;
    }
    console.log('onNextPlayerClicked-next:', next);
    let game = {...this.props.game}
    game.nextPlayerIndex = next;
    this.saveGame(game);
  }

  saveGame = (game) => {
    this.props.cbSaveGame(game, 
      (game) => {
        this.props.setGame(game);
      }, (err) => {});
  }

  render() {
    const nextPlayerButton = 
      <a href="/#"><img src={NextPlayerImg} alt="Next Player" 
        title="Set next player"
        onClick={this.onNextPlayerClicked}/></a>;

    let players = this.props.game.players;
    let playerIndex = this.props.game.nextPlayerIndex;
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

const mapStateToProps = (state) => {
  return {
    game: state.game,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGame: game => { dispatch(setGame(game)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NextPlayer);