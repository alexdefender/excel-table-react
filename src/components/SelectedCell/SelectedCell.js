import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import './SelectedCell.scss';
import { setTableData } from '../../store/actions';

const SelectedCell = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { selectedCell, valueCell } = props;

  const handleDoubleClick = (e) => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const cellData = { [selectedCell]: e.target.value };
    dispatch(setTableData(cellData));
  };

  // useEffect(() => {
  //   if (input)
  //     return () => {
  //       const cellData = { [selectedCell]: input.value };
  //       dispatch(setTableData(cellData));
  //     };
  // });

  const value = isEdit ? (
    <input autoFocus defaultValue={valueCell} onChange={handleChange} />
  ) : (
    valueCell
  );

  return (
    <td className='SelectedCell' onDoubleClick={handleDoubleClick}>
      {value}
    </td>
  );
};

SelectedCell.propTypes = {
  selectedCell: PropTypes.string,
  valueCell: PropTypes.string,
};

export default SelectedCell;
