import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Cell.scss';
import isUrlValid from '../../utils/isUrlValid';
import generateFormula from '../../utils/generateFormula';
import generateCurrencyFormat from '../../utils/generateCurrencyFormat';
import { setSelectedCell, setCellData } from '../../store/actions';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
    this.refInput = null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { indexCell, selectedCell, tableData } = this.props;
    const { isEdit } = this.state;
    // изменение выделенной ячейки
    if (
      nextProps.indexCell === nextProps.selectedCell ||
      indexCell === selectedCell
    ) {
      return true;
    }

    if (isEdit !== nextState.isEdit) {
      return true;
    }

    // изменение типа данных или содержимого в ячейке
    if (
      JSON.stringify(tableData[indexCell]) !==
      JSON.stringify(nextProps.tableData[nextProps.indexCell])
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { indexCell, selectedCell, tableData } = this.props;
    const { isEdit } = this.state;

    // изменилась выбранная ячейка
    if (prevProps.selectedCell !== selectedCell) {
      // отменить редактирование предыдушей ячейки
      if (isEdit) {
        this.setState({ isEdit: false });
      }

      // при клике мышки обновить данные ячейки
      if (this.refInput !== null) {
        const { value } = this.refInput;
        this.updateCellData(value, indexCell);
      }

      this.updateFormulasData();
    }

    // изменился тип ячейки
    if (prevProps.tableData[indexCell]?.type !== tableData[indexCell]?.type) {
      this.updateFormulasData();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  updateCellData = (value, cell) => {
    let cellData;

    if (value.includes('=')) {
      const { newValueCell, formulaCell } = generateFormula(value, cell);
      cellData = { [cell]: { valueCell: newValueCell, formulaCell } };
    } else {
      cellData = { [cell]: { valueCell: value, formulaCell: '' } };
    }

    this.props.setCellData(cellData);
  };

  updateFormulasData = () => {
    const { tableData } = this.props;

    for (const cell in tableData) {
      if (
        tableData.hasOwnProperty(cell) &&
        tableData[cell].formulaCell !== ''
      ) {
        this.updateCellData(tableData[cell].formulaCell, cell);
      }
    }
  };

  clearCellData = () => {
    this.props.setCellData({
      [this.props.selectedCell]: { valueCell: '', formulaCell: '' },
    });
  };

  handleKeyDown = (e) => {
    e.stopPropagation();
    const { indexCell, selectedCell } = this.props;
    const { isEdit } = this.state;

    // очистить ячейку если выделенная и не редактирование и нажата кнопка del или backspace
    if (
      indexCell === selectedCell &&
      !isEdit &&
      (e.keyCode === 8 || e.keyCode === 46)
    ) {
      this.clearCellData();
    }
    // нажат enter обновить данные ячейки и формул
    if (e.keyCode === 13 && this.refInput !== null) {
      const { value } = this.refInput;
      this.updateCellData(value, selectedCell);
      this.updateFormulasData();
      if (isEdit) this.setState({ isEdit: false });
    }
  };

  handleClick = (e) => {
    e.stopPropagation();
    this.props.setSelectedCell(this.props.indexCell);
  };

  handleDoubleClick = (e) => {
    e.stopPropagation();
    this.setState({ isEdit: true });
  };

  generateValueCell = () => {
    const { tableData, indexCell } = this.props;
    const { isEdit } = this.state;
    const { currency, formulaCell, valueCell } = tableData[indexCell];
    let newValue = valueCell;

    if (valueCell && currency) {
      newValue = generateCurrencyFormat(valueCell, currency);
    }

    if (isUrlValid(valueCell)) {
      newValue = (
        <a href={valueCell} target='_blank' rel='noopener noreferrer'>
          {valueCell}
        </a>
      );
    }

    if (isEdit) {
      newValue = (
        <input
          autoFocus
          defaultValue={formulaCell || valueCell}
          ref={(r) => (this.refInput = r)}
        />
      );
    }

    return newValue;
  };

  render() {
    const { selectedCell, indexCell, tableData } = this.props;

    if (Object.keys(tableData).length === 0) return null;

    const isSelectedCell = indexCell === selectedCell;
    const correctValueCell = this.generateValueCell();
    const styleSelectedCell = isSelectedCell ? 'SelectedCell' : null;

    return (
      <td
        className={styleSelectedCell}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        {correctValueCell}
      </td>
    );
  }
}

Cell.propTypes = {
  indexCell: PropTypes.string,
  selectedCell: PropTypes.string,
  tableData: PropTypes.object,
  setCellData: PropTypes.func,
  setSelectedCell: PropTypes.func,
};

const mapStateToProps = (state) => ({
  selectedCell: state.selectedCell,
  tableData: state.tableData,
});

export default connect(mapStateToProps, { setSelectedCell, setCellData })(Cell);
