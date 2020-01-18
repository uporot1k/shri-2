var walk = require( 'estree-walker' ).walk;


import Reporter from './Reporter';

import invalid_button_position from './rules/invalid_button_position';
import invalid_button_size from './rules/invalid_button_size';
import invalid_placeholder_size from './rules/invalid_placeholder_size';
import invalid_titles_position from './rules/invalid_titles_position';
import text_sizes_should_be_equal from './rules/text_sizes_should_be_equal';
import too_much_marketing_blocks from './rules/too_much_marketing_blocks';


class Validator extends Reporter {
  constructor(ast) {
    super();
    this.ast = ast;
    this.rules = [
      invalid_button_position,
      invalid_placeholder_size,
      invalid_button_size,
      invalid_titles_position,
      text_sizes_should_be_equal,
      too_much_marketing_blocks
    ]
  }
  run() {
    walk(this.ast, {
      enter: this.onEnter.bind(this)
    })
  }
  onEnter(node, parent, prop, index) {
    const rules = this.rules;
    rules.forEach(rule => {
      
      rule.check({node, parent, prop}, this.commitError.bind(this));
    })
  }
}

export default Validator;