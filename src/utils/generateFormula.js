import store from '../store';

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
    let argsLength = arguments.length;
    const lastElement = args.pop();

    if (lastElement === '') {
      argsLength -= 1;
    } else if (isNaN(lastElement)) {
      return '#ERROR!';
    }

    return sum / argsLength;
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
    const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const res = re.test(args[0].toLowerCase());
    if (res) return args[0].toLowerCase();
    return '#ERROR!';

    // =HYPERLINK(http://site.ru
  },
};

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

function splitArguments(args) {
  return;
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
