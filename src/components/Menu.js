import React from 'react';
import { connect } from 'react-redux';

import { setGame, reloadGame } from '../actions/gameActions';
import { setKonvaRedraw } from '../actions/konvaActions';

class Menu extends React.Component {
  onReloadClick = (event) => {
    const cbSuccess = (newGame) => {
      console.log('onReloadClick', newGame);
      this.props.setGame(newGame);
      this.props.setKonvaRedraw(true);  
    }
    const cbErr = (err) => {
      console.log(err);
    }
    reloadGame(this.props.game._id, cbSuccess, cbErr)
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
          <a className="dropdown-item" href="/#" onClick={this.onReloadClick}>Reload Game...</a>
          <a className="dropdown-item" href="/#">Something else here</a>
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
    setGame: (game) => { dispatch(setGame(game)) },
    setKonvaRedraw: (isRedrawNeeded) => { dispatch(setKonvaRedraw(isRedrawNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
