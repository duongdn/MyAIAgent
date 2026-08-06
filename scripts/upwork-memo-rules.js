#!/usr/bin/env node
/**
 * Upwork memo validation rubric — pure functions, no I/O.
 *
 * Upwork's Hourly Payment Protection requires work memos that let a reviewer
 * identify: (1) the specific task performed, (2) the feature/page/design element,
 * (3) the action taken during the time segment, (4) how it relates to contracted work.
 *
 * There is no numeric activity metric — a memo must be descriptive enough for a
 * reviewer to verify the work. A memo naming only a feature ("Booking Flow – BXR
 * Member Classes") is INVALID: it doesn't say whether the person researched,
 * wireframed, revised, built, or addressed feedback.
 *
 * Usage (module):
 *   const { classifyMemo } = require('./upwork-memo-rules.js');
 *   classifyMemo("Redesigned the class-selection screen");
 *
 * Usage (CLI, one memo per arg):
 *   node scripts/upwork-memo-rules.js "Booking Flow – BXR Member Classes"
 */
'use strict';

// Action verbs that indicate a concrete action was taken in the segment.
// Covers researching, designing, building, fixing, testing, coordinating, etc.
const ACTION_VERBS = [
  'researched', 'researching', 'research',
  'created', 'creating', 'create',
  'designed', 'designing', 'design',
  'redesigned', 'redesigning', 'redesign',
  'wireframed', 'wireframing', 'wireframe',
  'built', 'building', 'build', 'implemented', 'implementing', 'implement',
  'developed', 'developing', 'develop',
  'updated', 'updating', 'update',
  'revised', 'revising', 'revise',
  'fixed', 'fixing', 'fix',
  'tested', 'testing', 'test', 'qa\'d', 'qa',
  'addressed', 'addressing', 'address',
  'configured', 'configuring', 'configure',
  'migrated', 'migrating', 'migrate',
  'reviewed', 'reviewing', 'review',
  'debugged', 'debugging', 'debug',
  'refactored', 'refactoring', 'refactor',
  'optimized', 'optimizing', 'optimize',
  'integrated', 'integrating', 'integrate',
  'investigated', 'investigating', 'investigate',
  'analyzed', 'analyzing', 'analyze',
  'wrote', 'writing', 'write', 'documented', 'documenting', 'document',
  'deployed', 'deploying', 'deploy',
  'verified', 'verifying', 'verify',
  'validated', 'validating', 'validate',
  'adjusted', 'adjusting', 'adjust',
  'removed', 'removing', 'remove',
  'added', 'adding', 'add',
  'fixed', 'resolved', 'resolving', 'resolve',
  'helped', 'helping', 'helped with',
  'supported', 'supporting', 'support',
  'prepared', 'preparing', 'prepare',
  'completed', 'completing', 'complete',
];

// Words/phrases that often make a memo too vague to verify — a reviewer can't tell
// what was done. Presence of these strongly suggests INVALID.
const VAGUE_PATTERNS = [
  /\bwork(ed|ing)?\s*(on)?\b/i,
  /\bbug\s*fix(es|ing)?\b/i,          // "bug fix" alone
  /\bdesign\s*work\b/i,
  /\bclient\s*work\b/i,
  /\bproject\s*work\b/i,
  /\btask\s*done\b/i,
  /\bdone\b/i,                        // just "done"
  /^[^a-z0-9]*$/i,                    // no alphanumerics at all
  /^(n\/?a|na|none|nothing|no\s*work)$/i,
];

// Feature-only marker: the whole memo looks like a bare label ("Booking Flow – X")
// — a feature/section with a separator, no action verb. Detected as: contains a
// noun-phrase separator (dash/colon/slash) but no action verb → feature-only.
const FEATURE_SEPARATOR = /[-–—:•|/]/;

function hasActionVerb(memo) {
  const lower = ` ${memo.toLowerCase()} `;
  return ACTION_VERBS.some((v) => {
    // Match whole-word-ish: verb at word boundary; some are prefixes so use
    // loose containment but avoid matching inside other words (e.g. "fix" in "fixture").
    return new RegExp(`\\b${v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(lower);
  });
}

function hasVagueMarker(memo) {
  return VAGUE_PATTERNS.some((re) => re.test(memo.trim()));
}

function isFeatureOnly(memo) {
  // Feature-only = a label with separator(s) but no action verb, e.g.
  // "Booking Flow – BXR Member Classes". Also a bare multi-word label with no verb.
  const trimmed = memo.trim();
  if (hasActionVerb(trimmed)) return false;
  if (trimmed.length < 2) return true;
  // Separator present + no verb → almost certainly a bare label
  if (FEATURE_SEPARATOR.test(trimmed)) return true;
  // Short-ish and no verb: treat as too vague. A real memo without an action verb
  // is rare and usually a label; be strict.
  if (trimmed.split(/\s+/).length <= 4) return true;
  return false;
}

/**
 * Classify a single Upwork work memo.
 * @param {string} memo - raw memo text
 * @returns {{valid: boolean, issues: string[], satisfied: string[]}}
 */
function classifyMemo(memo) {
  const text = (memo || '').toString().trim();
  const issues = [];
  const satisfied = [];

  if (!text) {
    return { valid: false, issues: ['empty memo'], satisfied: [] };
  }

  if (hasActionVerb(text)) {
    satisfied.push('action');
  } else {
    issues.push('no action verb — does not state what was done');
  }

  if (isFeatureOnly(text)) {
    issues.push('feature-only / too vague — names a section but not the work done');
  }

  if (hasVagueMarker(text) && !hasActionVerb(text)) {
    issues.push('vague or placeholder wording');
  }

  // Object specificity: enough meaningful words to identify what was worked on.
  const meaningful = text.split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
  if (meaningful >= 3) {
    satisfied.push('object');
  } else {
    issues.push('too few details to identify the object worked on');
  }

  // Context: references a feature/page/flow/contract area beyond a bare label.
  const contextWords = /\b(screen|page|flow|flow|component|module|endpoint|api|feature|section|booking|checkout|class|payment|cart|auth|login|signup|report|dashboard|admin|config|form|list|table|search|upload|import|export|sync|test|staging|prod|production|deploy|release)\b/i;
  if (contextWords.test(text)) {
    satisfied.push('context');
  } else if (text.split(/\s+/).length >= 5) {
    satisfied.push('context'); // long enough that the object implies context
  }

  const valid = issues.length === 0;
  return { valid, issues, satisfied };
}

// CLI mode: node scripts/upwork-memo-rules.js "memo1" "memo2" ...
if (require.main === module) {
  const memos = process.argv.slice(2);
  if (!memos.length) {
    console.log('Usage: node scripts/upwork-memo-rules.js "<memo>" ["<memo2>" ...]');
    process.exit(1);
  }
  for (const m of memos) {
    const r = classifyMemo(m);
    console.log(JSON.stringify({ memo: m, ...r }));
  }
}

module.exports = { classifyMemo, hasActionVerb, isFeatureOnly };
