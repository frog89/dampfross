import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import StartWizard from './game-start/StartWizard';
import App from './App';
import { setReloadGameNeeded, setSaveGameNeeded, saveGame, setGame, reloadGame } from '../actions/gameActions';
import { setKonvaRedraw } from '../actions/konvaActions';
import store from '../store';

class GameContainer extends React.Component {
  doReloadGame = () => {
    const cbSuccess = (newGame) => {
      console.log('onReloadClick', newGame);
      this.props.setGame(newGame);
      this.props.setKonvaRedraw(true);  
    }
    const cbErr = (err) => {
      console.log(err);
    }

    reloadGame(this.props.game._id, cbSuccess, cbErr);
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.isAutoReload) {
        this.doReloadGame();
      }
    }, 10000);
  }

  doSaveGame = () => {
    saveGame(this.props.game, (newGame) => {
      console.log('Game saved');
    }, (err) => console.log(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isSaveGameNeeded) {
      this.props.setSaveGameNeeded(false);
      this.doSaveGame();
    }
    if (this.props.isReloadGameNeeded) {
      this.props.setReloadGameNeeded(false);
      this.doReloadGame();
    }
  }

  render() {
    let game = (this.props.isGameStarting) ?
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
    isAutoReload: state.session.isAutoReload,
    isGameStarting: state.session.isGameStarting,
    isSaveGameNeeded: state.session.isSaveGameNeeded,
    isReloadGameNeeded: state.session.isReloadGameNeeded,
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGame: (game) => { dispatch(setGame(game)) },
    setKonvaRedraw: (isRedrawNeeded) => { dispatch(setKonvaRedraw(isRedrawNeeded)) },
    saveGame: (game, cbSuccess, cbError) => { dispatch(saveGame(game, cbSuccess, cbError)) },
    setSaveGameNeeded: (isNeeded) =>  { dispatch(setSaveGameNeeded(isNeeded)) },
    setReloadGameNeeded: (isNeeded) =>  { dispatch(setReloadGameNeeded(isNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);