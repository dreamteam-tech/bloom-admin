import React from 'react';
import { compose, pure, withProps } from 'recompose';
import { Button, H1, Divider } from 'firefly/component';
import { graphql } from 'react-apollo';
import { Content } from '../../../component';
import { withGenericState } from '../../../hoc';
import { transactionQuery } from '../query';
import Page from '../../../component/Page';

const TransactionView = ({ match, data: { transaction } }) => (
  <Page
    title={transaction.name}
    breadcrumbs={[
      { to: '/', icon: 'Home', text: 'Рабочий стол' },
      { to: '/transaction', text: 'Операции' },
      { text: transaction.name }
    ]}
  >
    <Content>
      <H1>{transaction.name}</H1>
      <div>Процент: {transaction.percent}</div>
      <div>Описание: {transaction.description}</div>
    </Content>
  </Page>
);

export default compose(
  graphql(transactionQuery, {
    options: (props) => ({
      variables: {
        id: props.match.params.transaction_id
      }
    })
  }),
  withGenericState,
  withProps(props => ({
    ...props,
    onRemove: e => {
      e.preventDefault();
      if (window.confirm('Удалить?')) {
        const params = {
          variables: {
            id: props.match.params.transaction_id
          }
        };

        props.remove(params).then(() => {
          props.history.push('/transaction');
        });
      }
    }
  })),
  pure
)(TransactionView);
