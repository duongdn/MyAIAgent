# MyDailyAssistant — Config Guide

Daemon: `scripts/assistant/assistant-daemon.js` (systemd user service `my-daily-assistant`).
Web: http://assistant.local/inbox.html (tabs: important messages, gate log).

## Files you can edit

| File | What | Applies |
|------|------|---------|
| `config/assistant-policy.json` | Main settings (below) | live, no restart |
| `scripts/assistant/prompts/relevance-gate-prompt.md` | Filter criteria in plain words (what counts as urgent / await reply / drop) | live |
| `scripts/assistant/prompts/rules-memory-files.txt` | Memory files whose rules the filter applies (one path per line) | live |
| `config/.telegram-config.json` | Bot token + chatId (secret, encrypted `.enc`) | restart |
| `config/.llm-gateway-config.json` | LLM gateway URL + key (secret, encrypted `.enc`) | restart |

## `config/assistant-policy.json`

| Key | Meaning |
|-----|---------|
| `enabled` | `false` = kill switch: nothing judged or sent |
| `dryRun` | `true` = only log decisions (`tmp/assistant-gate.log`), never send Telegram |
| `desktopPopup` | popup on this desktop when notifying |
| `judgeModel` | gateway model (`deepseek-v4.1-flash`; others: `glm-5.3-flash`, `deepseek-flash`, `mimo-v2.5`) |
| `maxJudgeCallsPerDay` | LLM call cap per day; over cap → only DM/@mention messages kept, no LLM |
| `replyWaitMin` | customer ask: notify only if our side hasn't replied after N minutes |
| `telegramDays` | ngày gửi Telegram theo giờ VN (0=CN … 6=T7); hiện `[6,0]` = chỉ T7, CN. Ngày khác chỉ inbox web + popup desktop |
| `pollMinutes.slack/gmailApi/zalo/whatsapp/discord` | poll interval per source (Matrix, IMAP email, Slack RTM workspaces = realtime, no interval) |
| `ourSlackNames` | Slack display names counted as "our side" (for "already answered") |
| `muted` | prefix keys to ignore: `"<source>:<account>:<channel>"`, e.g. `"slack:Amazing Meds:"`, `"email:ken@nustechnology.com"`, `"zalo:zalo:QĐ MENU"` |

## Useful commands
- Restart: `systemctl --user restart my-daily-assistant` · stop: `systemctl --user stop my-daily-assistant`
- Logs: `tmp/assistant-daemon.log` (listeners), `tmp/assistant-gate.log` (filter decisions)
- Today's LLM usage: Telegram `/status`, or cursors `llm:calls:<date>` / `llm:tokens:<date>` in `data/assistant.db`
