import { compose } from 'recompose';
import { withErrorState } from './withErrorState';
import { withLoadingState } from './withLoadingState';

export const withGenericState = compose(
  withErrorState,
  withLoadingState
);
