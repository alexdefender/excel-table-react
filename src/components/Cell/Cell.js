import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './Cell.scss';
import { setSelectedCell } from '../../store/actions';
import SelectedCell from '../SelectedCell/SelectedCell';

const Cell = (props) => {
  const dispatch = useDispatch();
  const { selectedCell } = useSelector((store) => store);
  const { indexCell } = props;

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCell(indexCell));
  };

  return indexCell === selectedCell ? (
    <SelectedCell />
  ) : (
    <td onClick={handleClick}></td>
  );
};

Cell.propTypes = {
  indexCell: PropTypes.string,
};

export default Cell;
