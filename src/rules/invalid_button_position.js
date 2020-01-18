import Rule from '../Rule';

var walk = require("estree-walker").walk;

import { getContentBlock } from "../utils";

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
  let placeholderIsFirst = false;

   
  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Property" && node.value.value === "placeholder") {
        placeholderIsFirst = true;
      }
      if (node.type === "Property" && node.value.value === "button") {
        if (!placeholderIsFirst) {
          cb(node.loc,commitFn)
        }
      }
    }
  })
}

const ruleConfig = {
  code: "WARNING.INVALID_BUTTON_POSITION",
  error: "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;