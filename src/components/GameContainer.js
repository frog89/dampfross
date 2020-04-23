import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import StartWizard from './game-start/StartWizard';
import App from './App';
import { setReloadGameNeeded, setSaveGameNeeded, saveGame, setGame, reloadGame } from '../actions/gameActions';
import { setKonvaRedrawNeeded } from '../actions/konvaActions';
import { setErrorMessage } from '../actions/messageActions';
import store from '../store';

class GameContainer extends React.Component {
  state = {
    isReloadInterrupted: false
  }

  doReloadGame = () => {
    const cbSuccess = (newGame) => {
      this.props.setErrorMessage(null);
      // console.log('doReloadGame-success', newGame);
      this.props.setGame(newGame);
      this.props.setKonvaRedrawNeeded(true);  
    }
    const cbErr = (err) => {
      console.log(err);
      this.props.setErrorMessage('Error reloading\\ngame!');
    }

    reloadGame(this.props.game._id, cbSuccess, cbErr);
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.isAutoReload && !this.state.isReloadInterrupted) {
        this.doReloadGame();
      }
    }, 10000);
  }

  doSaveGameWithCallbacks = (game, cbSuccess, cbError) => {
    this.setState({isReloadInterrupted: true});
    saveGame(game, (newGame) => {
      this.props.setErrorMessage(null);
      // console.log('Game saved');
      cbSuccess(newGame);
      this.setState({isReloadInterrupted: false});
    }, (err) => {
      console.log(err);
      this.props.setErrorMessage('Error saving\\ngame!');
      cbError(err);
      this.setState({isReloadInterrupted: false});
    });
  }

  doSaveGame = () => {
    this.doSaveGameWithCallbacks(this.props.game, (game) => {}, (err) => {});
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
      <StartWizard cbSaveGame={this.doSaveGameWithCallbacks}/>
      :
      <App cbSaveGame={this.doSaveGameWithCallbacks}/>;

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
    errorMessage: state.session.errorMessage,
    game: state.game
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGame: (game) => { dispatch(setGame(game)) },
    setKonvaRedrawNeeded: (isNeeded) => { dispatch(setKonvaRedrawNeeded(isNeeded)) },
    saveGame: (game, cbSuccess, cbError) => { dispatch(saveGame(game, cbSuccess, cbError)) },
    setSaveGameNeeded: (isNeeded) =>  { dispatch(setSaveGameNeeded(isNeeded)) },
    setReloadGameNeeded: (isNeeded) =>  { dispatch(setReloadGameNeeded(isNeeded)) },
    setErrorMessage: (message) =>  { dispatch(setErrorMessage(message)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);