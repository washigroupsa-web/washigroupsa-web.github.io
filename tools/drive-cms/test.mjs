import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { checkManifest } from './prepare.mjs';

const fixture = JSON.parse(await readFile(new URL('./fixture.test.json', import.meta.url), 'utf8'));
const dry = checkManifest(fixture, { dryRun: true, verifyPages: false });
assert.equal(dry.ready.length, 1, 'one synthetic approved item should reach staging');
assert.equal(dry.skipped.length, 1, 'DRAFT must be excluded');
assert.equal(dry.blocked.length, 1, 'unverified rights must be blocked');
assert.equal(dry.ready[0].content_id, 'TEST-WG-002');
const prod = checkManifest(fixture, { dryRun: false, verifyPages: false });
assert.equal(prod.ready.length, 0, 'test content must never be released');
assert.equal(prod.blocked.length, 2, 'test-only and rights failures must be blocked');
const duplicate = checkManifest({
  project: 'WASHI_GROUP',
  entries: [fixture.entries[0], fixture.entries[0]]
}, { dryRun: true, verifyPages: false });
assert.equal(duplicate.blocked.length, 1, 'a repeated ID-language pair must be blocked');
assert.throws(() => checkManifest({ project: 'OTHER', entries: [] }), /WASHI_GROUP/);
console.log('PASS: DRAFT exclusion, APPROVED gate, rights gate, test-only gate, duplicate gate, project gate');
