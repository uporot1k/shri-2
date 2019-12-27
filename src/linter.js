import parser from "./parser";
import Validator from "./validator";

var walk = require( 'estree-walker' ).walk;
function lint(input) {

  const ast = parser(input);
  
  const validator = new Validator(ast);

  validator.run();

  return validator.report();
}

export default lint;
