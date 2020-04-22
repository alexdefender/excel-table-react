import store from '../store';
import isLink from './isLink';

let formulaName = '';
let functionFormula = '';

const formulas = {
  '=SUM(': function sum(...args) {
    const { tableData, selectedCell } = store.getState();

    const newArgs = args.map((el) => {
      const isCorrectTypes = isTypesNumOrCurrency(
        tableData[selectedCell],
        tableData[el]
      );

      if (isCorrectTypes) {
        if (tableData[el]) {
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
    let argsLength = args.length;
    const lastElement = args.pop();

    if (lastElement === '') {
      argsLength -= 1;
    } else if (isNaN(lastElement)) {
      return '#ERROR!';
    }

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
    const res = isLink(args[0]);
    if (res) return args[0].toLowerCase();
    return '#ERROR!';

    // =HYPERLINK(http://site.ru
  },
};

export default function generateFormula(val) {
  let value = val.toUpperCase();
  value.slice(-1);
  let result = null;

  if (hasFormula(value)) {
    const argumentsFormula = transformValueToArgFormula(value);
    if (argumentsFormula.length > 0) {
      result = functionFormula(...argumentsFormula);
    }
  }

  if (value[value.length - 1] !== ')') value += ')';
  console.log({ result, value });

  return {
    newValueCell: result,
    formulaCell: value,
  };
}

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

function isTypesNumOrCurrency(selectedCell, nextCell) {
  const types = ['number', 'currency'];
  const typeSelectedCell = selectedCell.type;
  const typeNextCell = nextCell?.type;

  if (types.includes(typeSelectedCell) && types.includes(typeNextCell))
    return true;
  if (typeSelectedCell === typeNextCell) return true;
  if (types.includes(typeSelectedCell)) return true;
  return false;
}
