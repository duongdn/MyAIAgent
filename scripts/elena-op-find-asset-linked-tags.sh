#!/bin/bash
# Find tags on the Elena OP test env that are linked to an asset (usable as Target/Influencer in the model wizard).
# Usage: bash scripts/elena-op-find-asset-linked-tags.sh [query ...]   (each query >= 3 chars; default: a broad set)
# Needs config/.elena-op-test-accounts.json (System account first). Output: one JSON line per tag, grouped hints at the end.
set -euo pipefail
cd "$(dirname "$0")/.."
B=https://active-alerts.nusdev.net/vp_server/dae/rest
TMP=$(mktemp -d); CJ=$TMP/cj; trap 'rm -rf "$TMP"' EXIT
USER=$(jq -r '.accounts[0].username' config/.elena-op-test-accounts.json)
PASS=$(jq -r '.accounts[0].password' config/.elena-op-test-accounts.json)
curl -sf -c "$CJ" -X POST "$B/auth" -H 'Content-Type: application/json' \
  -d "$(jq -nc --arg u "$USER" --arg p "$PASS" '{username:$u,password:$p}')" >/dev/null || { echo "login failed (server down? 502?)"; exit 1; }
QUERIES=("$@"); [ ${#QUERIES[@]} -eq 0 ] && QUERIES=(.PV TIC FIC PIC LIC 101 201 _CG_ _UT_ Temp Pres Flow)
for q in "${QUERIES[@]}"; do
  curl -s -b "$CJ" -G "$B/search/entityByNameAndDescription" --data-urlencode "query=$q" --data-urlencode "entityType=Column" \
    | jq -r '.data[]?.id'
done | sort -u > "$TMP/ids"
echo "tags found by search: $(wc -l < "$TMP/ids")" >&2
split -l 200 "$TMP/ids" "$TMP/chunk_"
for c in "$TMP"/chunk_*; do
  jq -R . "$c" | jq -sc '{tagIds:.}' | curl -s -b "$CJ" -X POST "$B/model/tags/details" -H 'Content-Type: application/json' -d @- \
    | jq -c '.data[]? | select(.assetId != null) | {name, description, asset: .assetName, type: .measurementTypeName, id}'
done | tee "$TMP/linked"
echo "asset-linked tags: $(wc -l < "$TMP/linked")  | top assets:" >&2
jq -rs 'group_by(.asset)|map("\(length)\t\(.[0].asset)")|sort_by(-(split("\t")[0]|tonumber))|.[0:5][]' "$TMP/linked" >&2
