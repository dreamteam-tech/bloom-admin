import { pure, withProps, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { StrategyForm } from '../container';
import { strategyUpdateMutation } from '../query';

export const StrategyUpdateForm = compose(
  graphql(strategyUpdateMutation, {
    options: (props) => ({
      refetchQueries: ['strategy', 'strategies']
    })
  }),
  withProps((props) => ({
    callback: (form) => props.mutate({
      variables: form
    })
  })),
  pure
)(StrategyForm);
