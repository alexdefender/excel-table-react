import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import './SelectedCell.scss';
import { setCellData } from '../../store/actions';
import { generateFormula } from '../../utils/generateFormula';

const SelectedCell = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { selectedCell, tableData } = useSelector((store) => store);

  const editValueCell = tableData[selectedCell]
    ? tableData[selectedCell].formulaCell || tableData[selectedCell].valueCell
    : '';

  const valueCell =
    tableData[selectedCell] && tableData[selectedCell].valueCell;

  const handleDoubleClick = (e) => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { value } = e.target;

    let cellData;

    if (value.includes('=')) {
      const { valueCell, formulaCell } = generateFormula(value);
      cellData = { valueCell, formulaCell };
    } else {
      cellData = { valueCell: value, formulaCell: '' };
    }

    dispatch(setCellData(cellData));
  };

  // useEffect(() => {
  //   if (input)
  //     return () => {
  //       const cellData = { [selectedCell]: input.value };
  //       dispatch(setCellData(cellData));
  //     };
  // });

  const value = isEdit ? (
    <input autoFocus defaultValue={editValueCell} onChange={handleChange} />
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
