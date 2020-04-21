import { SET_SELECTED_CELL, SET_TABLE_DATA } from './constants';

const initialState = {
  selectedCell: '',
  tableData: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CELL:
      return { ...state, selectedCell: action.payload };
    case SET_TABLE_DATA:
      return { ...state, tableData: { ...state.tableData, ...action.payload } };
    default:
      return state;
  }
};

export default reducer;
