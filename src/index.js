import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './components/GameContainer';

import { Provider } from 'react-redux';
import store from './store';
import Axios from 'axios';

Axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById('root')
);
