import React from 'react';
import Board from './Board';
import HeaderBar from './HeaderBar';
import ScoreTable from './ScoreTable';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
  render() {
    const bodyPart = this.props.isScoreTableVisible ?
      <div className="row">
        <div className="col-8 col-xl-9 pr-1">
          <Board cbFuncs={this.props.cbFuncs} />
        </div>
        <div className="col-4 col-xl-3 pl-1">
          <ScoreTable cbFuncs={this.props.cbFuncs} />
        </div>
      </div> :
      <div className="row">
        <div className="col-12 pr-1">
          <Board cbFuncs={this.props.cbFuncs} />      
        </div>
      </div>;
    return (
      <Provider store={store}>
        <div className="container-fluid h-100" style={{ background: 'lightgrey' }}>
          <div className="row">
            <div className="col">
              <HeaderBar cbFuncs={this.props.cbFuncs}/>
            </div>
          </div>
          {bodyPart}
        </div>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isScoreTableVisible: state.session.isScoreTableVisible
  }
}

export default connect(mapStateToProps)(App);
