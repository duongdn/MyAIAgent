# Cron Server (mpfc.mpfc.live) Credential Setup

Current gaps blocking daily report from cron: GitHub accounts, Solid Code Slack, Discord.

## 1. Add missing GitHub accounts

The cron server only has `duongdn` + `mypersonalfootballcoach`. Need:

```bash
# On mpfc.mpfc.live, as the cron user:
gh auth login --hostname github.com --with-token
# Paste token for: davidztv
# Repeat for: nuscarrick, nusken, nusnick
```

Or copy the `hosts.yml` from this machine (`/home/nus/snap/gh/640/.config/gh/hosts.yml`) to the cron server at the equivalent path.

Accounts needed:
| Account | Use | 
|---------|-----|
| davidztv | Arthur GitHub (Christebob/Meta_Stamp_V3) |
| nuscarrick | XiD/Equanimity repos |
| nusken | Precognize repos |
| nusnick | John Yi repos |

## 2. Solid Code Slack token

Run on **desktop** (not cron server — needs Chrome):
```bash
DISPLAY=:0 node scripts/slack-xoxc-refresh-solidcode.js
```
This extracts xoxc+d from Chrome Profile 15 and saves to `config/.slack-accounts.json`.
After running, re-encrypt and sync to cron server.

## 3. Discord nusvinn token

Run on desktop:
```bash
node scripts/discord-token-refresh.js nusvinn
```

## 4. Workstream SSO

Cannot be automated — requires human to click Keycloak. 
Cron runs accept this limitation (documented in daily report environment note).

## 5. MS Teams (Philip)

`scripts/teams-scrape-chat-philip.js` — needs interactive Puppeteer.
Cron limitation: no display available. Run from desktop when needed.
