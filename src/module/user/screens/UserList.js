import React from 'react';
import { H1, Transition } from 'firefly/component';
import { graphql } from 'react-apollo';
import { compose, pure } from 'recompose';
import { Page, Content } from '../../../component';
import { withGenericState } from '../../../hoc';
import { usersQuery } from '../query';
import { UserTable as Container } from '../container';

const UserListContainer = ({ data: { users } }) => (
  <Page title='Пользователи' breadcrumbs={[
    { to: '/', icon: 'Home', text: 'Рабочий стол' },
    { text: 'Пользователи' }
  ]}>
    <Content modifiers='no-background'>
      <Transition>
        <H1>Пользователи</H1>
        <Container users={users}/>
      </Transition>
    </Content>
  </Page>
);

export const UserList = compose(
  graphql(usersQuery),
  withGenericState,
  pure
)(UserListContainer);