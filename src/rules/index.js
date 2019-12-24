import invalid_button_position from './invalid_button_position';
import invalid_button_size from './invalid_button_size';
import invalid_h2_position from './invalid_h2_position';
import invalid_h3_position from './invalid_h3_position';
import several_h1 from './several_h1';
import text_sizes_should_be_equal from './text_sizes_should_be_equal';
import too_much_marketing_blocks from './too_much_marketing_blocks';

class Rules {
  constructor() {
    this.rules = [
      invalid_button_position,
      invalid_button_size,
      invalid_h2_position,
      invalid_h3_position,
      several_h1,
      text_sizes_should_be_equal,
      too_much_marketing_blocks
    ]
    this.init();
  }
  init() {
    return this.rules;
  }
}

export default Rules;