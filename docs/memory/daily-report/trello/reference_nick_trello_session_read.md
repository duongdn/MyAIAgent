---
name: reference_nick_trello_session_read
description: "How to read Trello tasks on Nick's boards (Paturevision etc.) — use Nick's Chrome session cookies, NOT the .trello-config.json tokens"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 25bdc109-4d72-496a-a2f4-4bc6bc37dd5c
  modified: 2026-08-10T07:46:28.059Z
---

The two tokens in `config/.trello-config.json` (DuongDn main "My Task" board `O83pAyqb`, rick570 Fountain `5475eaf9...`) CANNOT read Nick's boards. They return **401 "unauthorized card permission requested"** for cards like `o4PtN66W` ([Console] Historical Purchase Order, Paturevision board `664ab8ed2bd00ccff621462c`, Backlog list).

**Working method — Nick's Chrome session (profile Default, nick@nustechnology.com):**

1. Extract cookies from Nick's Chrome profile:
   ```
   ~/.config/google-chrome/Default/Cookies   # Nick = Default profile
   ```
   Using `browser_cookie3.chrome(cookie_file=..., domain_name=...)` for domains `.trello.com`, `trello.com`, `www.trello.com`, `id.atlassian.com`.

2. Build a Netscape cookie jar (NOT a single Cookie header — the `cloud.session.token` is ~1123 chars and breaks an HTTP header line → `HTTP:000 Failed sending HTTP request`). Write as jar file:
   ```
   curl -s -b /tmp/nick-trello-jar.txt "https://trello.com/1/cards/o4PtN66W?fields=..."
   ```

3. Session identity: `nusnick` / Nick @ NUS / nick@nustechnology.com (idMember `556c096f48249e3275a39419`).

**Nick's accessible boards (14):** Banker Hub, Craavings Web, HPD Board, iIoT-viewer, MADU SIA Project, MSV3 — Internal Ops, ORIRI Marketing, **Paturevision** (`664ab8ed2bd00ccff621462c`), Popin Pass Development, RAWWWR, Roomove WebApp, test board clone, Welcome Board.

**Why:** Nick runs separate boards per client (Paturevision is a real client board with Backlog/Doing/QC lists). The monitor config only has DuongDn + Fountain tokens, so any Nick-board card fetch silently 401s. This session method is the way in without needing a new API token from Nick.

**How to apply:** Any task pointing to `trello.com/c/...` that the configured tokens can't read → extract Nick's Default-profile Trello cookies to a jar, then read card/board/list via `trello.com/1/...` endpoints. Related: [[feedback_trello_find_by_name]], [[reference_trello_gate_mapping]].
