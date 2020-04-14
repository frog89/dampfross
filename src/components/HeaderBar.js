import React from 'react';
import Dices from './Dices';
import Menu from './Menu';

import Expand from '../images/expand.png';
import Collapse from '../images/collapse.png';
import { connect } from 'react-redux';
import './HeaderBar.css';

class HeaderBar extends React.Component {
  collapse = () => {
    this.props.setScoreTableVisibility(false);
  }
  expand = () => {
    this.props.setScoreTableVisibility(true);
  }
  render() {
    const visiButton = this.props.isScoreTableVisible ?
      <a href="/#"><img src={Collapse} alt="collapse" onClick={this.collapse}/></a> :
      <a href="/#"><img src={Expand} alt="expand" onClick={this.expand}/></a>
    return (
      <div className="container-fluid bg-dark text-light">
        <div className="row pt-1 pb-1">
          <div className="col-sm-8 col-md-8 col-lg-9 col-xl-10 align-self-center">
            <span 
                className="border border-primary rounded-pill dampfross-border-width align-middle p-1 mr-2"
              >
              <b className="p-3">Dampfross</b>
            </span>
            <Dices/>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-3 col-xl-2 align-self-center">
            <div style={{ textAlign: 'right'}}>
              <div className="row">
                <div className="col-9 align-self-center">
                  <Menu/>
                </div>
                <div className="col-3 align-self-center">
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

const setScoreTableVisibility = (isVisible) => {
  return {
    type: 'SET_SCORETABLE_VISIBILITY',
    isVisible
  }
} 

const mapStateToProps = (state) => {
  return {
    isScoreTableVisible: state.game.scoreTable.isVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreTableVisibility: (isVisible) => { dispatch(setScoreTableVisibility(isVisible)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);