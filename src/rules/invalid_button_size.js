import Rule from '../rule-tester/Rule';

function triggerFn() {

}

function lintFn() {

}

const ruleConfig = {
  code: "WARNING.INVALID_BUTTON_SIZE",
  error: "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
  triggerFn,
  lintFn
}

const rule = new Rule(ruleConfig);

export default rule;