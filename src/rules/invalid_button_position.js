import Rule from '../rule-tester/Rule';

function triggerFn() {

}

function lintFn() {

}

const ruleConfig = {
  code: "WARNING.INVALID_BUTTON_POSITION",
  error: "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;