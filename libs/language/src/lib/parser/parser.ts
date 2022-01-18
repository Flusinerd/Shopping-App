import { Lexer, Token, TOKEN_TYPES } from '../lexer/lexer';
import { Expression } from './expressions/expression';
import { IntegerLiteral } from './literals/integer';
import { ExpressionStatement } from './statements/expression';
import { Statement } from './statements/statement';

// LL(1) Grammar
// https://en.wikipedia.org/wiki/LL_parser
// https://en.wikipedia.org/wiki/Recursive_descent_parser
// https://en.wikipedia.org/wiki/LL_grammar
// https://en.wikipedia.org/wiki/Parsing_expression_grammar
export class Parser {
  private readonly lexer: Lexer;
  private currentToken: Token;

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.nextToken();

    this.parseProgram();
  }

  private peek(): Token {
    return this.currentToken;
  }

  private advance(): void {
    this.currentToken = this.lexer.nextToken();
  }

  private parseProgram(): Program {
    const program = new Program();
    while (this.peek().Type !== TOKEN_TYPES.EOF) {
      program.Statements.push(this.parseStatement());
    }
    return program;
  }

  private parseStatement(): Statement {
    switch (this.peek().Type) {
      case TOKEN_TYPES.IDENTIFIER:
        return this.parseExpressionStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseExpressionStatement(): ExpressionStatement {
    const expression = this.parseExpression(0);
    if (this.peek().Type === TOKEN_TYPES.SEMICOLON) {
      this.advance();
    }
    return new ExpressionStatement(expression);
  }

  private parseExpression(precedence: number): Expression {
    const prefix = this.prefixParseFns[this.peek().Type];
    if (prefix === undefined) {
      throw new Error(`No prefix parse function for ${this.peek().Type}`);
    }
    let left = prefix();
    this.advance();
    while (precedence < this.peekPrecedence()) {
      const infix = this.infixParseFns[this.peek().Type];
      if (infix === undefined) {
        throw new Error(`No infix parse function for ${this.peek().Type}`);
      }
      left = infix(left);
      this.advance();
    }
    return left;
  }

  private prefixParseFns: { [key: string]: () => Expression } = {
    [TOKEN_TYPES.INTEGER]: this.parseIntegerLiteral.bind(this),
    [TOKEN_TYPES.PLUS]: this.parsePrefixExpression.bind(this),
  };

  private parsePrefixExpression(): PrefixExpression {
    return new PrefixExpression(
      this.currentToken,
      this.parseExpression(PRECEDENCE.LOWEST)
    );
  }

  private infixParseFns: { [key: string]: (left: Expression) => Expression } = {
    [TOKEN_TYPES.PLUS]: (left: Expression) =>
      new InfixExpression(
        left,
        this.currentToken,
        this.parseExpression(PRECEDENCE.ADDITION)
      ),
    [TOKEN_TYPES.MINUS]: (left: Expression) =>
      new InfixExpression(
        left,
        this.currentToken,
        this.parseExpression(PRECEDENCE.ADDITION)
      ),
    [TOKEN_TYPES.ASTERISK]: (left: Expression) =>
      new InfixExpression(
        left,
        this.currentToken,
        this.parseExpression(PRECEDENCE.MULTIPLICATION)
      ),
    [TOKEN_TYPES.SLASH]: (left: Expression) =>
      new InfixExpression(
        left,
        this.currentToken,
        this.parseExpression(PRECEDENCE.MULTIPLICATION)
      ),
  };

  private peekPrecedence(): number {
    const precedence = this.precedence[this.peek().Type];
    if (precedence === undefined) {
      return PRECEDENCE.LOWEST;
    }
    return precedence;
  }

  private precedence: { [key: string]: number } = {
    [TOKEN_TYPES.PLUS]: PRECEDENCE.ADDITION,
    [TOKEN_TYPES.MINUS]: PRECEDENCE.ADDITION,
    [TOKEN_TYPES.ASTERISK]: PRECEDENCE.MULTIPLICATION,
    [TOKEN_TYPES.SLASH]: PRECEDENCE.MULTIPLICATION,
  };

  // private parseIdentifier(): Identifier {
  //   return new Identifier(this.currentToken);
  // }

  private parseIntegerLiteral(): IntegerLiteral {
    return new IntegerLiteral(this.currentToken);
  }

  // private parseFloatLiteral(): FloatLiteral {
  //   return new FloatLiteral(this.currentToken);
  // }

  // private parseStringLiteral(): StringLiteral {
  //   return new StringLiteral(this.currentToken);
  // }

  // private parseBoolean(): BooleanLiteral {
  //   return new BooleanLiteral(this.currentToken);
  // }

  // private parseNull(): NullLiteral {
  //   return new NullLiteral(this.currentToken);
  // }
}

export class Program {
  public Statements: Statement[] = [];
}

export enum PRECEDENCE {
  LOWEST = 0,
  COMMA = 1,
  ASSIGNMENT = 2,
  LOGICAL_OR = 3,
  LOGICAL_AND = 4,
  EQUALITY = 5,
  COMPARISON = 6,
  ADDITION = 7,
  MULTIPLICATION = 8,
  EXPONENTIATION = 9,
  POSTFIX = 10,
  CALL = 11,
  GROUPING = 12,
}

export class InfixExpression extends Expression {
  public Left: Expression;
  public Operator: Token;
  public Right: Expression;
  constructor(left: Expression, operator: Token, right: Expression) {
    super(operator);
    this.Left = left;
    this.Operator = operator;
    this.Right = right;
  }
}

export class PrefixExpression extends Expression {
  public Operator: Token;
  public Right: Expression;
  constructor(operator: Token, right: Expression) {
    super(operator);
    this.Operator = operator;
    this.Right = right;
  }
}
