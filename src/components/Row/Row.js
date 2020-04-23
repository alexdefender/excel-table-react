import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children }) => <tr>{children}</tr>;

Row.propTypes = {
  children: PropTypes.node,
};

export default Row;
