import { Expression } from '../expressions/expression';
import { Statement, STATEMENT_TYPES } from './statement';

export class ReturnStatement extends Statement {
  public Value: Expression;

  constructor(value: Expression) {
    super(STATEMENT_TYPES.RETURN);
    this.Value = value;
  }
}
