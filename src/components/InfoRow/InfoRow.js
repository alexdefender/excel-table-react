import React from 'react';
import { useSelector } from 'react-redux';

import './InfoRow.scss';

const InfoRow = () => {
  const { selectedCell, tableData } = useSelector((store) => store);
  const valueCell =
    tableData[selectedCell]?.formulaCell ||
    tableData[selectedCell]?.valueCell ||
    '';

  return (
    <div className='InfoRow'>
      <input type='text' defaultValue={valueCell} readOnly />
    </div>
  );
};

export default InfoRow;
