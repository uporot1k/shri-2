import parse from 'json-to-ast';

function parser(input) {
  return parse(input, {
    plugins: [
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-syntax-json-strings"
    ]
  });
}

export default parser;