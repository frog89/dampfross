import React from 'react';
import { connect } from 'react-redux';
import { setGame, setAutoReload } from '../actions/gameActions';
import { setResetScoreTableColumns } from '../actions/scoreTableActions';

class Menu extends React.Component {
  onAutoReloadOffClick = (event) => {
    this.props.setAutoReload(false);
  }

  // onSaveClick = (event) => {
  //   this.props.setSaveGameNeeded(true);
  // }

  getMixedNumbers(nums) {
    let numsMixed = [];
    while(nums.length){
      let rand = Math.floor(Math.random() * Math.floor(nums.length));
      numsMixed = numsMixed.concat(nums.splice(rand, 1));
    }
    return numsMixed;
  }
  
  onMixPlayersClick = (event) => {
    let len = this.props.game.players.length;
    let nums = [];
    for (let i = 0; i < len; i++) {
      nums.push(i);
    }
    nums = this.getMixedNumbers(nums);
    let mixedPlayers = [];
    for (let i = 0; i < len; i++) {
      let idx = nums[i];
      let p = this.props.game.players[idx];
      mixedPlayers.push(p);
    }
    let game = {...this.props.game};
    game.players = mixedPlayers;
    // console.log('onMixPlayersClick', mixedPlayers);

    this.saveAndReloadGame(game);
  }

  saveAndReloadGame = (game) => {
    this.props.cbSaveGame(game, 
      (game) => {
        this.props.setGame(game);
        this.props.setResetScoreTableColumns(true);
        this.props.setSaveGameNeeded(true);
        this.props.setReloadGameNeeded(true);
      }, (err) => {});
  }

  onLeaveClick = (event) => {
    this.props.resetState();
  }

  render() {
    return (
      <div className="btn-group">
        <button type="button" 
            className="btn btn-primary dropdown-toggle" 
            data-toggle="dropdown" 
            aria-haspopup="true" aria-expanded="false">
          Actions
        </button>
        <div className="dropdown-menu">
          {/* <a className="dropdown-item" href="/#" onClick={this.onSaveClick}>Save Game...</a> */}
          <a className="dropdown-item" href={`/maps/${this.props.board.mapPicture}`} target="_blank">Show Map</a>
          <a className="dropdown-item" href="/#" onClick={this.onAutoReloadOffClick}>Auto Reload Off</a>
          <a className="dropdown-item" href="/#" onClick={this.onMixPlayersClick}>Mix Players</a>
          <a className="dropdown-item" href="/#" onClick={this.onLeaveClick}>Leave Game</a>
        </div>
      </div>
    )
  }
}

const resetState = () => {
  return {
    type: 'RESET_STATE',
  }
} 

const mapStateToProps = (state) => {
  return {
    game: state.game,
    board: state.board
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAutoReload: isAutoReload => { dispatch(setAutoReload(isAutoReload)) },
    // setSaveGameNeeded: isNeeded => { dispatch(setSaveGameNeeded(isNeeded)) },
    resetState: () => { dispatch(resetState()) },
    setGame: (game) => { dispatch(setGame(game)) },
    setResetScoreTableColumns: isNeeded => { dispatch(setResetScoreTableColumns(isNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
