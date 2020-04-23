import {
  SET_SELECTED_CELL,
  SET_ALL_TABLE_DATA,
  SET_CELL_DATA,
  SET_TYPE_CELL,
  SET_CURRENCY_CELL,
} from './constants';

const initialState = {
  selectedCell: '',
  tableData: {
    // '': {
    //   valueCell: '',
    //   formulaCell: '',
    //   type: '',
    //   currency: '',
    // },
  },
};

const reducer = (state = initialState, action) => {
  const { tableData } = state;
  let cell = null;

  switch (action.type) {
    case SET_SELECTED_CELL:
      return { ...state, selectedCell: action.payload };
    case SET_ALL_TABLE_DATA:
      return {
        ...state,
        tableData: {
          ...action.payload,
        },
      };
    case SET_CELL_DATA:
      cell = Object.keys(action.payload)[0];
      return {
        ...state,
        tableData: {
          ...tableData,
          [cell]: {
            ...tableData[cell],
            ...action.payload[cell],
          },
        },
      };
    case SET_TYPE_CELL:
      cell = Object.keys(action.payload)[0];
      return {
        ...state,
        tableData: {
          ...tableData,
          [cell]: {
            ...tableData[cell],
            ...action.payload[cell],
          },
        },
      };
    case SET_CURRENCY_CELL:
      cell = Object.keys(action.payload)[0];
      return {
        ...state,
        tableData: {
          ...tableData,
          [cell]: {
            ...tableData[cell],
            ...action.payload[cell],
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
