var walk = require( 'estree-walker' ).walk;


import Reporter from './reporter';
import RuleTester from './rule-tester/RuleTester';

import invalid_button_position from './rules/invalid_button_position';
import invalid_button_size from './rules/invalid_button_size';
import invalid_h2_position from './rules/invalid_h2_position';
import invalid_h3_position from './rules/invalid_h3_position';
import several_h1 from './rules/several_h1';
import text_sizes_should_be_equal from './rules/text_sizes_should_be_equal';
import too_much_marketing_blocks from './rules/too_much_marketing_blocks';


class Validator extends Reporter {
  constructor(ast) {
    super();
    this.ast = ast;
    this.rules = [
      invalid_button_position,
      invalid_button_size,
      invalid_h2_position,
      invalid_h3_position,
      several_h1,
      text_sizes_should_be_equal,
      too_much_marketing_blocks
    ]
    this.ruleTester = new RuleTester();
  }
  run() {
    console.log(this.ast);
    walk(this.ast, {
      enter: this.onEnter.bind(this)
    })
  }
  onEnter(node, parent, prop, index) {
    const rules = this.rules;
    rules.forEach(rule => {
      if (prop === 'children') {
        let ruleCheckResult = rule.check(node, parent, prop);
        
        if (typeof ruleCheckResult === 'object') {
          debugger
          this.commitError(ruleCheckResult);
        }
      }
    })
    // debugger
  }
}

export default Validator;