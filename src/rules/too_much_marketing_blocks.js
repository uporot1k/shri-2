import Rule from "../Rule";

var walk = require("estree-walker").walk;

import { getModValueByType } from "../utils";

function isMarketingBlock(name) {
  const marketingBlockArr = ["offer", "commercial"];

  return marketingBlockArr.includes(name);
}

function triggerFn(node, parent, prop) {
  let block = null;

  if (
    node.type === "Property" &&
    node.key.value === "block" &&
    node.value.value === "grid" &&
    parent.children[1].value.value !== "fraction"
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
  let elementSize = null;
  let marketingBlock = null;

  walk(block, {
    enter: function(node, parent, prop) {
      if (
        node.type === "Property" &&
        node.key.value === "elem" &&
        node.value.value === "fraction"
      ) {
        walk(parent, {
          enter: function(n, p, pr) {
            if (n.type === "Property" && isMarketingBlock(n.value.value)) {
              if (!marketingBlock) {
                elementSize = getModValueByType(parent, "m-col");
                marketingBlock = p;

                if (elementSize * 2 > columnsCount) {
                  error = true;
                }
              } else {
                error = true;
              }
            }
          }
        });
      }
    }
  });

  if (error) {
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
