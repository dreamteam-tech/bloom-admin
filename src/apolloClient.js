import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'isomorphic-fetch';
import config from './config';
import { cache, errorLink, refreshTokenLink, authLink } from './apollo';

const uploadLink = createUploadLink({
  uri: config.graphqlEndpoint,
  fetch
});

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    refreshTokenLink(uploadLink),
    uploadLink
  ]),
  errorLink,
  cache
});

export default client;
