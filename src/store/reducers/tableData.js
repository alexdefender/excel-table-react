import {
  SET_ALL_TABLE_DATA,
  SET_CELL_DATA,
  SET_TYPE_CELL,
  SET_CURRENCY_CELL,
} from '../constants';

const initialState = {};

const reducer = (state = initialState, action) => {
  let cell = null;

  switch (action.type) {
    case SET_ALL_TABLE_DATA:
      return {
        ...action.payload,
      };
    case SET_CELL_DATA:
      cell = Object.keys(action.payload)[0];
      return {
        ...state,
        [cell]: {
          ...state[cell],
          ...action.payload[cell],
        },
      };
    case SET_TYPE_CELL:
      cell = Object.keys(action.payload)[0];
      return {
        ...state,
        [cell]: {
          ...state[cell],
          ...action.payload[cell],
        },
      };
    case SET_CURRENCY_CELL:
      cell = Object.keys(action.payload)[0];
      return {
        ...state,
        [cell]: {
          ...state[cell],
          ...action.payload[cell],
        },
      };
    default:
      return state;
  }
};

export default reducer;
