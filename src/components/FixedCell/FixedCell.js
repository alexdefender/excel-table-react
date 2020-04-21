import React from 'react';
import './FixedCell.scss';

const CellFixed = (props) => {
  const { value } = props;
  return <th>{value}</th>;
};

export default CellFixed;
