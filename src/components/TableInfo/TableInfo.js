import React from 'react';
import './TableInfo.scss';
import { InfoRow } from '../InfoRow';
import { SelectTypeData } from '../SelectTypeData';
import { Faq } from '../Faq';

const TableInfo = () => (
  <div className='TableInfo'>
    <SelectTypeData />
    <InfoRow />
    <Faq />
  </div>
);

export default TableInfo;
