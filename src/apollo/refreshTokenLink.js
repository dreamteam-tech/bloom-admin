import { onError } from 'apollo-link-error';
import { execute } from 'apollo-link';
import history from '../historyStore';
import { refreshTokenMutation } from '../module/user/query';
import { loadUser, persistUser, logoutUser, setAuthHeaders } from '../module/user/utils';

const doLogout = () => {
  logoutUser();
  history.replace('/');
};

const getRefreshTokenMutation = (refreshToken) => {
  return {
    query: refreshTokenMutation,
    variables: { token: refreshToken }
  };
};

export const refreshTokenLink = (link) =>
  onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        // handle errors differently based on its error code
        if (err.extensions.code === 'UNAUTHENTICATED') {
          // TODO https://github.com/apollographql/apollo-link/issues/646#issuecomment-423279220

          let doForward = true;

          const user = loadUser();
          // old token has expired throwing AuthenticationError,
          // one way to handle is to obtain a new token and
          // add it to the operation context
          // execute returns an Observable so it can be subscribed to
          execute(link, getRefreshTokenMutation(user.refreshToken)).subscribe({
            next: (resp) => {
              // Joi validation graphql error
              if (typeof resp.errors === 'object' && resp.errors.length > 0) {
                doForward = false;
                doLogout();
              } else {
                persistUser(resp.data.refreshToken);
                const headers = operation.getContext().headers;
                operation.setContext({
                  headers: setAuthHeaders(headers, resp.data.refreshToken.accessToken)
                });
              }
            },
            error: (error) => {
              // Standart graphql error
              console.log(`received error ${error}`);
              // doLogout();
            },
            complete: () => {
              console.log(`complete`);
              if (doForward) {
                // Now, pass the modified operation to the next link
                // in the chain. This effectively intercepts the old
                // failed request, and retries it with a new token
                return forward(operation);
              }
            }
          });
        }
      }
    }
  });
