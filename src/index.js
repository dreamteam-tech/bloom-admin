import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './style/app.scss';
import Root from './root/Root';
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
