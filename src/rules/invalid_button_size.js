import Rule from '../rule-tester/Rule';
var walk = require( 'estree-walker' ).walk;
import { getContentBlock } from '../utils';
import { getModValueByType } from '../utils';

function triggerFn(node, parent, prop) {
  if (!node.children) {
    if ((node.key.value === "block" && node.value.value === "warning")) {
      const { children } = parent;
      const contentBlock = getContentBlock(children);
      const contentBlockChildren = contentBlock.children;
      const textBlockIndex = contentBlockChildren.findIndex((child) => child.children[0].value.value === 'button');

      if (textBlockIndex >= 0) {
        return parent;
      }
    }
  }
  
  return false;
}

function lintFn(block, parent) {
  const getSizeReference = (block) => {
    let size = null;

    walk(block, {
      enter: function(node, parent, prop) {
        if (node.type === "Property" && node.value.value === "text") {
          if (!size) {
            size = getModValueByType(parent, "size");
          }
        }
      }
    })

    return size;
  }
  let error = null;
  const SizesMap = ['s', 'm', 'l', 'xl', 'xxl'];

  const sizeReference = getSizeReference(block);

 
  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Property" && node.value.value === "button") {
        if (!error) {
          let nodeModValue = getModValueByType(parent, "size");
          let sizeIndex = SizesMap.findIndex(size => size === nodeModValue);
          let sizeReferenceIndex = SizesMap.findIndex(size => size === sizeReference);
  
          if ((sizeIndex - 1) !== sizeReferenceIndex) {
            error = true;
          }
        }
      }
    }
  })

  if (error) {
    return block.loc;
  }

  return false
}

const ruleConfig = {
  code: "WARNING.INVALID_BUTTON_SIZE",
  error: "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;