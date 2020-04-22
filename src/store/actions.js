import {
  SET_SELECTED_CELL,
  SET_ALL_TABLE_DATA,
  SET_CELL_DATA,
  SET_TYPE_CELL,
  SET_CURRENCY_CELL,
  SET_ERROR_CELL,
} from './constants';

export const setSelectedCell = (payload) => ({
  type: SET_SELECTED_CELL,
  payload,
});

export const setAllTableData = (payload) => ({
  type: SET_ALL_TABLE_DATA,
  payload,
});

export const setCellData = (payload) => ({
  type: SET_CELL_DATA,
  payload,
});

export const setTypeCell = (payload) => ({
  type: SET_TYPE_CELL,
  payload,
});

export const setCurrencyCell = (payload) => ({
  type: SET_CURRENCY_CELL,
  payload,
});

export const setErrorCell = (payload) => ({
  type: SET_ERROR_CELL,
  payload,
});

