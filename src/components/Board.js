import React from 'react';
import { connect } from 'react-redux';

import './Board.css';

class Board extends React.Component {
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


const mapStateToProps = (state) => {
  return {
    board: state.board,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
