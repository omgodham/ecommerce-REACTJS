import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux'

import {counterReducer} from './reducers';

const store = createStore(counterReducer);

console.log("store ",store.getState())
ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
