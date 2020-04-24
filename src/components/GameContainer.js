import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import StartWizard from './game-start/StartWizard';
import App from './App';
import { saveGame, setGame, reloadGame } from '../actions/gameActions';
import { setKonvaRedrawNeeded } from '../actions/konvaActions';
import { setErrorMessage } from '../actions/messageActions';
import store from '../store';

class GameContainer extends React.Component {
  state = {
    isReloadInterrupted: false
  }

  doReloadGame = (cbSuccess, cbError) => {
    reloadGame(this.props.game._id, 
      (newGame) => {
      this.props.setErrorMessage(null);
      // console.log('doReloadGame-success', newGame);
      this.props.setGame(newGame);
      this.props.setKonvaRedrawNeeded(true);
      cbSuccess && cbSuccess(newGame);
    }, (err) => {
      console.log(err);
      this.props.setErrorMessage('Error reloading\\ngame!');
      cbError && cbError(err);
    });
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.isAutoReload && !this.state.isReloadInterrupted) {
        this.doReloadGame();
      }
    }, 10000);
  }

  doSaveGame = (game, cbSuccess, cbError) => {
    this.setState({isReloadInterrupted: true});
    saveGame(game, (newGame) => {
      this.props.setErrorMessage(null);
      // console.log('Game saved');
      cbSuccess && cbSuccess(newGame);
      this.setState({isReloadInterrupted: false});
    }, (err) => {
      console.log(err);
      this.props.setErrorMessage('Error saving\\ngame!');
      cbError && cbError(err);
      this.setState({isReloadInterrupted: false});
    });
  }

  render() {
    let game = (this.props.isGameStarting) ?
      <StartWizard cbFuncs={{ 
        cbReloadGame: this.doReloadGame,
        cbSaveGame: this.doSaveGame,
      }}/>
      :
      <App cbFuncs={{ 
        cbReloadGame: this.doReloadGame,
        cbSaveGame: this.doSaveGame,
      }}/>;

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
    errorMessage: state.session.errorMessage,
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGame: (game) => { dispatch(setGame(game)) },
    setKonvaRedrawNeeded: (isNeeded) => { dispatch(setKonvaRedrawNeeded(isNeeded)) },
    saveGame: (game, cbSuccess, cbError) => { dispatch(saveGame(game, cbSuccess, cbError)) },
    setErrorMessage: (message) =>  { dispatch(setErrorMessage(message)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);