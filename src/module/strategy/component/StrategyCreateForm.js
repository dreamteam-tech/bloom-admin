import { pure, withProps, compose } from 'recompose';
import { graphql } from 'react-apollo';
import { StrategyForm } from '../container';
import { strategyCreateMutation } from '../query';

export const StrategyCreateForm = compose(
  graphql(strategyCreateMutation, {
    options: (props) => ({
      refetchQueries: ['strategies']
    })
  }),
  withProps((props) => ({
    callback: (form) => props.mutate({
      variables: form
    })
  })),
  pure
)(StrategyForm);
