export enum TOKEN_TYPES {
  ILLEGAL = 'ILLEGAL',
  EOF = 'EOF',

  // Identifiers + literals
  IDENTIFIER = 'IDENTIFIER', // add, foobar, x, y, ...
  STRING = 'STRING', // "foobar"
  FLOAT = 'FLOAT', // 1.1
  INTEGER = 'INTEGER', // 1, 2, 3, ...

  // Operators
  ASSIGN = '=',
  PLUS = '+',
  MINUS = '-',
  BANG = '!',
  ASTERISK = '*',
  SLASH = '/',

  LT = '<',
  GT = '>',
  COMMA = ',',
  DOT = '.',

  // Delimiters
  COLON = ':',
  SEMICOLON = ';',

  LPAREN = '(',
  RPAREN = ')',
  LBRACE = '{',
  RBRACE = '}',
  LBRACKET = '[',
  RBRACKET = ']',
  QUOTE = '"',

  // Linebreak
  NEWLINE = '\n',

  // Whitespace
  WHITESPACE = ' ',

  // Comments
  COMMENT = '#',

  // Keywords
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  EQ = 'EQ',
  NEQ = 'NEQ',
  GTE = 'GTE',
  LTE = 'LTE',
  NULL = 'NULL',
  NIL = 'NIL',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  FUNCTION = 'FUNCTION',
  LET = 'LET',
  IF = 'IF',
  ELSE = 'ELSE',
  RETURN = 'RETURN',
  WHILE = 'WHILE',
  BREAK = 'BREAK',
  CONTINUE = 'CONTINUE',
  FOR = 'FOR',
}

export class Token {
  Type: TOKEN_TYPES;
  Literal: string;
  Line: number;
  Column: number;

  constructor(
    type: TOKEN_TYPES,
    literal: string,
    line: number,
    column: number
  ) {
    this.Type = type;
    this.Literal = literal;
    this.Line = line;
    this.Column = column;
  }

  public toString(): string {
    return `${this.Type} ${this.Literal}`;
  }
}

// LL(1) Grammar
// https://en.wikipedia.org/wiki/LL_parser
// https://en.wikipedia.org/wiki/Recursive_descent_parser
// https://en.wikipedia.org/wiki/LL_grammar
export class Lexer {
  private readonly source: string;
  private readonly sourceLength: number;

  private position = 0;
  private line = 1;
  private column = 0;

  constructor(source: string) {
    this.source = source;
    this.sourceLength = source.length;
    console.log(`Lexer source: ${this.source}`);
  }

  private whitespace(): void {
    while (
      this.peek() === ' ' ||
      this.peek() === '\t' ||
      this.peek() === '\r' ||
      this.peek() === '\v' ||
      this.peek() === '\f'
    ) {
      this.advance();
    }
  }

  private peek(): string {
    if (this.position >= this.sourceLength) {
      return 'EOF';
    }
    return this.source[this.position];
  }

  private advance(): void {
    if (this.peek() === '\n') {
      this.line++;
      this.column = 0;
    }
    this.position++;
    this.column++;
  }

  private match(expected: string, type: TOKEN_TYPES): Token {
    if (this.peek() === expected) {
      const token = new Token(type, expected, this.line, this.column);
      this.advance();
      return token;
    }
    throw new Error(`Expected ${expected} but got ${this.peek()}`);
  }

