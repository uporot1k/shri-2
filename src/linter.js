import parser from "./parser";
import Validator from "./validator";


function lint(input) {

  const ast = parser(input);
  
  const validator = new Validator(ast);

  validator.run();

  return validator.report();
}

export default lint;
