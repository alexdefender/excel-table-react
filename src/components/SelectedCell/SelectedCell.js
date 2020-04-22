import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './SelectedCell.scss';
import { isLink } from '../../utils/isLink';
import { setCellData, setErrorCell } from '../../store/actions';
import { generateFormula } from '../../utils/generateFormula';

const SelectedCell = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { selectedCell, tableData } = useSelector((store) => store);
  const dataCell = tableData[selectedCell];

  const editValueCell = dataCell?.formulaCell || dataCell?.valueCell || '';

  const valueCell = dataCell?.valueCell;

  const handleDoubleClick = (e) => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    const { error } = dataCell;

    let cellData;

    if (value.includes('=')) {
      const { valueCell, formulaCell } = generateFormula(value);

      if (valueCell === '#ERROR!') {
        dispatch(setErrorCell(valueCell));
      } else {
        dispatch(setErrorCell(''));
      }

      cellData = { valueCell, formulaCell };
    } else {
      cellData = { valueCell: value, formulaCell: '' };
    }

    dispatch(setCellData(cellData));
    // if (error) dispatch(setErrorCell(''));
  };

  // useEffect(() => {
  //   if (input)
  //     return () => {
  //       const cellData = { [selectedCell]: input.value };
  //       dispatch(setCellData(cellData));
  //     };
  // });

  const renderValueCell = isLink(valueCell) ? (
    <a href={valueCell} target='_blank'>
      {valueCell}
    </a>
  ) : (
    valueCell
  );

  const value = isEdit ? (
    <input autoFocus defaultValue={editValueCell} onChange={handleChange} />
  ) : (
    renderValueCell
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
