import * as types from '../actionTypes';

export function add({
  text,
  title,
  state = 'success'
}) {
  return {
    type: types.NOTIFICATION_ADD,
    text,
    title,
    state,
    id: Date.now()
  };
}

export function remove(id) {
  return {
    type: types.NOTIFICATION_REMOVE,
    id
  };
}