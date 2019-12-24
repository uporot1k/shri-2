import parse from 'json-to-ast';

function parser(input) {
  return parse(input);
}

export default parser;