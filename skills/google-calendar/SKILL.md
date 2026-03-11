---
name: google-calendar
description: Manage your Google Calendar from Claude Code. View agenda, create events with attendees, check availability.
allowed-tools: Bash(gws *)
---

# Google Calendar Skill

## Purpose

View schedule, create meetings, send invites, and check availability via the `gws` CLI.

## Quick Commands (Helpers)

### View agenda

```bash
gws calendar +agenda --today
gws calendar +agenda --tomorrow
gws calendar +agenda --week
gws calendar +agenda --days 3
gws calendar +agenda --format table
```

**This is the default command** when the user asks about their schedule.

### Create an event

```bash
gws calendar +insert --summary "Meeting Title" --start "2026-03-15T10:00:00" --end "2026-03-15T10:30:00"
gws calendar +insert --summary "Review" --start "2026-03-15T14:00:00" --end "2026-03-15T15:00:00" --attendee "alice@example.com" --attendee "bob@example.com"
gws calendar +insert --summary "Lunch" --start "..." --end "..." --location "Cafe Roma" --description "Quarterly catch-up"
```

Use `--attendee` once per person (repeat the flag for multiple).

## Raw API Commands

### List events with filters

```bash
gws calendar events list --calendarId primary --timeMin "2026-03-15T00:00:00Z" --timeMax "2026-03-15T23:59:59Z"
```

### Quick add (natural language)

```bash
gws calendar events quickAdd --calendarId primary --text "Coffee with Sarah tomorrow at 3pm"
```

### Get event details

```bash
gws calendar events get --calendarId primary --eventId <event_id>
```

### Update an event

```bash
gws calendar events patch --calendarId primary --eventId <event_id> --json '{"summary": "New Title"}'
```

### Delete an event

```bash
gws calendar events delete --calendarId primary --eventId <event_id>
```

Sends cancellation notices to all attendees.

### Check free/busy

```bash
gws calendar freebusy query --json '{"timeMin": "2026-03-15T09:00:00Z", "timeMax": "2026-03-15T17:00:00Z", "items": [{"id": "primary"}]}'
```

## CRITICAL: Day-of-Week Verification

**NEVER assume a date from a day name** (e.g. "Monday", "next Thursday"). Always verify:

```bash
python3 -c "from datetime import date; d = date(2026, 3, 15); print(f'{d.strftime(\"%A\")} {d}')"
```

If the output day name does NOT match what was requested, find the correct date. This is a blocking requirement. Getting the day wrong sends a wrong invite to a real person.

## Confirmation Before Creating

Always show the user what you're about to create before running the command:
- Title
- **Day of week + Date/time** (e.g. "Monday Mar 15, 12:00pm")
- Duration
- Attendees (if any)

Then ask for confirmation before executing.

## Defaults

- Duration: 30 minutes (unless specified)
- Always confirm before creating
- Times in ISO 8601 format

## Timezone

Default timezone depends on your system locale. Append timezone offset to times if needed: `2026-03-15T10:00:00-05:00` for US Eastern.

## One-Time Setup

Shared with Gmail. If Gmail is already set up, calendar auth is done too.

```bash
npm install -g @googleworkspace/cli
gws auth setup
```

Or: `gws auth login` if already installed.
