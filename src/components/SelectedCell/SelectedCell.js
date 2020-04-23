import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SelectedCell.scss';
import isLink from '../../utils/isLink';
import { setCellData } from '../../store/actions';
import generateFormula from '../../utils/generateFormula';
import generateCurrencyFormat from '../../utils/generateCurrencyFormat';

const SelectedCell = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const { selectedCell, tableData } = useSelector((store) => store);
  let { formulaCell, valueCell, currency } = tableData[selectedCell];
  const editValueCell = formulaCell || valueCell;

  const clearCellData = () => {
    dispatch(setCellData({ valueCell: '', formulaCell: '' }));
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.keyCode === 8) {
      clearCellData();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDoubleClick = (e) => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    let cellData;

    if (value.includes('=')) {
      const { newValueCell, formulaCell } = generateFormula(value);

      cellData = { valueCell: newValueCell, formulaCell };
    } else {
      cellData = { valueCell: value, formulaCell: '' };
    }

    dispatch(setCellData(cellData));
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

  const value = isEdit ? (
    <input autoFocus defaultValue={editValueCell} onChange={handleChange} />
  ) : (
    renderValueCell
  );

  return (
    <td
      id='SelectedCell'
      className='SelectedCell'
      onDoubleClick={handleDoubleClick}
    >
      {value}
    </td>
  );
};

export default SelectedCell;
