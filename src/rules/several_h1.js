import Rule from '../Rule';

import { getModValueByType } from "../utils";

function triggerFn(node, parent, prop) {

  if (node.type === "Property" && node.value.value === "text") {
    const textTypeMod = getModValueByType(parent, "type");
    if (textTypeMod === "h1") {

      return { node: parent, titleType: textTypeMod };
    }
  }
  return false;
}

function lintFn(block, cb, commitFn) {
  cb(block, commitFn);
}

const ruleConfig = {
  code: "TEXT.SEVERAL_H1",
  error: "Заголовок первого уровня на странице должен быть единственным",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;