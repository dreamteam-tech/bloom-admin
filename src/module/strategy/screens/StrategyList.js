import React from 'react';
import { compose, pure } from 'recompose';
import { graphql } from 'react-apollo';
import { Transition, H1, Button } from 'firefly/component';
import { Content } from '../../../component';
import { withGenericState } from '../../../hoc';
import { strategiesQuery } from '../query';
import Page from '../../../component/Page';
import { StrategyTable as Container } from '../container';

const StrategyList = ({ data: { strategies } }) => (
  <Page title='Стратегии' breadcrumbs={[
    { to: '/', icon: 'Home', text: 'Рабочий стол' },
    { text: 'Стратегии' }
  ]}>
    <Content modifiers='no-background'>
      <Transition>
        <H1>Стратегии</H1>
        <Button to='/strategy/create'>Создать стратегию</Button>
        <Container strategies={strategies}/>
      </Transition>
    </Content>
  </Page>
);

export default compose(
  graphql(strategiesQuery),
  withGenericState,
  pure
)(StrategyList);
