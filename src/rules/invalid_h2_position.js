import Rule from '../Rule';

import { getModValueByType } from "../utils";

function triggerFn(node, parent, prop) {

  if (node.type === "Property" && node.value.value === "text") {
    const textTypeMod = getModValueByType(parent, "type");
    if (textTypeMod === "h2") {

      return { node: parent, titleType: textTypeMod };
    }
  }
  return false;
}

function lintFn(block, cb, commitFn) {
  cb(block, commitFn);
}
const ruleConfig = {
  code: "TEXT.INVALID_H2_POSITION",
  error: "Заголовок второго уровня не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;