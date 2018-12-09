import * as types from '../actionTypes';

const init = {};

export default (state = init, action) => {
  if (action.type === types.NOTIFICATION_ADD) {
    return {
      ...state,
      [action.id]: {
        text: action.text,
        title: action.title,
        id: action.id,
        state: action.state
      }
    };
  }

  if (action.type === types.NOTIFICATION_REMOVE) {
    const newState = { ...state };
    delete newState[action.id];
    return newState;
  }

  return state;
};
