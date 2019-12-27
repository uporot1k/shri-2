import { parse } from '@babel/parser';

function parser(input) {
  return parse(input, {
    plugins: [
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-syntax-json-strings"
    ]
  });
}

export default parser;