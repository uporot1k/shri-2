import lint from '../src/linter';
const testJSON = require('../examples/test.json');

const report = lint(JSON.stringify(testJSON));

console.log(report);