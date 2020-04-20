import { SET_SELECTED_CELL } from './constants';

const initialState = {
  selectedCell: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CELL:
      return { ...state, selectedCell: action.payload };
    default:
      return state;
  }
};

export default reducer;
