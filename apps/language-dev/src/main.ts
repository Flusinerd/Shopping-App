import { Lexer, Parser } from '@jk/language';
import * as fs from 'fs';
import * as path from 'path';

const files = fs.readdirSync(path.join(__dirname, 'assets'));
const filePaths = files.map((file) => path.parse(file));
const jkFiles = filePaths.filter((file) => file.ext === '.jk');

for (const jkFile of jkFiles) {
  console.log(`Processing ${jkFile.base}`);
  const lexer = new Lexer(
    fs.readFileSync(path.join(__dirname, 'assets', jkFile.base), 'utf8')
  );

  const parser = new Parser(lexer);
}
