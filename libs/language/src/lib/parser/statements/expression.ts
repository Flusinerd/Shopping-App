import { Expression } from '../expressions/expression';
import { Statement, STATEMENT_TYPES } from './statement';

export class ExpressionStatement extends Statement {
  public Expression: Expression;

  constructor(expression: Expression) {
    super(STATEMENT_TYPES.EXPRESSION);
    this.Expression = expression;
  }
}
