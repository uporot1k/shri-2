import Rule from "../Rule";

var walk = require("estree-walker").walk;


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
          n.value.value === "placeholder" &&
          !triggObj
        ) {
          triggObj = true;
        }
      }
    });
    
  }
  if (triggObj) {
    return parent;
  }
  return false;
}

function lintFn(block, cb, commitFn) {
  let placeholderIsFirst = false;
  let map = [];

  walk(block, {
    enter: function(node, parent, prop) {
      if (node.type === "Property" && node.value.value === "placeholder") {
        map.push({
          node: parent,
          type: "placeholder",
        })
      }
      if (node.type === "Property" && node.value.value === "button") {
        map.push({
          node: parent,
          type: "button",
          f: (loc) => cb(loc, commitFn),
        })
      }
    }
  });

  map.reverse().forEach((el, index, arr) => {
    if (el.type === "button") {
      let idx = arr.findIndex((e, idx) => e.type === "placeholder");
      if (idx < index) {
        el.f(el.node.loc);
      }
    }
  })
  
}

const ruleConfig = {
  code: "WARNING.INVALID_BUTTON_POSITION",
  error:
    "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
  triggerFn,
  lintFn
};

const rule = new Rule(ruleConfig);

export default rule;
