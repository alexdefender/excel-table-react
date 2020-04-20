import React from 'react';
import './App.scss';
import { TableWrap } from '../TableWrap';
import { TableInfo } from '../TableInfo';
import { Table } from '../Table';
import { Row } from '../Row';
import Cell from '../Cell/Cell';

const generateTable = () => {
  const countRows = Array(5).fill(null);
  const countCells = Array(5).fill(null);

  const table = (
    <Table>
      {countRows.map((r, i) => (
        <Row key={`row${i}`} indexRow={i}>
          {countCells.map((c, j) => (
            <Cell key={`cell${j}`} indexCell={`${i + 1}.${j + 1}`} />
          ))}
        </Row>
      ))}
    </Table>
  );

  return table;
};

const App = () => {
  const table = generateTable();
  console.log('app')

  return (
    <div className='Container'>
      <TableInfo />
      <TableWrap>{table}</TableWrap>
    </div>
  );
};

export default App;
