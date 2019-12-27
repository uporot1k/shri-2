import parser from "./parser";
import Validator from "./validator";
import traverse from "@babel/traverse";
function lint(input) {
  let test = JSON.parse(input);
  
  const ast = parser((test));
  debugger
  traverse(ast, {
    enter(path) {
      // in this example change all the variable `n` to `x`
      console.log(path);
    }
  });
  const validator = new Validator(ast);
  // console.log(validator);
  validator.run();

  return validator.report();
}

export default lint;
