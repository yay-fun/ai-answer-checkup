const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const source = html.match(/<script id="review-engine">([\s\S]*?)<\/script>/)[1];
const ctx = vm.createContext({});
vm.runInContext(source + ';globalThis.review=buildReview;globalThis.checks=CHECKS;', ctx);
for (const s of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(s[1]);

const base = () => Object.fromEntries(ctx.checks.map(x => [x.id, {status: 'pass', note: 'Supported by source record.'}]));
const cases = [
  ['all applicable pass', () => base(), 'reviewed'],
  ['failure overrides unresolved evidence', () => ({...base(), completion: {status: 'fail', note: 'Missing output'}, evidence: {status: 'unknown', note: ''}}), 'revise'],
  ['unknown claim support', () => ({...base(), evidence: {status: 'unknown', note: ''}}), 'verify'],
  ['blank check', () => ({...base(), constraints: {status: '', note: ''}}), 'incomplete'],
  ['pass without note', () => ({...base(), evidence: {status: 'pass', note: ''}}), 'incomplete'],
  ['fail without note', () => ({...base(), completion: {status: 'fail', note: ' '}}), 'incomplete'],
  ['no correction applicable', () => ({...base(), corrections: {status: 'na', note: 'No correction requested'}}), 'reviewed'],
  ['not applicable without reason', () => ({...base(), corrections: {status: 'na', note: ''}}), 'incomplete'],
  ['all not applicable', () => Object.fromEntries(ctx.checks.map(x => [x.id, {status: 'na', note: 'Outside supplied scope'}])), 'no-scope'],
  ['invalid status', () => ({...base(), evidence: {status: 'sure', note: 'looks good'}}), 'incomplete'],
  ['missing records', () => ({}), 'incomplete'],
  ['correction leaves dependent claim', () => ({...base(), corrections: {status: 'fail', note: 'Shipping promise survives'}}), 'revise']
];
const results = cases.map(([name, fixture, want]) => {
  const got = ctx.review(fixture()).decision;
  assert.equal(got, want, name);
  return {name, expected: want, actual: got, passed: got === want};
});
assert(!/fetch\(|XMLHttpRequest|localStorage|sessionStorage/.test(html), 'No model calls or browser storage');
assert(html.includes('root.replaceChildren()') && html.includes('e.textContent=text'), 'User content rendered as text');
assert(html.includes('@media(max-width:780px)'), 'Responsive stylesheet');
const result = {
  scope: 'Pure decision logic and static source assertions. No browser interaction or external LLM benchmark.',
  passed: results.length,
  total: results.length,
  sourceAssertions: 3,
  results
};
fs.writeFileSync('results/test_results.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
