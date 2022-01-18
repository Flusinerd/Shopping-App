export enum STATEMENT_TYPES {
  EXPRESSION = 'EXPRESSION',
  LET = 'LET',
  RETURN = 'RETURN',
}

export class Statement {
  public Type: STATEMENT_TYPES;

  constructor(type: STATEMENT_TYPES) {
    this.Type = type;
  }
}
