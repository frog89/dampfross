import React from 'react';
import { connect } from 'react-redux';

import './Board.css';

class Board extends React.Component {
  setPuppets = (puppets) => {
    //console.log('puppets', puppets);
    this.props.setPuppetsAction(puppets);
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
    window.drawElements(this.props.board, 
      this.props.users, 
      this.setPuppets,
      this.addDrawLine,
      this.removeDrawLine);
  }

  render() {
    let largeContiWidth = window.innerWidth; //window.getCombRadius() * 2 * this.props.board.width;
    let largeContiHeight = window.innerHeight; //window.getCombRadius() * 2 * this.props.board.height;
    console.log('large-container-size', largeContiWidth, largeContiHeight);

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

const setPuppetsAction = (puppets) => {
  return {
    type: 'SET_PUPPETS',
    puppets
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
    board: state.board,
    users: state.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPuppetsAction: (puppets) => { dispatch(setPuppetsAction(puppets)) },
    addDrawLineAction: (drawLine) => { dispatch(addDrawLineAction(drawLine)) },
    removeDrawLineAction: (drawLineId) => { dispatch(removeDrawLineAction(drawLineId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
