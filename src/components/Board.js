import React from 'react';
import { connect } from 'react-redux';

import { setKonvaRedraw } from '../actions/konvaActions';
import { saveGame } from '../actions/gameActions';
import './Board.css';

class Board extends React.Component {
  saveTheGame() {
    saveGame(this.props.game, (newGame) => {
      console.log('Game saved');
      this.setState({saveButtonDisabledStyle: ''});
    }, (err) => console.log(err));
  }

  setPuppet = (puppetCfg) => {
    this.props.setPuppetAction(puppetCfg);
    this.saveTheGame();
  }

  addDrawLine = (drawLineCfg) => {
    this.props.addDrawLineAction(drawLineCfg);
    this.saveTheGame();
  }

  removeDrawLine = (mongoId) => {
    this.props.removeDrawLineAction(mongoId);
    this.saveTheGame();
  }

  componentDidMount() {
    this.redrawBoard();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.attendStatus.isKonvaRedrawNeeded) {
      //console.log('konva redraw');
      this.redrawBoard();
      setKonvaRedraw(false);
    }
  }

  redrawBoard() {
    window.drawElements(
      this.props.attendStatus, 
      this.props.board, 
      this.props.game, 
      this.setPuppet,
      this.addDrawLine,
      this.removeDrawLine);
  }

  render() {
    let largeContiWidth = window.innerWidth; //window.getCombRadius() * 2 * this.props.board.width;
    let largeContiHeight = window.innerHeight; //window.getCombRadius() * 2 * this.props.board.height;
    //console.log('large-container-size', largeContiWidth, largeContiHeight);

    return (
      <div id="scroll-container">
        <div id="large-container"
          style={{
            width: `${largeContiWidth}px`,
            height: `${largeContiHeight}px`
          }}
        >
          <div id="konvaContainer">
          </div>
        </div>
      </div>
    );
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
    attendStatus: state.attendStatus,
    game: state.game,
    board: state.board,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPuppetAction: (puppet) => { dispatch(setPuppetAction(puppet)) },
    addDrawLineAction: (drawLine) => { dispatch(addDrawLineAction(drawLine)) },
    removeDrawLineAction: (mongoId) => { dispatch(removeDrawLineAction(mongoId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
