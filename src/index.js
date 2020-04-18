import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './components/GameContainer';

import { Provider } from 'react-redux';
import store from './store';
import axios from 'axios';

console.log('Set axios.defaults.baseURL to', process.env.REACT_APP_DAMPFROSS_API_URL);
axios.defaults.baseURL = process.env.REACT_APP_DAMPFROSS_API_URL;

ReactDOM.render(
  <Provider store={store}>
    <GameContainer />
  </Provider>,
  document.getElementById('root')
);
