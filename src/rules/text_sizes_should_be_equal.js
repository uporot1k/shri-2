import Rule from '../Rule';

var walk = require( 'estree-walker' ).walk;

import { getContentBlock } from '../utils';
import { getModValueByType } from '../utils';

function triggerFn(node, parent, prop) {
  if (node.type === "Property") {
    if ((node.key.value === "block" && node.value.value === "warning")) {
      const { children } = parent;
      const contentBlock = getContentBlock(children);
      const contentBlockChildren = contentBlock.children;
      const textBlockIndex = contentBlockChildren.findIndex((child) => child.children[0].value.value === 'text');

      if (textBlockIndex >= 0) {
        return parent;
      }
    }
  }
  
  return false;
}

function lintFn(block, cb, commitFn) {
  let error = null;
  const ModSet = new Set();
  
  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Property" && node.value.value === "text") {
        if(!error) {
          let nodeModValue = getModValueByType(parent, "size");
          ModSet.add(nodeModValue);
  
          if (ModSet.size > 1) {
            cb(node.loc, commitFn)
          }
        }
      }
    }
  })
}

const ruleConfig = {
  code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
  error: "Все текста должны быть эталонного размера",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;