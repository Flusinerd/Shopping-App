import { Token } from '../../lexer/lexer';

export enum EXPRESSION_TYPES {
  INTEGER = 'INTEGER',
  FLOAT = 'FLOAT',
  BOOLEAN = 'BOOLEAN',
  STRING = 'STRING',
  NULL = 'NULL',
  UNDEFINED = 'UNDEFINED',
  IDENTIFIER = 'IDENTIFIER',
  FUNCTION = 'FUNCTION',
  CALL = 'CALL',
  BINARY = 'BINARY',
  UNARY = 'UNARY',
  LITERAL = 'LITERAL',

  // Logical
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',

  // Comparison
  EQ = 'EQ',
  NEQ = 'NEQ',
  GTE = 'GTE',
  LTE = 'LTE',

  INFIX = 'INFIX',

  // Grouping
  GROUPED = 'GROUPED',
}

export abstract class Expression {
  public Token: Token;

  constructor(token: Token) {
    this.Token = token;
  }
}
