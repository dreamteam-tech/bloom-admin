import { bindActionCreators } from 'redux';
import accounting from 'accounting';
import { connect } from 'react-redux';
import { toaster } from './root/Notifications';

export const formatMoney = value => accounting.formatMoney(value, {
  symbol: " р.",
  decimal: ".",
  thousand: " ",
  precision: 2,
  format: "%v%s"
});

export function toastSuccess(message = 'Выполнено') {
  return toaster.show({ message, modifiers: ['success'] });
}

export function toastError(message = 'Ошибка') {
  return toaster.show({ message, modifiers: ['error'] });
}

export function bindActions(actions) {
  return dispatch => bindActionCreators(actions, dispatch);
}

export function bindConnect(reducers, actions, options = {}) {
  if (typeof actions !== 'object') {
    return connect(reducers);
  }

  return connect(reducers, bindActions(actions), null, options);
}

export function filterValues(obj) {
  const newObj = {};

  Object.keys(obj).forEach(key => {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
}