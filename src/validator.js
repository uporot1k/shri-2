import Reporter from './reporter';
import Rules from './rules';

class Validator extends Reporter {
  constructor(ast) {
    super();
    this.ast = ast;
    this.rules = new Rules();
  }
  run() {

  }
}

export default Validator;