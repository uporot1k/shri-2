import Rule from '../rule-tester/Rule';

function triggerFn() {

}

function lintFn() {

}

const ruleConfig = {
  code: "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
  error: "Все текста должны быть эталонного размера",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;