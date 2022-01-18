import { Token } from '../../lexer/lexer';
import { Expression } from './expression';

export class InfixExpression extends Expression {
  public Left: Expression;
  public Operator: string;
  public Right: Expression;

  constructor(
    token: Token,
    left: Expression,
    operator: string,
    right: Expression
  ) {
    super(token);
    this.Left = left;
    this.Operator = operator;
    this.Right = right;
  }
}
