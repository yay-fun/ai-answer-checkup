const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const html = fs.readFileSync('index.html', 'utf8');
const nodes = new Map();
const all = [];

class El {
  constructor(tag) {
    this.tag = tag;
    this.value = '';
    this.children = [];
    this.dataset = {};
    all.push(this);
  }
  set id(x) {
    if (nodes.has(x)) throw Error('Duplicate element id: ' + x);
    this._id = x;
    nodes.set(x, this);
  }
  get id() {
    return this._id;
  }
  appendChild(x) {
    this.children.push(x);
    return x;
  }
  replaceChildren() {
    this.children = [];
  }
  setAttribute() {}
  removeAttribute() {}
  focus() {}
  addEventListener() {}
  click() {}
  querySelector() {
    return {focus() {}, setAttribute() {}};
  }
}

const fieldIds = ['task', 'answer', 'evidence', 'correction'];
const ids = [
  'task', 'answer', 'evidence', 'correction', 'context', 'review', 'report',
  'report-content', 'checks', 'context-error', 'review-error', 'start-review',
  'make-report', 'clear', 'load-failure', 'load-clean', 'download', 'print'
];
for (const id of ids) {
  const e = new El(fieldIds.includes(id) ? 'textarea' : 'div');
  e.id = id;
}

const document = {
  createElement: tag => new El(tag),
  getElementById: id => nodes.get(id),
  querySelectorAll: s => s === 'textarea' ? all.filter(e => e.tag === 'textarea') : []
};
const ctx = vm.createContext({document, setTimeout, Blob, URL, window: {print() {}}, console});
for (const s of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)) vm.runInContext(s[1], ctx);

const results = [];
for (const [clean, want] of [[false, 'revise'], [true, 'reviewed']]) {
  vm.runInContext(`demo(${clean});renderReport();`, ctx);
  assert(nodes.get('evidence').value.startsWith('Approved fictional notes, 2:00 p.m.:'), 'Demo preserves source notes');
  const actual = vm.runInContext('latest.decision', ctx);
  assert.equal(actual, want);
  assert.equal(nodes.get('evidence-status').value, clean ? 'pass' : 'fail');
  results.push({
    name: clean ? 'supported draft' : 'incomplete answer',
    expected: want,
    actual,
    sourcePreserved: true,
    passed: true
  });
}

fs.writeFileSync('results/demo_regression_results.json', JSON.stringify({
  scope: 'In-memory DOM regression for field identity, demo values, and summary routing. Not a browser layout test.',
  passed: results.length,
  total: results.length,
  results
}, null, 2));
console.log('Both demo regressions passed. Source notes remain separate from evidence judgments.');
