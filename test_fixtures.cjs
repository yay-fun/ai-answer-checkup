const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const code = html.match(/<script id="review-engine">([\s\S]*?)<\/script>/)[1];
const ctx = vm.createContext({});
vm.runInContext(code + ';globalThis.review=buildReview;', ctx);

const cases = JSON.parse(fs.readFileSync('fixtures/AI_Enablement_Evaluation_Cases.json', 'utf8'));
const results = cases.map(c => {
  const actual = ctx.review(c.ratings).decision;
  assert.equal(actual, c.expected, c.id);
  return {id: c.id, expected: c.expected, actual, passed: true};
});

const result = {
  scope: 'Routing of predefined reference judgments. Not live-model performance.',
  passed: results.length,
  total: results.length,
  results
};
fs.writeFileSync('results/fixture_routing_results.json', JSON.stringify(result, null, 2));
console.log('8 of 8 predefined fixture-rating sets matched expected routing.');
