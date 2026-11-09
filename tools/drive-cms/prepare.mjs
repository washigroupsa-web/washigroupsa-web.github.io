import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createSign } from 'node:crypto';

const RIGHTS_OK = new Set(['OWNED', 'LICENSED', 'PERMISSION_GRANTED']);
const STATES = new Set(['DRAFT', 'IN REVIEW', 'APPROVED', 'PUBLISHED', 'FAILED', 'ARCHIVED']);
const LANGUAGES = new Set(['ar', 'en']);

export function checkManifest(manifest, { dryRun = true, verifyPages = true } = {}) {
  if (!manifest || manifest.project !== 'WASHI_GROUP' || !Array.isArray(manifest.entries)) {
    throw new Error('Manifest must contain project=WASHI_GROUP and an entries array.');
  }
  const result = { ready: [], skipped: [], blocked: [] };
  const seen = new Set();
  for (const entry of manifest.entries) {
    const id = String(entry.content_id || '');
    const lang = String(entry.language || '');
    const key = id + ':' + lang;
    const problems = [];
    if (!/^[A-Z0-9][A-Z0-9_-]{2,64}$/.test(id)) problems.push('invalid Content ID');
    if (!LANGUAGES.has(lang)) problems.push('unsupported language');
    if (!/^[a-z0-9][a-z0-9-]*[.]html$/.test(entry.page || '')) problems.push('unsafe or invalid page path');
    if (verifyPages && !existsSync(entry.page || '')) problems.push('target page not in repository');
    if (!STATES.has(entry.status)) problems.push('invalid content status');
    if (!Number.isInteger(entry.version) || entry.version < 1) problems.push('invalid version');
    if (seen.has(key)) problems.push('duplicate ID and language');
    seen.add(key);
    if (problems.length) {
      result.blocked.push({ key, reason: problems.join('; ') });
      continue;
    }
    if (entry.status !== 'APPROVED') {
      result.skipped.push({ key, status: entry.status });
      continue;
    }
    if (!RIGHTS_OK.has(entry.rights_status)) problems.push('rights not approved');
    if (!entry.title || !String(entry.title).trim()) problems.push('missing title');
    if (!(typeof entry.body === 'string' && entry.body.trim()) && !entry.google_doc_id) {
      problems.push('missing content body or Google Doc ID');
    }
    if (entry.test_only && !dryRun) problems.push('test content cannot be published');
    if (problems.length) result.blocked.push({ key, reason: problems.join('; ') });
    else result.ready.push(entry);
  }
  return result;
}

function b64url(value) { return Buffer.from(value).toString('base64url'); }

async function tokenForServiceAccount(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/documents.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600
  }));
  const data = header + '.' + claims;
  const signature = createSign('RSA-SHA256').update(data).sign(credentials.private_key, 'base64url');
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: data + '.' + signature })
  });
  if (!response.ok) throw new Error('Google service-account authentication failed (credentials are never logged).');
  return (await response.json()).access_token;
}

async function googleGet(url, bearer) {
  const response = await fetch(url, { headers: { Authorization: 'Bearer ' + bearer } });
  if (!response.ok) throw new Error('Google API read failed: HTTP ' + response.status);
  return response.json();
}
function getDocText(doc) {
  const chunks = [];
  const visit = (nodes) => {
    for (const node of (nodes || [])) {
      for (const part of (node.paragraph?.elements || [])) {
        if (part.textRun?.content) chunks.push(part.textRun.content);
      }
      if (node.table?.tableRows) for (const row of node.table.tableRows) {
        for (const cell of row.tableCells || []) visit(cell.content);
      }
    }
  };
  if (doc.tabs?.length) {
    for (const tab of doc.tabs) visit(tab.documentTab?.body?.content);
  } else visit(doc.body?.content);
  return chunks.join('').trim();
}
async function loadGoogleManifest() {
  const rawCredentials = process.env.GDRIVE_SERVICE_ACCOUNT_JSON;
  const manifestId = process.env.GDRIVE_CONTENT_MANIFEST_ID;
  if (!rawCredentials || !manifestId) {
    throw new Error('Drive sync is NOT configured. Required: GDRIVE_SERVICE_ACCOUNT_JSON and GDRIVE_CONTENT_MANIFEST_ID.');
  }
  const credentials = JSON.parse(rawCredentials);
  const token = await tokenForServiceAccount(credentials);
  const file = await googleGet('https://www.googleapis.com/drive/v3/files/' + encodeURIComponent(manifestId) + '?alt=media', token);
  return { manifest: file, token };
}

export async function prepare(manifest, { dryRun = true, token = null } = {}) {
  const report = checkManifest(manifest, { dryRun });
  if (report.blocked.length) return { report, output: [] };
  const output = [];
  for (const entry of report.ready) {
    let body = (entry.body || '').trim();
    if (entry.google_doc_id) {
      if (!token) {
        if (!dryRun) throw new Error('Google Docs token unavailable for approved content.');
      } else {
        const doc = await googleGet('https://docs.googleapis.com/v1/documents/' + encodeURIComponent(entry.google_doc_id) + '?includeTabsContent=true', token);
        body = getDocText(doc);
      }
    }
    if (!body) { report.blocked.push({ key: entry.content_id + ':' + entry.language, reason: 'empty approved document' }); continue; }
    output.push({ content_id: entry.content_id, page: entry.page, language: entry.language,
      title: entry.title, body, version: entry.version, source_doc_id: entry.google_doc_id || null });
  }
  return { report, output };
}

if (process.argv[1] && import.meta.url === new URL('file://' + process.argv[1]).href) {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--publish-preview');
  try {
    let manifest, token = null;
    const ix = args.indexOf('--fixture');
    if (ix >= 0) manifest = JSON.parse(await readFile(args[ix + 1], 'utf8'));
    else ({ manifest, token } = await loadGoogleManifest());
    const { report, output } = await prepare(manifest, { dryRun, token });
    // Output is for PR review in a staging branch, NOT a live-site update.
    if (args.includes('--export-preview') && !report.blocked.length) {
      await mkdir('.cms-staging', { recursive: true });
      await writeFile('.cms-staging/approved-content.json', JSON.stringify(output, null, 2) + String.fromCharCode(10));
    }
    console.log(JSON.stringify({ mode: dryRun ? 'DRY_RUN' : 'STAGING_ONLY',
      ready: report.ready.map(x => x.content_id + ':' + x.language),
      skipped: report.skipped, blocked: report.blocked,
      output_count: output.length, live_site_modified: false }, null, 2));
    if (report.blocked.length) process.exitCode = 1;
  } catch (error) {
    console.error('STAGING_FAILED:', error.message);
    process.exitCode = 1;
  }
}
