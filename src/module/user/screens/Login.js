import React from 'react';
import { Transition, H1 } from 'firefly/component';
import { Container } from '../../../component';
import { LoginForm } from '../component';
import Page from '../../../component/Page';

export const Login = ({ history }) => (
  <Page title='Авторизация'>
    <Transition>
      <Container>
        <H1>Авторизация</H1>
        <LoginForm onSuccess={(response, form) => history.push('/')}/>
      </Container>
    </Transition>
  </Page>
);
