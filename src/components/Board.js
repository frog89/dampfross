import React from 'react';
import { connect } from 'react-redux';
import './Board.css';

class Board extends React.Component {
  state = {
    combList: []
  }

  componentDidMount() {
    window.drawElements(this.props.board);
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
          <div id="container">
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    board: state.board
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteCard: (id) => { dispatch(deleteCard(id)) },
//     fetchUsers: () => { dispatch(fetchUsers()) }
//   }
// }

export default connect(mapStateToProps)(Board);
//export default Board;