---
name: SSH passphrases are in ~/.ssh/config comments
description: SSH key passphrases are stored as comments (#passphase:) above the Host entry in ~/.ssh/config — always read the full config including comments
type: feedback
---

SSH key passphrases are stored as comments in `~/.ssh/config`, directly above the corresponding Host entry. Format: `#passphase: {value}`.

**Why:** User has corrected this multiple times. The passphrase is right there in the config file but agents keep failing to read it and reporting "can't connect" or "passphrase not found."

**How to apply:** When connecting to any SSH host that requires a passphrase, ALWAYS read `~/.ssh/config` including comment lines above the Host entry. Use the passphrase to decrypt the key before connecting.
