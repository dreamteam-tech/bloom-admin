import { compose, pure, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import { loginMutation } from '../query';
import { LoginForm as LoginFormPure } from '../container';
import { persistUser } from '../utils';
import { safeInvoke } from 'firefly/component';

export const LoginForm = compose(
  graphql(loginMutation),
  withProps(props => ({
    callback: form => props.mutate({
      variables: form
    }),
    onSuccess: ({ response, form }) => {
      persistUser(response.data.login);
      safeInvoke(props.onSuccess, { response, form });
    }
  })),
  pure
)(LoginFormPure);
