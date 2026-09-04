#!/usr/bin/env bash
# Project-local launcher: bypasses permissions for this project only.
# Forwards all args/flags (--resume, --continue, etc.) untouched.
exec claude --dangerously-skip-permissions "$@"
