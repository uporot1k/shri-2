import parser from "./Parser";
import Validator from "./Validator";


function lint(input) {

  const ast = parser(input);
  
  const validator = new Validator(ast);

  validator.run();

  return validator.report();
}

export default lint;
