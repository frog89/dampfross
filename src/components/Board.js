import React from 'react';
import { connect } from 'react-redux';

import './Board.css';

class Board extends React.Component {
  render() {
    return (
      <div id="konvaContainerOuter">
        <div id="konvaContainer">
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
