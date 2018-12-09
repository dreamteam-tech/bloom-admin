import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers';

const middlewares = [];
const store = createStore(reducer, applyMiddleware(...middlewares));

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    /* eslint-disable */
    const nextReducer = require('./reducers').default;
    /* eslint-enable */
    store.replaceReducer(nextReducer);
  });
}

export default store;
