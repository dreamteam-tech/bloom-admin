import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import './Notifications';
import client from '../apolloClient';
import history from '../historyStore';
import Routes from './Routes';

const Root = ({ store }) => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router history={history}>
        <Routes/>
      </Router>
    </ApolloProvider>
  </Provider>
);

export default Root;
