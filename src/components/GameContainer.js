import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import StartWizard from './game-start/StartWizard';
import App from './App';
import { saveGame, setGame, reloadGame } from '../actions/gameActions';
import { setErrorMessage } from '../actions/messageActions';
import store from '../store';

class GameContainer extends React.Component {
  state = {
    isBoardInitialized: false,
    isReloadInterrupted: false,
  }

  componentDidMount() {
    console.log('GameContainer-componentDidMount:');
    setInterval(() => {
      if (this.props.isAutoReload && !this.state.isReloadInterrupted) {
        this.doReloadGame();
      }
    }, 10000);
  }

  componentDidUpdate(prevProps, prevState) {
    let konvaContainer = document.getElementById('konvaContainer');
    if (konvaContainer && !this.state.isBoardInitialized) {
      this.setState({isBoardInitialized: true});
      this.doRedrawBoard();
    }
  }

  doReloadGame = (cbSuccess, cbError) => {
    reloadGame(this.props.game._id, 
      (newGame) => {
      this.props.setErrorMessage(null);
      //console.log('doReloadGame-success', newGame);
      this.props.setGame(newGame);
      this.doRedrawBoard();
      cbSuccess && cbSuccess(newGame);
    }, (err) => {
      console.log(err);
      this.props.setErrorMessage('Error reloading\\ngame!');
      cbError && cbError(err);
    });
  }

  doSaveGame = (game, cbSuccess, cbError) => {
    this.setReloadInterrupted('GameContainer-50', true);
    saveGame(game, (newGame) => {
      // console.log('Game saved');
      this.props.setErrorMessage(null);
      this.props.setGame(newGame);
      cbSuccess && cbSuccess(newGame);
      this.setReloadInterrupted('GameContainer-56', false);
    }, (err) => {
      console.log(err);
      this.props.setErrorMessage('Error saving\\ngame!');
      cbError && cbError(err);
      this.setReloadInterrupted('GameContainer-56', false);
    });
  }

  setReloadInterrupted = (demandedBy, isInterrupted) => {
    console.log('setReloadInterrupted:', demandedBy, isInterrupted);
    this.setState({isReloadInterrupted: isInterrupted});
  }

  doRedrawBoard = () => {
    window.drawElements(
      this.props.session, 
      this.props.board, 
      this.props.game, 
      this.setPuppet,
      this.addDrawLine,
      this.removeDrawLine,
      this.isCurrentPlayerEqualLoginPlayer,
      this.setReloadInterrupted);
  }

  setPuppet = (puppetCfg) => {
    // console.log('setPuppet');
    this.props.setPuppetAction(puppetCfg);
    this.doSaveGame(this.props.game);
  }

  addDrawLine = (drawLineCfg) => {
    // console.log('addDrawLine:');
    this.props.addDrawLineAction(drawLineCfg);
    this.doSaveGame(this.props.game);
  }

  removeDrawLine = (mongoId) => {
    // console.log('removeDrawLine:');
    this.props.removeDrawLineAction(mongoId);
    this.doSaveGame(this.props.game);
  }

  doDeleteBoard = () => {
    this.setState({isBoardInitialized: false});
    window.deleteElements();
  }

  isCurrentPlayerEqualLoginPlayer = () => {
    return this.props.game.players[this.props.game.nextPlayerIndex]._id === this.props.session.player._id;
  }
  
  render() {
    let funcs = { 
      cbReloadGame: this.doReloadGame,
      cbSaveGame: this.doSaveGame,
      cbRedrawBoard: this.doRedrawBoard,
      cbDeleteBoard: this.doDeleteBoard,
      cbIsCurrentPlayerEqualLoginPlayer: this.isCurrentPlayerEqualLoginPlayer,
    };
    let game = (this.props.isGameStarting) ?
      <StartWizard cbFuncs={funcs}/>
      :
      <App cbFuncs={funcs}/>;

    return (
      <Provider store={store}>
        {game}   
      </Provider>
    )
  }
}

const setPuppetAction = (puppetCfg) => {
  return {
    type: 'SET_PUPPET',
    puppetCfg
  }
} 

const addDrawLineAction = (drawLineCfg) => {
  return {
    type: 'ADD_DRAWLINE',
    drawLineCfg
  }
} 

const removeDrawLineAction = (mongoId) => {
  return {
    type: 'REMOVE_DRAWLINE',
    mongoId
  }
} 

const mapStateToProps = (state) => {
  return {
    isAutoReload: state.session.isAutoReload,
    isGameStarting: state.session.isGameStarting,
    errorMessage: state.session.errorMessage,
    session: state.session, 
    game: state.game,
    board: state.board,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGame: (game) => { dispatch(setGame(game)) },
    saveGame: (game, cbSuccess, cbError) => { dispatch(saveGame(game, cbSuccess, cbError)) },
    setErrorMessage: (message) =>  { dispatch(setErrorMessage(message)) },
    setPuppetAction: (puppet) => { dispatch(setPuppetAction(puppet)) },
    addDrawLineAction: (drawLine) => { dispatch(addDrawLineAction(drawLine)) },
    removeDrawLineAction: (mongoId) => { dispatch(removeDrawLineAction(mongoId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);