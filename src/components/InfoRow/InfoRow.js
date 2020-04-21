import React from 'react';
import { useSelector } from 'react-redux';

import './InfoRow.scss';

const InfoRow = () => {
  const { selectedCell, tableData } = useSelector((store) => store);
  const valueRow = tableData[selectedCell];

  return (
    <div className='InfoRow'>
      <input type='text' defaultValue={valueRow} />
    </div>
  );
};

export default InfoRow;
