const formulas = {
  '=SUM(': function sum() {
    return [].reduce.call(arguments, (sum, el) => +sum + +el);
  },
  '=AVERAGE(': function average() {
    return formulas['=SUM('](...arguments) / arguments.length;
  },
  '=CONCAT(': function concat() {
    return [].join.call(arguments, '');
  },
  '=HYPERLINK(': function hyperlink() {},
};

let formulaName = '';
let functionFormula = '';

const transformValueToArgFormula = (value) =>
  value
    .replace(/ +|\)/g, ' ')
    .replace(/; +|;+| ; +/g, ';')
    .replace(formulaName, '')
    .split(';');

export const generateFormula = (value) => {
  let valueUpper = value.toUpperCase();
  let result = null;
  const hasFormula = Object.keys(formulas).some((el) => {
    if (valueUpper.includes(el)) {
      formulaName = el;
      functionFormula = formulas[el];
      return true;
    }
    return false;
  });

  if (hasFormula) {
    const argumentsFormula = transformValueToArgFormula(valueUpper);
    console.log({argumentsFormula})

    if (
      argumentsFormula.length > 0 &&
      argumentsFormula.every((el) => !isNaN(el))
    ) {
      result = functionFormula(...argumentsFormula);
    }
  }

  // if (!valueUpper.lastIndex(')')) valueUpper += ')';
  console.log({ result, valueUpper });

  return {
    valueCell: result,
    formulaCell: valueUpper,
  };

  // =SUM()
  // =AVERAGE(…)
  // =CONCAT(…)
  // =HYPERLINK(…)
};
