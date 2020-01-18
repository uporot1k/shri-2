import Rule from '../Rule';

var walk = require("estree-walker").walk;

import { getModValueByType } from "../utils";

function triggerFn(node, parent, prop) {
  let obj = {
    parent: null,
    textBlock: null,
    buttons: []
  };
  if (node.type === "Property") {
    if (node.key.value === "block" && node.value.value === "warning") {
      obj.parent = parent;

      walk(parent, {
        enter: function(n, p, pr) {
          if (
            n.type === "Property" &&
            n.key.value === "block" &&
            n.value.value === "button"
          ) {
            obj.buttons.push(p);
          }
          if (
            n.type === "Property" &&
            n.key.value === "block" &&
            n.value.value === "text"
          ) {
            if (!obj.textBlock) {
              obj.textBlock = p;
            }
          }
        }
      });
    }
  }

  if (obj.textBlock) {
    return obj;
  }

  return false;
}

function lintFn(obj, cb, commitFn) {
  const { parent, textBlock, buttons } = obj;

  const getSizeReference = block => {
    let size = null;

    if (!size) {
      size = getModValueByType(block, "size");
    }

    return size;
  };

  let error = [];
  const SizesMap = ["s", "m", "l", "xl", "xxl"];

  const sizeReference = getSizeReference(textBlock);
  buttons.forEach(el => {
    walk(el, {
      enter: function(node, parent, prop) {
        if (node.type === "Property" && node.value.value === "button") {
          if (error.length == 0) {
            let nodeModValue = getModValueByType(parent, "size");
            let sizeIndex = SizesMap.findIndex(size => size === nodeModValue);
            let sizeReferenceIndex = SizesMap.findIndex(
              size => size === sizeReference
            );

            if (sizeIndex - 1 !== sizeReferenceIndex) {
              cb(node.loc, commitFn);
            }
          }
        }
      }
    });
  });
}

const ruleConfig = {
  code: "WARNING.INVALID_BUTTON_SIZE",
  error: "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
  triggerFn,
  lintFn
};

const rule = new Rule(ruleConfig);

export default rule;
