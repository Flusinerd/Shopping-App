import { Token } from '../../lexer/lexer';

export abstract class Literal {
  public Token: Token;

  constructor(token: Token) {
    this.Token = token;
  }

  abstract evaluate(): never;
}
