import React from 'react';
import { connect } from 'react-redux';

import { setKonvaRedrawNeeded, setKonvaDeleteNeeded } from '../actions/konvaActions';
import './Board.css';

class Board extends React.Component {
  setPuppet = (puppetCfg) => {
    // console.log('setPuppet');
    this.props.setPuppetAction(puppetCfg);
    this.props.cbFuncs.cbSaveGame(this.props.game);
  }

  addDrawLine = (drawLineCfg) => {
    // console.log('addDrawLine:');
    this.props.addDrawLineAction(drawLineCfg);
    this.props.cbFuncs.cbSaveGame(this.props.game);
  }

  removeDrawLine = (mongoId) => {
    // console.log('removeDrawLine:');
    this.props.removeDrawLineAction(mongoId);
    this.props.cbFuncs.cbSaveGame(this.props.game);
  }

  componentDidMount() {
    this.redrawBoard();
  }

  redrawBoard() {
    window.drawElements(
      this.props.session, 
      this.props.board, 
      this.props.game, 
      this.setPuppet,
      this.addDrawLine,
      this.removeDrawLine);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.session.isKonvaDeleteNeeded) {
      this.props.setKonvaDeleteNeeded(false);
      console.log('konva delete');
      window.deleteElements();
    }
    if (this.props.session.isKonvaRedrawNeeded) {
      this.props.setKonvaRedrawNeeded(false);
      console.log('konva redraw');
      this.redrawBoard();
    }
  }

  render() {
    //let largeContiWidth = window.innerWidth + window.getCombRadius() * 0.5 * this.props.board.width;
    //let largeContiHeight = window.innerHeight + window.getCombRadius() * 0.5 * this.props.board.height;
    //console.log('large-container-size', largeContiWidth, largeContiHeight);
    let largeContiWidth = window.getCombRadius() * 3 * this.props.board.width;
    let largeContiHeight = window.getCombRadius() * 3 * this.props.board.height;

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
    session: state.session,
    game: state.game,
    board: state.board,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPuppetAction: (puppet) => { dispatch(setPuppetAction(puppet)) },
    addDrawLineAction: (drawLine) => { dispatch(addDrawLineAction(drawLine)) },
    removeDrawLineAction: (mongoId) => { dispatch(removeDrawLineAction(mongoId)) },
    setKonvaRedrawNeeded: (isNeeded) => { dispatch(setKonvaRedrawNeeded(isNeeded)) },
    setKonvaDeleteNeeded: (isNeeded) => { dispatch(setKonvaDeleteNeeded(isNeeded)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
