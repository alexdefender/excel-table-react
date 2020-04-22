import React from 'react';
import PropTypes from 'prop-types';
import './FixedCell.scss';

const CellFixed = ({ value }) => <th>{value}</th>;

CellFixed.propTypes = {
  value: PropTypes.string,
};

export default CellFixed;
