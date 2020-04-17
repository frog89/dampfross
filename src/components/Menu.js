import React from 'react';
import { connect } from 'react-redux';

import { setReloadGameNeeded, setSaveGameNeeded } from '../actions/gameActions';

class Menu extends React.Component {
  onReloadClick = (event) => {
    this.props.setReloadGameNeeded(true);
  }

  onSaveClick = (event) => {
    this.props.setSaveGameNeeded(true);
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
        </div>
      </div>
    )
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
