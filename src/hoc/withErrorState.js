import React from 'react';
import { NonIdealState } from 'firefly/component';
import { branch, renderComponent } from 'recompose';
import objectValue from 'object-path-value';

const Errors = props => (
  <NonIdealState
    title='Error'
    text={JSON.stringify(getGraphQLErrors(props), null, 4)} />
);

const getGraphQLErrors = props => {
  return objectValue(props, 'data.error.networkError.result.errors');
};

// Define an HoC that displays the Loading component instead of the
// wrapped component when props.data.loading is true
export const withErrorState = branch(
  props => getGraphQLErrors(props),
  renderComponent(Errors)
);
