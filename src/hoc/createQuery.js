// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component.
//
// Note that if you type a search field and then hit backspace, the
// Apollo cache kicks in and no actual data loading is done.
import { graphql } from 'react-apollo';

const noop = props => props;

export const createQuery = (gqlQuery, getProps = noop) => {
  return graphql(gqlQuery, {
    options: props => ({
      variables: getProps(props)
    }),
  });
};
