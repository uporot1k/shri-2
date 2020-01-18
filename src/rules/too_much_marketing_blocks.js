import Rule from '../Rule';

var walk = require("estree-walker").walk;

import { getModValueByType } from "../utils";

function isMarketingBlock(name) {
  const marketingBlockArr = ["offer", "commercial"];

  return marketingBlockArr.includes(name);
}

function isCorrectMarketingBlockSize(block, size) {
  let error = null;
  let elementSize = null;
  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Property" && node.key.value === "elem" && node.value.value === "fraction") {
        walk(parent, {
          enter: function(n, p, pr) {
            if (n.type === "Property" && isMarketingBlock(n.value.value)) {
              elementSize = getModValueByType(parent, "m-col");
  
              if ((elementSize * 2) > size) {
                error = true;
              }
            }
          }
        })
      }
    }
  }); 

  return error ? false : true;
}

function triggerFn(node, parent, prop) {
  let block = null;

  if (
    node.type === "Property" &&
    node.key.value === "block" &&
    node.value.value === "grid"
  ) {
    walk(parent, {
      enter: function(n, p, pr) {
        if (
          n.type === "Property" &&
          n.key.value === "block" &&
          isMarketingBlock(n.value.value)
        ) {
          block = parent;
        }
      }
    });
  }
  if (block) {
    return block;
  }

  return false;
}

function lintFn(block, сb, commitFn) {
  let error = false;
  let columnsCount = getModValueByType(block, "m-columns");
  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Object" && !isCorrectMarketingBlockSize(node, columnsCount)) {
        error = true;
      }
    }
  }); 

  if(error) {
    сb(block.loc, commitFn);
  }

}

const ruleConfig = {
  code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
  error:
    "Маркетинговые блоки не должны занимать больше половины от все колонок блока grid",
  triggerFn,
  lintFn
};

const rule = new Rule(ruleConfig);

export default rule;
