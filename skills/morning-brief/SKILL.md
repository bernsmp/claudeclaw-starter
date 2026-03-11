---
name: morning-brief
description: Daily morning briefing — calendar, email summary, priorities. Triggers on "morning", "brief", "start my day", "what's on today".
allowed-tools: Bash(gws *)
---

# Morning Brief

Compile a scannable morning brief from calendar, email, and priorities. Keep it short — readable in 10 seconds on a phone.

## Steps

### 1. Calendar

Run: `gws calendar +agenda --today`

If the command fails (not connected), skip calendar and include this note: "Connect calendar: gws auth setup"

Extract: time, title, meeting link (if present). Format as `HH:MM — Event title (link)`.

### 2. Email

Run: `gws gmail +triage --max 10`

For each message extract sender name and subject. Classify urgency:
- **Action needed**: contains words like "urgent", "please", "can you", "?", "deadline", "ASAP", reply expected
- **FYI**: everything else

List action-needed emails first, then FYI. Keep each line to: `• Sender — Subject (action needed)` or `• Sender — Subject`

### 3. Priorities file

Check in order:
1. `~/priorities.md`
2. `~/Desktop/priorities.md`
3. Any `.md` file with "priorities" or "todo" in the name in the home directory

Run: `ls ~/priorities.md ~/Desktop/priorities.md 2>/dev/null | head -1`

If found, read it and pull the top 3–5 items. If not found, skip this section entirely.

## Output Format

```
Good morning. Here's your day.

📅 Schedule
• 9:00 — Team standup (Google Meet)
• 2:00 — Client call with [name]

📧 Email (X unread)
• [sender] — [subject] (action needed)
• [sender] — [subject]

🎯 Priorities
• [item from priorities file]

Have a good one.
```

Rules:
- Skip any section that has no data (no calendar = no 📅 block, no priorities file = no 🎯 block)
- One line per calendar event or email — no extra commentary
- Do not add preamble or closing remarks beyond what's in the format above
