#!/usr/bin/env node
// Verify which custom element tags a built card file registers.
//
// The 2.0.0 -> 2.3.7 bug was two files both claiming `ares-energy-flow-card-dev`.
// Home Assistant loads every resource on every page, so the first file to claim a
// tag keeps it and the other one registers nothing. That is invisible in the UI,
// which is why this check exists: it loads the file in a stub DOM and reports
// exactly what it registered.
//
// Usage:
//   node scripts/check-tags.mjs <file.js> --expect prod
//   node scripts/check-tags.mjs <file.js> --expect dev
//
// Exit code 0 when the file registers exactly the expected tags, 1 otherwise.

import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const EXPECTED = {
  prod: [
    'ares-energy-flow-card',
    'ha-energy-flow-card',
    'ares-energy-flow-card-editor',
    'ha-energy-flow-card-editor'
  ],
  dev: [
    'ares-energy-flow-card-dev',
    'ares-energy-flow-card-dev-editor'
  ]
};

const argv = process.argv.slice(2);
const file = argv.find(a => !a.startsWith('--'));
const expectIdx = argv.indexOf('--expect');
const expect = expectIdx >= 0 ? argv[expectIdx + 1] : null;

if (!file || !expect || !EXPECTED[expect]) {
  console.error('usage: node scripts/check-tags.mjs <file.js> --expect prod|dev');
  process.exit(2);
}

const registered = new Map();
const errors = [];

const noop = () => {};
const fakeElement = () => ({
  style: { setProperty: noop },
  appendChild: noop,
  addEventListener: noop,
  setAttribute: noop,
  getAttribute: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  attachShadow: () => ({
    appendChild: noop,
    addEventListener: noop,
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    innerHTML: ''
  })
});

const sandbox = {
  console: { log: noop, warn: noop, error: noop, info: noop, debug: noop },
  customElements: {
    get: tag => registered.get(tag),
    define: (tag, cls) => registered.set(tag, cls),
    whenDefined: () => Promise.resolve()
  },
  HTMLElement: class HTMLElement {},
  document: {
    createElement: fakeElement,
    createTextNode: fakeElement,
    addEventListener: noop,
    removeEventListener: noop,
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    documentElement: { style: { setProperty: noop } },
    body: { appendChild: noop }
  },
  navigator: { userAgent: 'node' },
  location: { href: 'http://localhost/', search: '' },
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  queueMicrotask,
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: noop,
  performance,
  matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }),
  getComputedStyle: () => ({ getPropertyValue: () => '' }),
  ResizeObserver: class { observe() {} unobserve() {} disconnect() {} },
  MutationObserver: class { observe() {} disconnect() {} },
  CustomEvent: class CustomEvent { constructor(type, init) { this.type = type; Object.assign(this, init); } },
  localStorage: { getItem: () => null, setItem: noop, removeItem: noop }
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.self = sandbox;

let source;
try {
  source = readFileSync(file, 'utf8');
} catch (e) {
  console.error(`cannot read ${file}: ${e.message}`);
  process.exit(2);
}

const context = vm.createContext(sandbox);
try {
  vm.runInContext(source, context, { filename: file, timeout: 10000 });
} catch (e) {
  console.error(`FAIL ${file}: threw while loading`);
  console.error(`  ${e.message}`);
  process.exit(1);
}

const got = [...registered.keys()].sort();
const want = [...EXPECTED[expect]].sort();
const missing = want.filter(t => !got.includes(t));
const extra = got.filter(t => !want.includes(t));
const buildMarker = registered.get(want[0])?.BUILD ?? null;

if (missing.length) errors.push(`missing tag(s): ${missing.join(', ')}`);
if (extra.length) errors.push(`unexpected tag(s): ${extra.join(', ')} (this is the 2.0.0-2.3.7 tag collision)`);
if (buildMarker !== expect) errors.push(`BUILD marker is ${JSON.stringify(buildMarker)}, expected "${expect}"`);

const report = {
  file,
  expect,
  registered: got,
  buildMarker,
  ok: errors.length === 0
};

if (errors.length) {
  console.error(`FAIL ${JSON.stringify(report, null, 2)}`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`OK   ${file} registers ${got.length} tag(s) as ${expect}: ${got.join(', ')}`);
