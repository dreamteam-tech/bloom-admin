import { H1 } from 'firefly/component';
import React from 'react';
import { compose, pure } from 'recompose';
import { Content } from '../../../component';
import Page from '../../../component/Page';
import { StrategyCreateForm } from '../component';

const StrategyCreate = ({ history }) => (
  <Page
    title='Создание стратегии'
    breadcrumbs={[
      { to: '/', icon: 'Home', text: 'Рабочий стол' },
      { to: '/strategy', text: 'Стратегии' },
      { icon: 'document', text: 'Создание стратегии' }
    ]}
  >
    <Content>
      <H1>Создание стратегии</H1>
      <StrategyCreateForm
        onSuccess={({ response }) => history.push(`/strategy/${response.data.strategyCreate.id}`)}/>
    </Content>
  </Page>
);

export default compose(pure)(StrategyCreate);
