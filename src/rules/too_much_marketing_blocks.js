import Rule from '../rule-tester/Rule';

function triggerFn() {

  return false;
}

function lintFn() {

}

const ruleConfig = {
  code: "GRID.TOO_MUCH_MARKETING_BLOCKS",
  error: "Маркетинговые блоки не должны занимать больше половины от все колонок блока grid",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;