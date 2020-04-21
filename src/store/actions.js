import { SET_SELECTED_CELL, SET_TABLE_DATA } from './constants';

export const setSelectedCell = (payload) => ({
  type: SET_SELECTED_CELL,
  payload,
});

export const setTableData = (payload) => ({
  type: SET_TABLE_DATA,
  payload,
});
