import React from 'react';
import { compose, pure, withProps } from 'recompose';
import { Button, H1, Divider } from 'firefly/component';
import { graphql } from 'react-apollo';
import { Content } from '../../../component';
import { withGenericState } from '../../../hoc';
import { strategyQuery, strategyRemoveMutation } from '../query';
import Page from '../../../component/Page';

const StrategyView = ({ match, onRemove, data: { strategy } }) => (
  <Page
    title={strategy.name}
    breadcrumbs={[
      { to: '/', icon: 'Home', text: 'Рабочий стол' },
      { to: '/strategy', text: 'Стратегии' },
      { text: strategy.name }
    ]}
  >
    <Content>
      <H1>{strategy.name}</H1>
      <div>Процент: {strategy.percent}</div>
      <div>Описание: {strategy.description}</div>
      <Divider/>
      <div className="b-input-group">
        <Button to={`/strategy/update/${strategy.id}`}>
          Изменить
        </Button>
        <Button onClick={onRemove}>
          Удалить
        </Button>
      </div>
    </Content>
  </Page>
);

export default compose(
  graphql(strategyRemoveMutation, {
    name: 'remove',
    options: {
      refetchQueries: ['strategies', 'strategy']
    }
  }),
  graphql(strategyQuery, {
    options: (props) => ({
      variables: {
        id: props.match.params.strategy_id
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
            id: props.match.params.strategy_id
          }
        };

        props.remove(params).then(() => {
          props.history.push('/strategy');
        });
      }
    }
  })),
  pure
)(StrategyView);
