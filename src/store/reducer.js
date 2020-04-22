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
    '': {
      valueCell: '',
      formulaCell: '',
      type: '',
      currency: '',
    },
  },
};

const reducer = (state = initialState, action) => {
  const { selectedCell, tableData } = state;

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
      return {
        ...state,
        tableData: {
          ...tableData,
          [selectedCell]: {
            ...tableData[selectedCell],
            ...action.payload,
          },
        },
      };
    case SET_TYPE_CELL:
      return {
        ...state,
        tableData: {
          ...tableData,
          [selectedCell]: {
            ...tableData[selectedCell],
            type: action.payload,
          },
        },
      };
    case SET_CURRENCY_CELL:
      return {
        ...state,
        tableData: {
          ...tableData,
          [selectedCell]: {
            ...tableData[selectedCell],
            currency: action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
