import { compose, withProps, pure } from 'recompose';
import { SmartForm } from 'firefly/component';

export const StrategyForm = compose(
  withProps((props) => ({
    beforeSubmit: form => ({
      ...form,
      percent: parseFloat(form.percent)
    }),
    fields: [
      {
        type: 'text',
        name: 'name',
        label: 'Название'
      },
      {
        type: 'text',
        name: 'percent',
        label: 'Процентная ставка'
      },
      {
        type: 'textarea',
        name: 'description',
        label: 'Описание'
      }
    ]
  })),
  pure
)(SmartForm);
