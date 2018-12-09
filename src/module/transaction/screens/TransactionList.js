import React from 'react';
import { compose, pure } from 'recompose';
import { graphql } from 'react-apollo';
import { Transition, H1 } from 'firefly/component';
import { Content } from '../../../component';
import { withGenericState } from '../../../hoc';
import { transactionsQuery } from '../query';
import Page from '../../../component/Page';
import { TransactionTable as Container } from '../container';

const TransactionList = ({ data: { transactions } }) => (
  <Page title='Операции' breadcrumbs={[
    { to: '/', icon: 'Home', text: 'Рабочий стол' },
    { text: 'Операции' }
  ]}>
    <Content modifiers='no-background'>
      <Transition>
        <H1>Операции</H1>
        <Container transactions={transactions}/>
      </Transition>
    </Content>
  </Page>
);

export default compose(
  graphql(transactionsQuery),
  withGenericState,
  pure
)(TransactionList);
