import React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import StartWizard from './game-start/StartWizard';
import App from './App';
import store from '../store';

class GameContainer extends React.Component {
  render() {
    let game = (this.props.isGameStarting) ?
      <StartWizard/>
      :
      <App/>;

    return (
      <Provider store={store}>
        {game}   
      </Provider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isGameStarting: state.attendStatus.isGameStarting
  }
}

export default connect(mapStateToProps)(GameContainer);