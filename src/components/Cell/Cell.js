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

  // if (tableData[indexCell] === undefined) return null;
  const { valueCell, type, currency, formulaCell } = tableData[indexCell] || {};

  const isSelectedCell = indexCell === selectedCell;

  const clearCellData = () => {
    dispatch(
      setCellData({ [selectedCell]: { valueCell: '', formulaCell: '' } })
    );
  };

  function handleKeyDown(e) {
    e.stopPropagation();
    if (e.keyCode === 8 || e.keyCode === 46) {
      clearCellData();
    }
  }

  useEffect(() => {
    if (isSelectedCell) {
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  });

  useEffect(() => {
    setIsEdit(false);
  }, [selectedCell]);

  useEffect(() => {
    for (const cell in tableData) {
      if (tableData.hasOwnProperty(cell)) {
        tableData[cell].formulaCell !== '' &&
          updateCellData(tableData[cell].formulaCell, cell);
      }
    }
  }, [selectedCell, type]);

  function updateCellData(value, cell) {
    let cellData;

    if (value.includes('=')) {
      const { newValueCell, formulaCell } = generateFormula(value, cell);
      cellData = { [cell]: { valueCell: newValueCell, formulaCell } };
    } else {
      cellData = { [cell]: { valueCell: value, formulaCell: '' } };
    }

    dispatch(setCellData(cellData));
  }

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCell(indexCell));
  };

  const handleDoubleClick = (e) => {
    setIsEdit(true);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    updateCellData(value, selectedCell);
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
      onChange={handleChange}
      defaultValue={formulaCell || valueCell}
    />
  ) : (
    correctValueCell
  );

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
