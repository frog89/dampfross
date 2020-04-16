import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import StartWizard from './game-start/StartWizard';
import App from './App';
import { setGame, reloadGame } from '../actions/gameActions';
import { setKonvaRedraw } from '../actions/konvaActions';
import store from '../store';

class GameContainer extends React.Component {
  componentDidMount() {
    const cbSuccess = (newGame) => {
      console.log('onReloadClick', newGame);
      this.props.setGame(newGame);
      this.props.setKonvaRedraw(true);  
    }
    const cbErr = (err) => {
      console.log(err);
    }
    
    setInterval(() => {
      if (this.props.attendStatus.isAutoReload) {
        reloadGame(this.props.game._id, cbSuccess, cbErr);
      }
    }, 10000);
  }
  render() {
    let game = (this.props.attendStatus.isGameStarting) ?
      <StartWizard/>
      :
      <App/>;

    return (
      <Provider store={store}>
        {game}   
      </Provider>
    )
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
    setGame: (game) => { dispatch(setGame(game)) },
    setKonvaRedraw: (isRedrawNeeded) => { dispatch(setKonvaRedraw(isRedrawNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);