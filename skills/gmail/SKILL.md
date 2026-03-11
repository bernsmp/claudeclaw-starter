---
name: gmail
description: Manage your Gmail inbox from Claude Code. List, read, triage, reply, send, and label emails using the Google Workspace CLI.
allowed-tools: Bash(gws *)
---

# Gmail Skill

## Purpose

Read, triage, reply, and send emails from your Gmail inbox via the `gws` CLI. All commands return structured JSON by default.

## Quick Commands (Helpers)

These cover 90% of use cases:

### Triage inbox (unread summary)

```bash
gws gmail +triage
gws gmail +triage --max 10
gws gmail +triage --query "from:boss@example.com"
gws gmail +triage --format table
```

Returns sender, subject, date for unread messages. **This is the default command** when the user says "check email" or "inbox".

### Send an email

```bash
gws gmail +send --to "to@example.com" --subject "Subject" --body "Body text"
```

Always draft and confirm with the user before running this command (see Drafting Rules).

## Raw API Commands

For operations the helpers don't cover:

### List messages with filters

```bash
gws gmail users messages list --q "is:unread" --maxResults 20
gws gmail users messages list --q "from:client@company.com newer_than:7d"
gws gmail users messages list --q "label:inbox" --format table
```

Supports full Gmail search query syntax via `--q`.

### Read a full message

```bash
gws gmail users messages get --id <msg_id> --format json
```

### Modify a message (mark read, add/remove labels)

```bash
gws gmail users messages modify --id <msg_id> --addLabelIds "UNREAD" --removeLabelIds "INBOX"
```

### Trash a message

```bash
gws gmail users messages trash --id <msg_id>
```

### List labels

```bash
gws gmail users labels list
```

## Workflow

1. Run `gws gmail +triage` to show unread inbox
2. Display as a markdown table (see Display Format)
3. Ask the user which messages to act on
4. Run the appropriate command(s) and confirm results

## Display Format

| # | From | Subject | Time |
|---|------|---------|------|
| 1 | someone@example.com | Re: Project update | 2h ago |
| 2 | newsletter@co.com | Your weekly digest | 5h ago |

- One row per message
- Keep `From` to display name only, truncate long addresses

## Drafting Rules

- Always draft email content and show the full draft before sending
- Never run `gws gmail +send` without explicit confirmation
- For replies, show the original message snippet alongside the draft

## One-Time Setup

```bash
npm install -g @googleworkspace/cli
gws auth setup
```

Or if already installed: `gws auth login`. Browser opens for OAuth consent. Auth tokens are stored locally by `gws`.

## Error Handling

- If `gws` not found: run `npm install -g @googleworkspace/cli`
- If auth fails: run `gws auth login`
- Never retry a send command automatically
