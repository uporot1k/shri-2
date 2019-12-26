import Rule from '../rule-tester/Rule';

function triggerFn() {

}

function lintFn() {

}

const ruleConfig = {
  code: "TEXT.INVALID_H3_POSITION",
  error: "Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;