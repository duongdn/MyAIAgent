#!/bin/bash
# Fetch Precognize (customer) review comments on NUS PRs in Precognize/development, for the Elena OP review checklist.
# Usage: bash scripts/elena-fetch-customer-review-comments.sh [out.jsonl]   (needs gh account "nusken"; ~10 min for ~300 PRs)
set -euo pipefail
OUT=${1:-/tmp/elena-customer-review-comments.jsonl}
export GH_TOKEN=$(gh auth token -h github.com -u nusken)
R=Precognize/development
: > "$OUT"
for n in $(gh api "repos/$R/pulls?state=all&per_page=100" --paginate --jq '.[]|select(.user.login|test("nus"))|.number'); do
  { gh api "repos/$R/pulls/$n/comments?per_page=100" --jq ".[]|select(.user.login|test(\"nus|coderabbit|bot\")|not)|{pr:$n,kind:\"inline\",u:.user.login,d:.created_at[0:10],path:.path,b:.body}"
    gh api "repos/$R/pulls/$n/reviews?per_page=100" --jq ".[]|select(.user.login|test(\"nus|coderabbit|bot\")|not)|select((.body//\"\")!=\"\")|{pr:$n,kind:\"review\",u:.user.login,d:.submitted_at[0:10],b:.body}"
    gh api "repos/$R/issues/$n/comments?per_page=100" --jq ".[]|select(.user.login|test(\"nus|coderabbit|bot\")|not)|{pr:$n,kind:\"comment\",u:.user.login,d:.created_at[0:10],b:.body}"
  } 2>/dev/null | jq -c . >> "$OUT"
done
echo "$(wc -l < "$OUT") comments -> $OUT"
