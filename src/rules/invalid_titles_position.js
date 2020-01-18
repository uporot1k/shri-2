import Rule from "../Rule";

import h1_rule from "./several_h1";
import h2_rule from "./invalid_h2_position";
import h3_rule from "./invalid_h3_position";

var walk = require("estree-walker").walk;

import { getModValueByType } from "../utils";

const rules = [h1_rule, h2_rule, h3_rule];

const handlerObj = {
  set(target, index, item) {
    target[index] = item;

    if (index !== "length") {
      target = chechStructure(target);
    }

    return true;
  }
};

let state = new Proxy([], handlerObj);

function chechStructure(arr) {
  const fireEvent = item => {
    item.f({
      code: item.rule.code,
      error: item.rule.errorCode,
      start: {
        line: item.start.line,
        column: item.start.column
      },
      end: {
        line: item.end.line,
        column: item.end.column
      }
    });
  };
  let map = [...arr];

  arr.forEach((item, index) => {
    if (item.titleType === "h1") {
      let idx = map.findIndex(el => el.titleType === "h1");

      if (index !== idx && !item.isEmitted) {
        fireEvent(item);

        map[index].isEmitted = true;
      }
    }
    if (item.titleType === "h2") {
      let idx = map.findIndex(el => el.titleType === "h1");
      if (index < idx && !item.isEmitted) {
        fireEvent(item);

        map[index].isEmitted = true;
      }
    }
    if (item.titleType === "h3") {
      let idx = map.findIndex(el => el.titleType === "h2");
      if (index < idx && !item.isEmitted) {
        fireEvent(item);

        map[index].isEmitted = true;
      }
    }
  });

  return map;
}
function hasTitleTypeH1(target, item) {
  const index = target.findIndex(el => item.type === el.type);
  // debugger
  if (index >= 0) {
    item.f({
      code: item.rule.code,
      error: item.rule.errorCode,
      location: {
        start: {
          line: item.start.line,
          column: item.start.column
        },
        end: {
          line: item.end.line,
          column: item.end.column
        },
      }
    });

    item.isEmitted = true;

    return item;
  }
}

function getInstruction(target, item) {
  const type = getModValueByType(item, "type");

  let instruction = null;

  switch (type) {
    case "h1":
      instruction = () => hasTitleTypeH1(target, item);
      break;
    case "h2":
      instruction = () => isRightPosition(target, item);
      break;
    case "h3":
      instruction = () => isRightPosition(target, item);
      break;

    default:
      false;
  }

  return instruction;
}

function triggerFn(node, parent, prop) {
  const isTitleType = type => {
    return ["h1", "h2", "h3"].includes(type);
  };

  if (!parent) {
    return { node };
  }

  return false;
}

function lintFn({ node, parent, prop }, cb, commitFn) {
  walk(node, {
    enter: function(n, p, pr) {
      if (n.type === "Property" && n.value.value === "text") {
        rules.forEach(rule => {
          const triggeredObj = rule.trigger(n, p, pr);

          if (triggeredObj) {
            rule.checkError(
              triggeredObj,
              callbackFromRule.bind(rule),
              commitFn.bind(rule)
            );
          }

          return true;
        });
      }
    }
  });
}

function callbackFromRule(block, commitFn) {
  const { node, titleType } = block;

  state.push({
    ...node,
    titleType,
    f: commitFn,
    isEmitted: false,
    rule: this
  });
}
const ruleConfig = {
  triggerFn,
  lintFn
};

const rule = new Rule(ruleConfig);

export default rule;
