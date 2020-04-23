import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './Cell.scss';
import isUrlValid from '../../utils/isUrlValid';
import generateFormula from '../../utils/generateFormula';
import generateCurrencyFormat from '../../utils/generateCurrencyFormat';
import { setSelectedCell, setCellData } from '../../store/actions';

const Cell = (props) => {
  const dispatch = useDispatch();
  const { selectedCell, tableData } = useSelector((store) => store);
  const { indexCell } = props;

  const [isEdit, setIsEdit] = useState(false);
  let refInput = null;

  const { valueCell, type, currency, formulaCell } = tableData[indexCell] || {};
  const isSelectedCell = indexCell === selectedCell;

  const updateCellData = (value, cell) => {
    let cellData;

    if (value.includes('=')) {
      const { newValueCell, formulaCell } = generateFormula(value, cell);
      cellData = { [cell]: { valueCell: newValueCell, formulaCell } };
    } else {
      cellData = { [cell]: { valueCell: value, formulaCell: '' } };
    }

    dispatch(setCellData(cellData));
  };

  const updateFormulasData = () => {
    for (const cell in tableData) {
      if (tableData.hasOwnProperty(cell)) {
        tableData[cell].formulaCell !== '' &&
          updateCellData(tableData[cell].formulaCell, cell);
      }
    }
  };

  const clearCellData = () => {
    dispatch(
      setCellData({ [selectedCell]: { valueCell: '', formulaCell: '' } })
    );
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
    if (e.keyCode === 8 || e.keyCode === 46) {
      clearCellData();
    }
    if (e.keyCode === 13 && refInput !== null) {
      updateCellData(refInput.value, selectedCell);
      updateFormulasData();
      if (isEdit) setIsEdit(false);
    }
  };

  useEffect(() => {
    if (isSelectedCell) {
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  });

  useEffect(() => {
    if (isEdit) setIsEdit(false);
    if (refInput !== null) updateCellData(refInput.value, indexCell);
  }, [selectedCell]);

  useEffect(() => {
    updateFormulasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell, type]);

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCell(indexCell));
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const generateValueCell = (value) => {
    let newValue = value;

    if (value && currency) {
      newValue = generateCurrencyFormat(value, currency);
    } else if (isUrlValid(value)) {
      newValue = (
        <a href={value} target='_blank' rel='noopener noreferrer'>
          {value}
        </a>
      );
    }

    return newValue;
  };

  const correctValueCell = generateValueCell(valueCell);
  const styleSelectedCell = indexCell === selectedCell ? 'SelectedCell' : null;

  const renderValueCell = isEdit ? (
    <input
      autoFocus
      defaultValue={formulaCell || valueCell}
      ref={(r) => (refInput = r)}
    />
  ) : (
    correctValueCell
  );

  console.log('render');

  return (
    <td
      className={styleSelectedCell}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {renderValueCell}
    </td>
  );
};

Cell.propTypes = {
  indexCell: PropTypes.string,
};

export default Cell;
