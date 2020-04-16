import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setKonvaRedraw } from '../actions/konvaActions';

class Menu extends React.Component {
  onReloadClick = (event) => {
    axios.get(`http://localhost:5000/games/${this.props.game._id}`)
    .then((response) => {
      let game = response.data;
      console.log('onReloadClick', game);
      this.props.setGame(game);
      this.props.setKonvaRedraw(true);
    })
    .catch(err => {
      console.log('loadGame', err);
      this.setState({ error: err });
    });
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

const setGame = (game) => {
  return {
    type: 'SET_GAME',
    game: game,
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
