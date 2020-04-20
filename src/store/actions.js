import { SET_SELECTED_CELL } from './constants';

export const setSelectedCell = (payload) => ({
  type: SET_SELECTED_CELL,
  payload,
});
