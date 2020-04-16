import React from 'react';
import Dices from './Dices';
import Menu from './Menu';
import CurrentPlayerInfo from './CurrentPlayerInfo';
import GameStatusWaiting from './GameStatusWaiting'

import Expand from '../images/expand.png';
import Collapse from '../images/collapse.png';
import AutoReload from '../images/auto-reload.png';
import NoAutoReload from '../images/no-auto-reload.png';
import { connect } from 'react-redux';
import { saveGame } from '../actions/gameActions';
import * as Constants from '../constants';

import './HeaderBar.css';

class HeaderBar extends React.Component {
  state = {
    saveButtonDisabledStyle: ''
  }

  collapse = () => {
    this.props.setScoreTableVisibility(false);
  }
  expand = () => {
    this.props.setScoreTableVisibility(true);
  }
  
  onSaveButtonClicked = (event) => {
    this.setState({saveButtonDisabledStyle: 'disabled'});
    saveGame(this.props.game, (newGame) => {
      console.log('Game saved');
      this.setState({saveButtonDisabledStyle: ''});
    }, (err) => console.log(err));
  }

  switchAutoReloadOn = () => {
    this.props.setAutoReload(true);
  }

  switchAutoReloadOff = () => {
    this.props.setAutoReload(false);
  }

  render() {
    const saveButton = 
      <a href="/#" className={`btn btn-danger ${this.state.saveButtonDisabledStyle}`}
        onClick={this.onSaveButtonClicked}
      >
        Save
      </a>; 

    const autoReloadButton = this.props.attendStatus.isAutoReload ?
      <a href="/#"><img src={AutoReload} alt="AutoReload" onClick={this.switchAutoReloadOff}/></a> :
      <a href="/#"><img src={NoAutoReload} alt="NoAutoReload" onClick={this.switchAutoReloadOn}/></a>;

    const visiButton = this.props.game.scoreTable.isVisible ?
      <a href="/#"><img src={Collapse} alt="collapse" onClick={this.collapse}/></a> :
      <a href="/#"><img src={Expand} alt="expand" onClick={this.expand}/></a>;

    return (
      <div className="container-fluid bg-dark text-light">
        <div className="row pt-1 pb-1">
          <div className="col-sm-6 col-md-6 col-lg-7 col-xl-7 align-self-center">
            <div className="row justify-content-start">
              <div className="col-auto align-self-center">
                <span 
                    className="border border-primary rounded-pill dampfross-border-width align-middle p-1"
                  >
                  <b className="p-3">Dampfross</b>
                </span>
              </div>
              <div className="col-auto align-self-center">
                {saveButton}
              </div>        
              <div className="col-auto align-self-center">
                {autoReloadButton}
              </div>        
              {
                (this.props.game.status === Constants.GAME_STATUS_WAITING_FOR_PLAYERS) ?
                <div className="col-auto align-self-center">
                  <GameStatusWaiting/>
                </div>
                :
                <div className="col-auto align-self-center">
                  <Dices/>
                </div>  
              }
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-5 col-xl-5 align-self-center">
            <div style={{ textAlign: 'right'}}>
              <div className="row justify-content-end">
                <div className="col-auto align-self-center">
                  <Menu/>
                </div>
                <div className="col-auto align-self-center">
                  <CurrentPlayerInfo player={this.props.attendStatus.player}/>
                </div>
                <div className="col-auto align-self-center">
                  {visiButton}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const setAutoReload = (isAutoReload) => {
  return {
    type: 'SET_AUTO_RELOAD',
    isAutoReload
  }
} 

const setScoreTableVisibility = (isVisible) => {
  //console.log('setScoreTableVisibility:');
  return {
    type: 'SET_SCORETABLE_VISIBILITY',
    isVisible
  }
} 

const mapStateToProps = (state) => {
  return {
    attendStatus: state.attendStatus,
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreTableVisibility: (isVisible) => { dispatch(setScoreTableVisibility(isVisible)) },
    setAutoReload: (isAutoReload) => { dispatch(setAutoReload(isAutoReload)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);