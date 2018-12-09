import React, { Component } from 'react';
import { H1 } from 'firefly/component';
import { Content } from '../../component';
import Page from '../../component/Page';
import { toaster } from '../../root/Notifications';

export default class Homepage extends Component {
  render() {
    const breadcrumbs = [
      { icon: 'Home', text: 'Рабочий стол' }
    ];

    return (
      <Page breadcrumbs={breadcrumbs} title='Рабочий стол'>
        <Content modifiers='no-background'>
          <H1>Рабочий стол</H1>
          <button onClick={() => toaster.show({ message: 'test', modifiers: 'success' })}>hello world</button>
        </Content>
      </Page>
    );
  }
}
