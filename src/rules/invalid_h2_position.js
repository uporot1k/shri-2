import Rule from '../rule-tester/Rule';

function triggerFn() {

  return false;
}

function lintFn() {

}

const ruleConfig = {
  code: "TEXT.INVALID_H2_POSITION",
  error: "Заголовок второго уровня не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;