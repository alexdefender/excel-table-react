import store from '../store';
import isUrlValid from './isUrlValid';

let formulaName = '';
let functionFormula = '';
let selectedCell = '';

const formulas = {
  '=SUM(': function sum(...args) {
    const { tableData } = store.getState();
    const newArgs = args.map((el) => {
      const isCorrectTypes = isTypesNumOrCurrency(
        tableData[selectedCell],
        tableData[el]
      );

      if (isCorrectTypes) {
        if (tableData[el]) {
          if (tableData[selectedCell].type !== tableData[el].type) {
            return false;
          }
          return tableData[el].valueCell;
        }
        return isNaN(el) ? false : el;
      }
      return false;
    });

    if (newArgs.includes(false)) return '#ERROR!';

    return newArgs.reduce((sum, el) => +sum + +el);
  },
  '=AVERAGE(': function average(...args) {
    const sum = formulas['=SUM('](...args);
    const { tableData } = store.getState();

    const argsLength = args.reduce((sum, el) => {
      if (el !== '' && !isNaN(el)) return ++sum;
      if (tableData[el] !== undefined && tableData[el].valueCell !== '') {
        return ++sum;
      }
      return sum;
    }, 0);

    const result = (sum / argsLength)
      .toFixed(2)
      .toString()
      .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');

    return isNaN(result) ? '#ERROR!' : result;
  },
  '=CONCAT(': function concat(...args) {
    const { tableData } = store.getState();

    const newArgs = args.map((el) => {
      if (tableData[el]) {
        return tableData[el].valueCell;
      }
      return el;
    });

    return newArgs.join('');
  },
  '=HYPERLINK(': function hyperlink(...args) {
    if (args.length > 1) return '#ERROR!';
    const res = isUrlValid(args[0].toLowerCase());
    if (res) return args[0].toLowerCase();
    return '#ERROR!';
  },
};

function hasFormula(value) {
  return Object.keys(formulas).some((el) => {
    if (value.includes(el)) {
      formulaName = el;
      functionFormula = formulas[el];
      return true;
    }
    return false;
  });
}

function transformValueToArgFormula(value) {
  return value
    .replace(/ +/g, ' ')
    .replace(/\)+/g, '')
    .replace(/; +|;+| ; +/g, ';')
    .replace(formulaName, '')
    .split(';');
}

function isTypesNumOrCurrency(cell, nextCell) {
  const types = ['number', 'currency'];
  const typeSelectedCell = cell.type;
  const typeNextCell = nextCell?.type;

  if (types.includes(typeSelectedCell) && types.includes(typeNextCell))
    return true;
  if (types.includes(typeSelectedCell)) return true;
  return false;
}

export default function generateFormula(val, cell) {
  let value = val.toUpperCase();
  value.slice(-1);
  let result = null;
  selectedCell = cell;

  if (hasFormula(value)) {
    const argumentsFormula = transformValueToArgFormula(value);
    if (argumentsFormula.length > 0) {
      result = functionFormula(...argumentsFormula);
    }
  }

  if (value[value.length - 1] !== ')') value += ')';

  return {
    newValueCell: result,
    formulaCell: value,
  };
}
