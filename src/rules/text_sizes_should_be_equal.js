import Rule from "../Rule";

var walk = require("estree-walker").walk;

import { getContentBlock } from "../utils";
import { getModValueByType } from "../utils";

function triggerFn(node, parent, prop) {
  let triggObj = null;

  if (
    node.type === "Property" &&
    node.key.value === "block" &&
    node.value.value === "warning"
  ) {
    walk(parent, {
      enter: function(n, p, pr) {
        if (
          n.type === "Property" &&
          n.key.value === "block" &&
          n.value.value === "text"
        ) {
          triggObj = parent;
        }
      }
    });
  }

  if (triggObj) {
    return triggObj;
  }

  return false;
}

function lintFn(block, cb, commitFn) {
  let error = null;
  const ModSet = new Set();

  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Property" && node.value.value === "text" && !error) {
        let nodeModValue = getModValueByType(parent, "size");
        ModSet.add(nodeModValue);

        if (ModSet.size > 1) {
          error = true;
        }
      }
    }
  });

  if (error) {
    cb(block.loc, commitFn);
  }
}

const ruleConfig = {
  code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
  error: "Все текста должны быть эталонного размера",
  triggerFn,
  lintFn
};

const rule = new Rule(ruleConfig);

export default rule;
