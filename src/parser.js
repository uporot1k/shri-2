import parse from 'json-to-ast';

function parser(input) {
  return parse(JSON.parse(input));
}

export default parser;