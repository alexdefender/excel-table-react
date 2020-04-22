import React from 'react';
import './TableInfo.scss';

import { InfoRow } from '../InfoRow';
import { SelectTypeData } from '../SelectTypeData';

const TableInfo = () => {
  return (
    <div className='TableInfo'>
      <SelectTypeData />
      <InfoRow />
    </div>
  );
};

export default TableInfo;
