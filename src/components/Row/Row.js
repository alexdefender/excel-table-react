import React from 'react';
import PropTypes from 'prop-types';
import './Row.scss';

const Row = (props) => {
  const { children } = props;

  return <tr>{children}</tr>;
};

Row.propTypes = {
  children: PropTypes.node,
};

export default Row;
