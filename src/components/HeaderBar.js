import React from 'react';
import Dices from './Dices';
import Expand from '../images/expand.png';
import Collapse from '../images/collapse.png';
import { connect } from 'react-redux';
import { setScoreTableVisibility } from '../actions/headerBarActions';

import './NavBar.css';

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
          <div className="col-1 align-self-center">
            <span className="border border-primary rounded-pill p-1 dampfross-border-width">
              <b>Dampfross</b>
            </span>
          </div>
          <div className="col-10 align-self-center">
            <Dices/>
          </div>
          <div className="col-1 align-self-center">
            <div style={{ textAlign: 'right'}}>
              {visiButton}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isScoreTableVisible: state.isScoreTableVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setScoreTableVisibility: (isVisible) => { dispatch(setScoreTableVisibility(isVisible)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);