/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import ReactDOMServer from 'react-dom/server';
import OpCategory from './SyntaxOpCategory';
import FormulaUtils from './FormulaUtils';
import Source from './Source';

function parseSyntaxOperandIntoString(dict, operand) {
  if (operand.StaticValue) {
    return operand.StaticValue;
  }

  if (operand.Name) {
    const aVal = dict[operand.Name];
    if (aVal.Source === Source.ProgressiveFormula) {
      const stageIdx = operand.StageIdx == null ? 0 : operand.StageIdx;

      const clickable = FormulaUtils.createClickableVariableShortDesc(operand.Name, aVal.Stages[stageIdx].Value);
      return ReactDOMServer.renderToStaticMarkup(clickable);
    }

    const clickable = FormulaUtils.createClickableVariableShortDesc(operand.Name, aVal.Value);
    return ReactDOMServer.renderToStaticMarkup(clickable);
  }

  const innerFormula = SyntaxUtils.parseFormula(dict, operand.Node);

  return operand.WrapInParentheses ? `(${innerFormula})` : innerFormula;
}

function buildFormula_FunctionCall(dict, { Operation, Operands }) {
  const args = Operands.map((operand) => parseSyntaxOperandIntoString(dict, operand)).join(', ');

  return `${Operation}(${args})`;
}

function buildFormula_TwoValMiddleOp(dict, { Operation, Operands }) {
  const operand1 = parseSyntaxOperandIntoString(dict, Operands[0]);
  const operand2 = parseSyntaxOperandIntoString(dict, Operands[1]);

  return `${operand1} ${Operation} ${operand2}`;
}

function buildFormula_AssignVariable(dict, { Operands }) {
  return parseSyntaxOperandIntoString(dict, Operands[0]);
}

var SyntaxUtils = {
  parseFormula(dict, formula) {
    if (formula.Category === OpCategory.FunctionCall) {
      return buildFormula_FunctionCall(dict, formula);
    }

    if (formula.Category === OpCategory.TwoValMiddleOp) {
      return buildFormula_TwoValMiddleOp(dict, formula);
    }

    if (formula.Category === OpCategory.AssignVariable) {
      return buildFormula_AssignVariable(dict, formula);
    }

    if (formula.Category === OpCategory.AssignStatic) {
      return formula.Operation;
    }

    return 'Invalid Formula';
  },
};

export default SyntaxUtils;
