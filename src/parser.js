import { parse } from '@babel/parser';

function parser(input) {
  return parse(JSON.parse(input));
}

export default parser;