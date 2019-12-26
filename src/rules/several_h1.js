import Rule from '../rule-tester/Rule';

function triggerFn() {

}

function lintFn() {

}

const ruleConfig = {
  code: "TEXT.SEVERAL_H1",
  error: "Заголовок первого уровня на странице должен быть единственным",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;