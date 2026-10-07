# Elena OP — 2026-10-07 09:30 (`prs` only)

## Summary
4 open PRs → nus-base. 🔴 1 (#315 license: helper script grants OP by default + capacity 0 ambiguity, 190 behind, no reviewer) · ⚠️ 3 (#320 open Major from aron, #318 changes requested, #317 no human review).
`openspec validate --strict`: ✅ all 4 pass. No FE build run (CI only builds Java — unverified).

## PRs
| # | OP | author | code | spec | verdict | cross-reviewed? | key findings |
|---|----|--------|------|------|---------|-----------------|--------------|
| [315](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/315) | OP-25 | Brian (BE) | ❌ | 💬 | ❌ | ❌ none (only CodeRabbit) | default OP grant, cap 0 = unlimited vs default, 190 behind |
| [320](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/320) | OP-13 | Ken (FE) | 💬 | 💬 | 💬 | ⚠️ nus-aron (Devin) CHANGES_REQUESTED, unaddressed | touches portal + shared stepper; tag search race once API lands |
| [318](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/318) | OP-20 | ryannus/phongtb (FE) | 💬 | 💬 | 💬 | ⚠️ nus-aron CHANGES_REQUESTED | spec+code mixed commit; no catchError on runs stream |
| [317](https://github.com/nustechnology/Elena-SamGuard-Digital-Plant/pull/317) | OP-15 | ryannus (FE) | 💬 | 💬 | 💬 | ❌ no human review | 6 CodeRabbit Minor unanswered; SAVE allowed with chip error |

Cross-PR: #317/#318/#320 all edit `shared-ui-page.component.*`, `custom-icons-registration.service.ts`, `en-us.json`, and spec `optimization-shared-ui-playground` → conflicts after the first merge; merge order + rebase needed. All 3 FE PRs are 12 commits behind nus-base.

### #315 — License multi-module (BE) — ❌ request changes
Code:
- 🔴 `tools/licensing/generate_string.py:307-310` — `DEFAULT_OP_ENABLED = True`, 10 models, 50 000 credits. The helper prints the command used for **real customer licenses**, so every newly generated license silently includes OP (a paid module). Default should be `False`; enable OP explicitly per contract. Spec scenario "Developer Automation Command Helper" encodes this, so fix the spec too.
- 🔴 `modelCapacity = 0` means both "unlimited" (`-oc` help text, spec "Default unlimited model capacity") and "no entitlement" (default `0` in `OptimizationModuleLicense`, `DaeOptimizationModuleLicense`, and mapper fallback for unlicensed OP). `-mod OPTIMIZATION` without `-oc` → unlimited models. Use `null`/`-1` for unlimited, or make `-oc` mandatory with `-op`.
- ⚠️ `LicenseController.java` `isMonitorLicensed`: `-mod OPTIMIZATION` alone (or `-op` with a request file lacking monitor) yields Monitor unlicensed → root `maxColumnCount = 0`. Re-issuing a license for an existing Monitor customer with only OP flags would **switch off Monitoring**. Add a warning or require explicit `-mo`/`--no-monitor`.
- ⚠️ `LicenseController.java` activeModules loop (`else if (!activeModules.contains(mod)) activeModules.add(mod)`): unknown module names from `-mod` go into the signed license unvalidated. Reject anything not in `DaeLicensedModuleType`.
- 💬 `DaeOptimizationModuleLicense.activeModelCount/usedCredits/remainingCredits` exposed in API status but never populated → always 0. Fine if OP-103 fills them; state in the spec that they are placeholders.
- 💬 `DaeLicenseMapper.normalizeModulesAndActiveModules` builds the OP default object twice (DRY).
- ✅ Signature covers the whole payload (`SHA1WithRSA` on licenseData) → new fields are tamper-proof. Legacy flat license → monitor licensed, OP off: back-compat OK. Unit tests added.
- ⚠️ 190 commits behind nus-base → merge nus-base and re-test before review is final.
Spec:
- 💬 proposal/design contain absolute local paths and `file:///home/nus/Documents/Java_Elena/...` links (dev machine). Broken for everyone else; use repo-relative paths.
- 💬 Two changes archived inside an unmerged PR (`2026-10-02-update-generate-license…`, `2026-10-05-align-monitor-license-fields…`). Archive after merge, otherwise `specs/` claims behaviour nus-base doesn't have.
- 💬 Nested capability `specs/license/<sub>/spec.md` passes validate but breaks the one-folder-per-capability convention; prefer `license-generate-multi-module`, `license-deserialize-validate`.
- 💬 Missing error scenarios: invalid signature, expired license, `-oc` negative/non-numeric (`Integer.parseInt` throws raw NumberFormatException), unknown module.
- 💬 Contract impact: `DaeApiLicenseStatus` gains `activeModules` + `modules`. FE (Sam Ha integrating) should reference this capability. No "Related changes" to the FE license panel (OP-9).

### #320 — OP-13 Model wizard Step 1 (FE) — 💬
- ⚠️ aron's review (Devin) on the current head `a409e6b0`: 1 Major (verification tasks 2.1/6.3 open) + Minor (tag picker focus ring removed, not recorded in D11). **No commit since** → not addressed.
- ⚠️ Scope beyond OP: moves `empty-state` to `projects/shared` and edits 5 `precognize-portal` alert components + shared `number-stepper` (+171 lines). The legacy portal is affected; need `npm run build-portal` + a visual check of alert tabs. Delivery to Precognize will carry portal changes, so tell the customer.
- 💬 `optimization-goal-step.component.ts:142` `onQueryChange` subscribes per keystroke with `take(1)`. OK only while the mock is synchronous (comment says so). When the OP-22 API lands, older responses overwrite newer ones → switch to a `Subject` + `switchMap`. Add a TODO linking OP-22.
- Spec: 💬 the change is not archived yet (correct for an unmerged PR). The proposal says the trend panel has a playground preview but the spec/code don't (aron noted). Validation messages are fully specified ✅.

### #318 — OP-20 Runs header + scoped search (FE) — 💬
- ⚠️ aron CHANGES_REQUESTED: commit `7197db5` mixes spec + code (team convention: separate `spec:` and `feat/fix:` commits, so delivery and review stay clean). Not addressed yet.
- 💬 `optimization-runs-page.component.ts` `query$.pipe(switchMap(getRuns))` has no `catchError`. Harmless with sample data. Once the real API exists, one failed request kills the stream and the page stops reacting to search/filter/sort.
- 💬 `optimization-runs.search-in.ts` `isRunSearchIn` uses `value in RUN_SEARCH_IN_LABELS` → `'toString'` passes. Use `Object.hasOwn`.
- ✅ Scoped-search component is solid (overlay cleanup, keyboard nav, debounce, de-dup of unchanged text).
- Spec: ✅ good structure, explicit "Sample data until a backend exists" requirement + Related changes. 💬 archived before merge (same lifecycle note as #315). 💬 Search semantics (All = run/model/tag/influencer/operating-condition names + descriptions) become a **BE contract** later and must be specified in the backend root, not here. Open the BE counterpart change now so tiennd2's tag search matches.

### #317 — OP-15 Manage Influencer dialog (FE) — 💬
- ❌ No human reviewer. Only the author's own "record review outcome" commit + CodeRabbit. Needs a FE cross-review (trinm or samht).
- 6 CodeRabbit Minor threads, 0 replies. Verified: non-finite chip value is **fixed** (`addChip` checks `Number.isFinite`). Still valid: `canSave` (`manage-influencer-dialog.component.ts:130`) ignores `chipError` → SAVE enabled while a Fixed Values error is shown. Others (a11y aria link, contrast, narrow drawer) are small. Reply or resolve each.
- 💬 Refactors `filter-panel` onto the new `side-drawer` (−195 lines) → regression check on the Runs page filters (also touched by #318).
- Spec: ✅ structure. 💬 proposal has no "Related changes". Influencer limits (range/fixed values) must eventually be persisted by a BE capability; flag the dependency. 💬 archived before merge.

## Room / Env / Jira
Not run (`prs` only). Jira not configured.

## Unresolved questions
- Is nus-aron (Devin review skill) the official reviewer, or should DuongDN's review be the gate? Who resolves conflicts between them?
- Merge order for the 3 FE PRs (shared files overlap). Proposal: #317 → #318 → #320.
- Team convention: archive OpenSpec change before or after merge? Currently done before.
- OP capacity semantics (0 = unlimited?) must be confirmed with the customer via vytth.
