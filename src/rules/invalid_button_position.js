import Rule from '../rule-tester/Rule';

function triggerFn(node, parent, prop) {
  // if (!node.children) {
  //   if ((node.key.value === "block" && node.value.value === "warning")) {
  //     const { children } = parent;
  //     const contentBlock = getContentBlock(children);
  //     const contentBlockChildren = contentBlock.children;
  //     const textBlockIndex = contentBlockChildren.findIndex((child) => child.children[0].value.value === 'placeholder');

  //     if (textBlockIndex >= 0) {
  //       return parent;
  //     }
  //   }
  // }
  
  return false;
}

function lintFn(block, parent) {
  let hasPlaceholder = false;

   
  // walk(block, {
  //   enter: function(node, parent, prop) {
  //     if (node.type === "Property" && node.value.value === "placeholder") {
  //       hasPlaceholder = true;
  //     }
  //     if (node.type === "Property" && node.value.value === "button") {
  //       if (!error) {
  //         let nodeModValue = getModValueByType(parent, "size");
  //         let sizeIndex = SizesMap.findIndex(size => size === nodeModValue);
  //         let sizeReferenceIndex = SizesMap.findIndex(size => size === sizeReference);
  
  //         if ((sizeIndex - 1) !== sizeReferenceIndex) {
  //           error = true;
  //         }
  //       }
  //     }
  //   }
  // })
}

const ruleConfig = {
  code: "WARNING.INVALID_BUTTON_POSITION",
  error: "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;