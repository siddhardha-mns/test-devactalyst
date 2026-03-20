#!/usr/bin/env node
/**
 * Fails if any tracked source file contains technical placeholders that must
 * be replaced before going to production.
 *
 * Checks:
 *  1. YOUR-PRODUCTION-DOMAIN  — domain placeholder in sitemap/robots
 *  2. Client-side Apps Script URL usage (import.meta.env.VITE_GOOGLE_SCRIPT_URL
 *     referenced in browser code outside of api/)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, extname } from 'path';

import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

// File extensions to scan
const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.html', '.xml', '.txt', '.json']);

// Directories to skip entirely
const SKIP_DIRS = new Set(['node_modules', 'dist', 'build', '.git', '.github']);

// Patterns that must NOT appear in source
const FORBIDDEN = [
  {
    pattern: /YOUR-PRODUCTION-DOMAIN/,
    label: 'Domain placeholder (YOUR-PRODUCTION-DOMAIN)',
    // Only flag in non-script source files — the sitemap/robots are expected
    // to contain it until a build step replaces it, but we still want CI to
    // catch it if it leaks into TS/TSX/JS source.
    includeExts: new Set(['.ts', '.tsx', '.js', '.jsx']),
  },
  {
    // Detect client-side consumption of the Google Script URL.
    // The env var is allowed in api/ (server-side) but not in src/.
    pattern: /import\.meta\.env\.VITE_GOOGLE_SCRIPT_URL/,
    label: 'Client-side Apps Script URL (import.meta.env.VITE_GOOGLE_SCRIPT_URL in src/)',
    includeExts: new Set(['.ts', '.tsx', '.js', '.jsx']),
    // Only flag files under src/
    pathFilter: (rel) => rel.startsWith('src/') || rel.startsWith('src\\'),
  },
];

/** Recursively collect files */
function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (SCAN_EXTS.has(extname(entry))) {
      files.push(full);
    }
  }
  return files;
}

let failures = 0;

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const content = readFileSync(file, 'utf8');

  for (const check of FORBIDDEN) {
    if (!check.includeExts.has(extname(file))) continue;
    if (check.pathFilter && !check.pathFilter(rel)) continue;
    if (check.pattern.test(content)) {
      console.error(`[check-placeholders] FAIL  ${rel}\n  → ${check.label}`);
      failures++;
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} placeholder(s) found. Resolve them before deploying.\n`);
  process.exit(1);
} else {
  console.log('[check-placeholders] OK — no technical placeholders found.');
}
