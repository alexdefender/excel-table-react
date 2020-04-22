import React from 'react';
import PropTypes from 'prop-types';
import './TableWrap.scss';

const TableWrap = ({ children }) => <div className='TableWrap'>{children}</div>;

TableWrap.propTypes = {
  children: PropTypes.node,
};

export default TableWrap;
