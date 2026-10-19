#!/bin/bash
# F7: mobile-app API write endpoints on the upgrade TEST server (register → auth → change info → plans →
# cancel → logout → delete account). Uses a throwaway user it registers itself; the test member is only
# used for remove_plan (C10). Creds from config/.mpfc-upgrade-test-config.json (run decrypt-secrets.sh first).
set -uo pipefail
CFG="$(dirname "$0")/../../../config/.mpfc-upgrade-test-config.json"
H=$(jq -r .basic_auth.host "$CFG"); BA="$(jq -r .basic_auth.user "$CFG"):$(jq -r .basic_auth.password "$CFG")"
[[ $H == upgrade-test.* ]] || { echo "refusing: not the test host"; exit 1; }
api_p() { local ep=$1; shift; local args=(); for a in "$@"; do args+=(--data-urlencode "$a"); done; curl -s -m 120 -u "$BA" -G "https://$H/api/$ep/" "${args[@]}"; }
PASS=0; FAIL=0
check() { if echo "$2" | grep -qE "$3"; then echo "ok   $1: ${2:0:160}"; PASS=$((PASS+1)); else echo "BAD  $1: ${2:0:300}"; FAIL=$((FAIL+1)); fi; }

TS=$(date +%s); EMAIL="nus.upgrade.app.$TS@example.com"; PW="Tmp-$TS-Aa9!x"
R=$(api_p registration/create firstname=Nus lastname=App$TS user_email=$EMAIL password=$PW); check "register" "$R" '"status":"(ok|success)"'
R=$(api_p auth/generate_auth_cookie username=$EMAIL password=$PW); check "login new user" "$R" '"cookie"'
CK=$(echo "$R" | jq -r .cookie); UID_NEW=$(echo "$R" | jq -r .user.id)
R=$(api_p dashboard/changeAccountInfo id=$UID_NEW first_name=Nus2 last_name=Changed phone=0123 email=$EMAIL); check "changeAccountInfo" "$R" '^(1|.*"status":"ok".*)$'
R=$(api_p dashboard/getAccountInfo id=$UID_NEW cookie=$CK); check "getAccountInfo shows change" "$R" 'Changed'
R=$(api_p user/get_plans cookie=$CK); check "get_plans" "$R" '"status":"(ok|success)"'
R=$(api_p dashboard/canselMembership id=$UID_NEW course_id=9); check "canselMembership" "$R" '^(1|.*"status":"ok".*)$'
R=$(api_p auth/destroy_auth_cookie cookie=$CK); check "logout (destroy cookie)" "$R" '"status":"(ok|success)"'
R=$(api_p auth/generate_auth_cookie username=$EMAIL password=$PW); CK=$(echo "$R" | jq -r .cookie)
R=$(api_p user/delete cookie=$CK); check "delete account" "$R" '"status":"(ok|success)"'
R=$(api_p auth/generate_auth_cookie username=$EMAIL password=$PW); check "deleted user cannot login" "$R" '"status":"error"'

if [ -z "${SKIP_MEMBER:-}" ]; then
# C10: cancel a plan of the test member (bundle bought in the checkout test)
MU=$(jq -r .test_users.member.user "$CFG"); MP=$(jq -r .test_users.member.password "$CFG")
MCK=$(api_p auth/generate_auth_cookie username=$MU password=$MP | jq -r .cookie)
R=$(api_p user/get_plans cookie=$MCK); check "member get_plans" "$R" '"status":"(ok|success)"'; echo "     plans: $(echo "$R" | jq -c '[.. | objects | select(has("bundle_id")) | {bundle_id, status}]' 2>/dev/null | cut -c1-200)"
R=$(api_p user/remove_plan cookie=$MCK bundle_id=${CANCEL_BUNDLE:-9}); check "member remove_plan bundle ${CANCEL_BUNDLE:-9}" "$R" '"status":"(ok|success)"'
fi

# C7/F9: member video upload (stored under uploads/lib_videos/<uid>/) then delete — MEDIA_DIR has t.mp4 + t.jpg
if [ -n "${MEDIA_DIR:-}" ]; then
  MU=$(jq -r .test_users.member.user "$CFG"); MP=$(jq -r .test_users.member.password "$CFG")
  MCK=$(api_p auth/generate_auth_cookie username=$MU password=$MP | jq -r .cookie)
  R=$(curl -s -m 180 -u "$BA" "https://$H/api/dashboard/UploadMemberVideo/?cookie=$(jq -rn --arg c "$MCK" '$c|@uri')" \
      -F "name=NUS upgrade upload test" -F "add_to_lib=0" -F "file=@$MEDIA_DIR/t.mp4;type=video/mp4" -F "image=@$MEDIA_DIR/t.jpg;type=image/jpeg")
  check "UploadMemberVideo" "$R" '"response":"(OK|SUCCESS|ok|success)"|"post_id"|"id"'
  VID=$(echo "$R" | grep -oE '"(post_id|id|video_id)":"?[0-9]+' | head -1 | grep -oE '[0-9]+$')
  echo "     video post id: ${VID:-?}"
  [ -n "$VID" ] && { R=$(curl -s -m 120 -u "$BA" "https://$H/api/dashboard/DeleteMemberVideo/?cookie=$(jq -rn --arg c "$MCK" '$c|@uri')" -F "videoId=$VID"); check "DeleteMemberVideo" "$R" 'success|OK|ok|true|1'; }
fi
echo "PASS=$PASS FAIL=$FAIL"
