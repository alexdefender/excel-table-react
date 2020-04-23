import { combineReducers } from 'redux';
import selectedCell from './selectedCell';
import tableData from './tableData';

export default combineReducers({
  selectedCell,
  tableData,
});
