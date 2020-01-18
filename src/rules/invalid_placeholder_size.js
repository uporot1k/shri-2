import Rule from '../Rule';

var walk = require("estree-walker").walk;

import { getContentBlock } from "../utils";
import { getModValueByType } from "../utils";

function triggerFn(node, parent, prop) {
  if (node.type === "Property") {
    if ((node.key.value === "block" && node.value.value === "warning")) {
      const { children } = parent;
      const contentBlock = getContentBlock(children);
      const contentBlockChildren = contentBlock.children;
      const blockIndex = contentBlockChildren.findIndex((child) => child.children[0].value.value === 'placeholder');
      if (blockIndex >= 0) {
        return parent;
      }
    }
  }
  
  return false;
}

function lintFn(block, cb, commitFn) {
  const correctSizes = ['s', 'm', 'l'];

  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Property" && node.value.value === "placeholder") {
        let nodeModValue = getModValueByType(parent, "size");
        
        const isCorrectSize = correctSizes.some(size => nodeModValue === size);
        
        if (!isCorrectSize) {
          cb(parent.loc, commitFn);
        }
      }
    }
  })
}

const ruleConfig = {
  code: "WARNING.INVALID_PLACEHOLDER_SIZE",
  error: "Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;