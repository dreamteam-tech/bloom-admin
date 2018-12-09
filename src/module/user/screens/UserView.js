import React from 'react';
import { compose, pure, withProps } from 'recompose';
import { H1 } from 'firefly/component';
import { graphql } from 'react-apollo';
import { Content } from '../../../component';
import { withGenericState } from '../../../hoc';
import { userQuery } from '../query';
import Page from '../../../component/Page';

const UserViewContainer = ({ match, data: { user } }) => (
  <Page
    title={user.name}
    breadcrumbs={[
      { to: '/', icon: 'Home', text: 'Рабочий стол' },
      { to: '/user', text: 'Стратегии' },
      { text: `${user.last_name} ${user.first_name}` }
    ]}
  >
    <Content>
      <H1>{user.last_name} {user.first_name}</H1>
    </Content>
  </Page>
);

export const UserView = compose(
  graphql(userQuery, {
    options: (props) => ({
      variables: { id: props.match.params.user_id }
    })
  }),
  withGenericState,
  withProps(props => ({
    ...props,
    onRemove: e => {
      e.preventDefault();
      if (window.confirm('Удалить?')) {
        props.remove({
          variables: { id: props.match.params.user_id }
        }).then(() => {
          props.history.push('/user');
        });
      }
    }
  })),
  pure
)(UserViewContainer);
