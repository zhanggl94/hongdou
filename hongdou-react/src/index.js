import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import './index.less';
import Routers from './router';
import rootReducer from './store/reducers';
import setUser from './store/actions/setUserAction';

const store = new createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

if (localStorage.getItem('jwtToken')) {
  store.dispatch(setUser(jwtDecode(localStorage.getItem('jwtToken'))));
}

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);      