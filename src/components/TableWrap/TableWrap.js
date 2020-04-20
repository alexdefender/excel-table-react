import React from 'react';
import PropTypes from 'prop-types';
import './TableWrap.scss';

const TableWrap = (props) => {
  const { children } = props;

  return <div className='TableWrap'>{children}</div>;
};

TableWrap.propTypes = {
  children: PropTypes.node,
};

export default TableWrap;
