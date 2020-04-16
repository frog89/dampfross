import React from 'react';
import { connect } from 'react-redux';
import { setKonvaRedraw } from '../actions/konvaActions';

import './Board.css';

class Board extends React.Component {
  setPuppet = (puppetCfg) => {
    this.props.setPuppetAction(puppetCfg);
  }

  addDrawLine = (drawLine) => {
    //console.log('addDrawLine', drawLine);
    this.props.addDrawLineAction(drawLine);
  }

  removeDrawLine = (drawLineId) => {
    //console.log('removeDrawLine', drawLineId);
    this.props.removeDrawLineAction(drawLineId);
  }

  componentDidMount() {
    this.redrawBoard();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.attendStatus.isKonvaRedrawNeeded) {
      console.log('konva redraw');
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

const addDrawLineAction = (drawLine) => {
  return {
    type: 'ADD_DRAWLINE',
    drawLine
  }
} 

const removeDrawLineAction = (drawLineId) => {
  return {
    type: 'REMOVE_DRAWLINE',
    drawLineId
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
    removeDrawLineAction: (drawLineId) => { dispatch(removeDrawLineAction(drawLineId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
