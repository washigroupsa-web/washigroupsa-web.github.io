# WASHI GROUP — Drive CMS staging (not yet connected to production)

## Status on 2026-11-09
This directory is an **isolated pilot**. It was created only on the
`feature/drive-cms-staging-2026-11-09` branch. It does not change published
HTML or the `main` branch, and there is no automated deployment to GitHub Pages.

The source site contains bilingual Arabic/English values in shared HTML files.
Keeping separate Google Drive content folders does **not** automatically create
independent public language URLs. A one-time, reviewed frontend integration is
required before Drive edits can affect the live site.

## Review-only workflow
1. Prepare a `content-index.json` manifest stored as a **raw JSON file** in the
   intended Google Drive editorial folder. Each entry has a stable Content ID,
   HTML filename, language, status, rights status, title, version, and either
   body or a Google Docs document ID. Each language is an independent record.
2. An authorized read-only Google service account may fetch that manifest and
   Google Docs after the Drive folder is specifically shared with it.
3. Only APPROVED entries with allowed rights reach the staging output.
   DRAFT, IN REVIEW, PUBLISHED, FAILED and ARCHIVED entries are not re-exported.
   Invalid or conflicting entries block the proposed batch. Test content cannot
   be released.
4. A reviewer must explicitly approve the one-time frontend integration,
   publication policy, and required credentials before ANY live deployment.

## Usage: safe dry-run (no credentials)
```sh
node tools/drive-cms/test.mjs
node tools/drive-cms/prepare.mjs --fixture tools/drive-cms/fixture.test.json
```
The test fixture deliberately includes synthetic content, a DRAFT, and an
APPROVED item with UNKNOWN rights. The command refuses the incomplete batch.

## Google API dry-run (NOT configured)
Store service account credentials in GitHub Actions Secret
`GDRIVE_SERVICE_ACCOUNT_JSON`. Store the id of the reviewed *raw JSON* manifest
in `GDRIVE_CONTENT_MANIFEST_ID` as a variable. The credentials must not be
placed in source, Google Docs, action logs or a public repository.
The Drive folder must be shared to the service account explicitly.

The following would only validate and prepare a private staging preview:
```sh
node tools/drive-cms/prepare.mjs --export-preview
```
The script contains no GitHub writeback and no live-site publication step.
A later, separately approved phase must add the site renderer, PR-based checks,
rollback, safe backup to Drive, and an hourly schedule.

## Safety
- Never treat presence in Drive as approval.
- APPROVED requires licensed/owned material; UNKNOWN or RESTRICTED are blocked.
- Do not publish public URLs for private Drive documents.
- GitHub Pages remains managed from `main`; this branch is for testing only.
- Never remove or overwrite earlier Drive release files.
