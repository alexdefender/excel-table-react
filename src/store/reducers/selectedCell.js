import { SET_SELECTED_CELL } from '../constants';

const initialState = '';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CELL:
      return  action.payload;
    default:
      return state;
  }
};

export default reducer;
