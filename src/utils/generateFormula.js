import store from '../store';

let formulaName = '';
let functionFormula = '';

const isTypesNumOrCurrency = (selectedCell, nextCell) => {
  const types = ['number', 'currency'];
  const typeSelectedCell = selectedCell.type;
  const typeNextCell = nextCell?.type;

  if (types.includes(typeSelectedCell) && types.includes(typeNextCell))
    return true;
  if (typeSelectedCell === typeNextCell) return true;
  if (types.includes(typeSelectedCell)) return true;
  return false;
};

const formulas = {
  '=SUM(': function sum() {
    const { tableData, selectedCell } = store.getState();
    const args = [...arguments];
    const newArgs = args.map((el) => {
      if (isTypesNumOrCurrency(tableData[selectedCell], tableData[el])) {
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
  '=AVERAGE(': function average() {
    const sum = formulas['=SUM('](...arguments);
    let argsLength = arguments.length;
    const lastElement = [].pop.call(arguments);

    if (lastElement === '') {
      argsLength -= 1;
    } else if (isNaN(lastElement)) {
      return '#ERROR!';
    }

    return sum / argsLength;
  },
  '=CONCAT(': function concat() {
    return [].join.call(arguments, '');
  },
  '=HYPERLINK(': function hyperlink() {},
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

const transformValueToArgFormula = (value) =>
  value
    .replace(/ +/g, ' ')
    .replace(/\)+/g, '')
    .replace(/; +|;+| ; +/g, ';')
    .replace(formulaName, '')
    .split(';');

export const generateFormula = (val) => {
  const value = val.toUpperCase();
  let result = null;

  if (hasFormula(value)) {
    const argumentsFormula = transformValueToArgFormula(value);
    if (argumentsFormula.length > 0) {
      result = functionFormula(...argumentsFormula);
    }
  }
  console.log({ result, value });

  // if (!valueUpper.lastIndex(')')) valueUpper += ')';

  return {
    valueCell: result,
    formulaCell: value,
  };

  // =SUM()
  // =AVERAGE(…)
  // =CONCAT(…)
  // =HYPERLINK(…)
};
