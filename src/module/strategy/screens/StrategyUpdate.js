import { H1 } from 'firefly/component';
import React from 'react';
import { graphql } from 'react-apollo';
import { compose, pure } from 'recompose';
import { Content } from '../../../component';
import Page from '../../../component/Page';
import { withErrorState, withLoadingState } from '../../../hoc';
import { StrategyUpdateForm } from '../component';
import { strategyQuery } from '../query';

const StrategyUpdate = ({ history, data: { strategy } }) => (
  <Page
    title={strategy.name}
    breadcrumbs={[
      { to: '/', icon: 'Home', text: 'Рабочий стол' },
      { to: '/strategy', text: 'Стратегии' },
      { to: `/strategy/${strategy.id}`, text: strategy.name },
      { icon: 'document', text: 'Редактирование стратегии' }
    ]}
  >
    <Content>
      <H1>{strategy.name}</H1>
      <StrategyUpdateForm onSuccess={() => history.push(`/strategy/${strategy.id}`)} form={strategy}/>
    </Content>
  </Page>
);

export default compose(
  graphql(strategyQuery, {
    options: (props) => ({
      variables: {
        id: props.match.params.strategy_id
      }
    })
  }),
  withLoadingState,
  withErrorState,
  pure
)(StrategyUpdate);
