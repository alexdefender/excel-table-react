import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { setAllTableData } from '../../store/actions';
import { TableWrap } from '../TableWrap';
import { TableInfo } from '../TableInfo';
import { Table } from '../Table';
import { Row } from '../Row';
import { Cell } from '../Cell';
import { FixedCell } from '../FixedCell';

const alphabet = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const tableData = {};

const setDefaultTableData = (indexCell) => {
  tableData[indexCell] = {
    valueCell: '',
    formulaCell: '',
    type: 'string',
    currency: '',
  };
};

const generateTable = () => {
  const countRows = Array(10).fill(null);
  const countCells = alphabet.split('').slice(0, 13);

  const table = (
    <Table>
      {countRows.map((row, i) => (
        <Row key={`row-${i}`}>
          {countCells.map((cell, j) => {
            if (i === 0) {
              if (j === 0) {
                return <FixedCell key={`cell-${j}`} value={cell} />;
              }
              return <FixedCell key={`cell-${j}`} value={cell} />;
            } else if (j === 0) {
              return <FixedCell key={`cell-${j}`} value={i.toString()} />;
            }
            const indexCell = `${cell}${i}`;
            setDefaultTableData(indexCell);
            return <Cell key={`cell-${j}`} {...{ indexCell }} />;
          })}
        </Row>
      ))}
    </Table>
  );

  return table;
};

const App = () => {
  const dispatch = useDispatch();
  const table = generateTable();

  useEffect(() => {
    dispatch(setAllTableData(tableData));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='Container'>
      <TableInfo />
      <TableWrap>{table}</TableWrap>
    </div>
  );
};

export default App;
