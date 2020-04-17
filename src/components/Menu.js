import React from 'react';
import { connect } from 'react-redux';
import { setGameStarting, setStartWizardPage } from '../actions/startWizardActions';
import { setKonvaDeleteNeeded } from '../actions/konvaActions';
import { setAutoReload, setReloadGameNeeded, setSaveGameNeeded } from '../actions/gameActions';

class Menu extends React.Component {
  onReloadClick = (event) => {
    this.props.setReloadGameNeeded(true);
  }

  onSaveClick = (event) => {
    this.props.setSaveGameNeeded(true);
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
          <a className="dropdown-item" href="/#" onClick={this.onSaveClick}>Save Game...</a>
          <a className="dropdown-item" href="/#" onClick={this.onReloadClick}>Reload Game...</a>
          <a className="dropdown-item" href="/#" onClick={this.onLeaveClick}>Leave Game...</a>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReloadGameNeeded: (isNeeded) => { dispatch(setReloadGameNeeded(isNeeded)) },
    setSaveGameNeeded: (isNeeded) => { dispatch(setSaveGameNeeded(isNeeded)) },
    setStartWizardPage: (page) => { dispatch(setStartWizardPage(page)) },
    setGameStarting: (isStarting) => { dispatch(setGameStarting(isStarting)) },
    setAutoReload: (isAutoReload) => { dispatch(setAutoReload(isAutoReload)) },
    setKonvaDeleteNeeded: (isNeeded) => { dispatch(setKonvaDeleteNeeded(isNeeded)) },
    resetState: () => { dispatch(resetState()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
