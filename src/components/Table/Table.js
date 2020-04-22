import React from 'react';
import PropTypes from 'prop-types';
import './Table.scss';

const Table = ({ children }) => (
  <table>
    <tbody>{children}</tbody>
  </table>
);

Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
