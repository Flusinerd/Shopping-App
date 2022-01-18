import { Token } from '../../lexer/lexer';
import { Expression } from '../expressions/expression';
import { Identifier } from '../parser';
import { Statement, STATEMENT_TYPES } from './statement';

export class LetStatement extends Statement {
  public Token: Token;
  public Name: Identifier;
  public Value: Expression;

  constructor(token: Token, name: Identifier, value: Expression) {
    super(STATEMENT_TYPES.LET);
    this.Token = token;
    this.Name = name;
    this.Value = value;
  }
}