  public nextToken(): Token {
    // While not at end of source
    const c = this.peek();
    switch (c) {
      case '=':
        return this.match('=', TOKEN_TYPES.ASSIGN);
      case '+':
        return this.match('+', TOKEN_TYPES.PLUS);
      case '-':
        return this.match('-', TOKEN_TYPES.MINUS);
      case '!':
        return this.match('!', TOKEN_TYPES.BANG);
      case '*':
        return this.match('*', TOKEN_TYPES.ASTERISK);
      case '/':
        return this.match('/', TOKEN_TYPES.SLASH);
      case '<':
        return this.match('<', TOKEN_TYPES.LT);
      case '>':
        return this.match('>', TOKEN_TYPES.GT);
      case ',':
        return this.match(',', TOKEN_TYPES.COMMA);
      case '.':
        return this.match('.', TOKEN_TYPES.DOT);
      case ':':
        return this.match(':', TOKEN_TYPES.COLON);
      case '"':
      case "'":
        return this.match(c, TOKEN_TYPES.QUOTE);
      case ';':
        return this.match(';', TOKEN_TYPES.SEMICOLON);
      case '(':
        return this.match('(', TOKEN_TYPES.LPAREN);
      case ')':
        return this.match(')', TOKEN_TYPES.RPAREN);
      case '{':
        return this.match('{', TOKEN_TYPES.LBRACE);
      case '}':
        return this.match('}', TOKEN_TYPES.RBRACE);
      case '[':
        return this.match('[', TOKEN_TYPES.LBRACKET);
      case ']':
        return this.match(']', TOKEN_TYPES.RBRACKET);
      case '\n':
        return this.match('\n', TOKEN_TYPES.NEWLINE);
      case ' ':
      case '\t':
      case '\r':
      case '\v':
      case '\f':
        this.whitespace();
        return this.nextToken();
      case '#':
        this.advance();
        while (this.peek() !== '\n') {
          this.advance();
        }
        return this.nextToken();
      case '\0':
        return this.match('\0', TOKEN_TYPES.NULL);
      default:
        if (this.isDigit(c)) {
          return this.number();
        }
        if (this.isAlphaNumeric(c)) {
          return this.identifier();
        }
        throw new Error(
          `Unexpected character ${c} at ${this.line}:${this.column} in ${this.source}`
        );
    }
  }

  public allTokens(): Token[] {
    const tokens: Token[] = [];
    while (this.position < this.sourceLength) {
      tokens.push(this.nextToken());
    }
    // Add EOF token
    tokens.push(new Token(TOKEN_TYPES.EOF, '', this.line, this.column));
    return tokens;
  }

  // Parses a literal number to int or float
  private number(): Token {
    let literal = '';
    while (this.isDigit(this.peek())) {
      literal += this.peek();
      this.advance();
    }
    if (this.peek() === '.') {
      literal += this.peek();
      this.advance();
      while (this.isDigit(this.peek())) {
        literal += this.peek();
        this.advance();
      }
      return new Token(TOKEN_TYPES.FLOAT, literal, this.line, this.column);
    }
    return new Token(TOKEN_TYPES.INTEGER, literal, this.line, this.column);
  }

  private identifier(): Token {
    let value = '';
    while (this.isAlphaNumeric(this.peek())) {
      value += this.peek();
      this.advance();
    }

    // Check for keywords
    switch (value) {
      case 'let':
        return new Token(TOKEN_TYPES.LET, value, this.line, this.column);
      case 'function':
        return new Token(TOKEN_TYPES.FUNCTION, value, this.line, this.column);
      case 'if':
        return new Token(TOKEN_TYPES.IF, value, this.line, this.column);
      case 'else':
        return new Token(TOKEN_TYPES.ELSE, value, this.line, this.column);
      case 'return':
        return new Token(TOKEN_TYPES.RETURN, value, this.line, this.column);
      case 'true':
        return new Token(TOKEN_TYPES.TRUE, value, this.line, this.column);
      case 'false':
        return new Token(TOKEN_TYPES.FALSE, value, this.line, this.column);
      case 'null':
        return new Token(TOKEN_TYPES.NULL, value, this.line, this.column);
      case 'for':
        return new Token(TOKEN_TYPES.FOR, value, this.line, this.column);
      case 'while':
        return new Token(TOKEN_TYPES.WHILE, value, this.line, this.column);
      case 'break':
        return new Token(TOKEN_TYPES.BREAK, value, this.line, this.column);
      case 'continue':
        return new Token(TOKEN_TYPES.CONTINUE, value, this.line, this.column);
      case 'and':
        return new Token(TOKEN_TYPES.AND, value, this.line, this.column);
      case 'or':
        return new Token(TOKEN_TYPES.OR, value, this.line, this.column);
      default:
        return new Token(TOKEN_TYPES.IDENTIFIER, value, this.line, this.column);
    }
  }

  private isDigit(c: string): boolean {
    return c >= '0' && c <= '9';
  }

  private isAlphaNumeric(c: string): boolean {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_';
  }
}
