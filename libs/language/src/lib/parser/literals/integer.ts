import { Token } from '../../lexer/lexer';
import { Literal } from './literal';

export class IntegerLiteral extends Literal {
  public Value: number;

  constructor(token: Token) {
    super(token);
    this.Value = parseInt(token.Literal, 10);
  }

  evaluate() {
    return this.Value;
  }
}
