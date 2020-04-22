import React, { useEffect, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import './Cell.scss';
import { setSelectedCell } from '../../store/actions';
import SelectedCell from '../SelectedCell/SelectedCell';

const Cell = (props) => {
  const dispatch = useDispatch();
  const { selectedCell, tableData } = useSelector((store) => store);
  const { indexCell } = props;
  const { valueCell, error } = tableData[indexCell] || '';

  // console.log({ tableData, indexCell, valueCell });

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCell(indexCell));
  };
  const isSelectedCell = indexCell === selectedCell;

  return isSelectedCell ? (
    <SelectedCell />
  ) : (
    <td onClick={handleClick}>{error || valueCell}</td>
  );
};

Cell.propTypes = {
  indexCell: PropTypes.string,
};

// class Cell extends PureComponent {
//   handleClick = (e) => {
//     e.stopPropagation();
//     this.props.setSelectedCell(this.props.indexCell);
//   };

//   render() {
//     const { indexCell, selectedCell } = this.props;
//     return indexCell === selectedCell ? (
//       <SelectedCell />
//     ) : (
//       <td onClick={this.handleClick}></td>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   selectedCell: state.selectedCell,
// });

export default Cell;

// export default connect(mapStateToProps, { setSelectedCell })(Cell);
