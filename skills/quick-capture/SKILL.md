---
name: quick-capture
description: Instant thought capture — save ideas, notes, and tasks to daily files. Triggers on "capture", "save this", "remember this", "idea:", "note:".
allowed-tools: Read, Write, Bash(mkdir *)
---

# Quick Capture

Save a thought, idea, or note to today's daily capture file instantly.

## Triggers

- "capture", "save this", "remember this"
- Message starts with "idea:" or "note:"
- Standalone thought that looks like something worth saving

## Behavior

1. Run `mkdir -p ~/captures` to ensure the directory exists.
2. Read `~/captures/YYYY-MM-DD.md` if it exists (today's date).
3. Append a new entry in this format:

```
## HH:MM — [content]
```

4. If the message contains hashtags (`#tag`), preserve them at the end of the entry.
5. Strip the trigger prefix ("idea:", "note:", "capture:") before saving — keep the thought itself.
6. If this looks like voice transcription, clean obvious artifacts (filler words, repeated phrases) but never rewrite the meaning. Capture verbatim otherwise.
7. Confirm with: "Captured." or "Saved to today's notes."

## Format Rules

- One file per day: `~/captures/2026-03-10.md`
- Multiple entries accumulate in a single file, newest at the bottom
- No summarizing. No rewriting. Raw capture is the point.
- No extra headers, sections, or metadata beyond the `## HH:MM —` line

## Example

User: `idea: offer a group coaching tier for the CF methodology #cf #product`

Appended to `~/captures/2026-03-10.md`:
```
## 14:32 — Offer a group coaching tier for the CF methodology #cf #product
```

Reply: "Captured."
