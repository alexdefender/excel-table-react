import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './Cell.scss';
import isLink from '../../utils/isLink';
import generateCurrencyFormat from '../../utils/generateCurrencyFormat';
import { setSelectedCell } from '../../store/actions';
import SelectedCell from '../SelectedCell/SelectedCell';

const Cell = (props) => {
  const dispatch = useDispatch();
  const { selectedCell, tableData } = useSelector((store) => store);
  const { indexCell } = props;
  let { valueCell, currency } = tableData[indexCell] || {};

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCell(indexCell));
  };

  valueCell =
    valueCell && currency
      ? generateCurrencyFormat(valueCell, currency)
      : valueCell;

  const renderValueCell = isLink(valueCell) ? (
    <a href={valueCell} target='_blank' rel='noopener noreferrer'>
      {valueCell}
    </a>
  ) : (
    valueCell
  );

  const isSelectedCell = indexCell === selectedCell;
  return isSelectedCell ? (
    <SelectedCell />
  ) : (
    <td onClick={handleClick}>{renderValueCell}</td>
  );
};

Cell.propTypes = {
  indexCell: PropTypes.string,
};

export default Cell;
