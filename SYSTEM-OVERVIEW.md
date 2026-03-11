# System Overview

```
                          ┌─────────────────────┐
                          │     YOUR PHONE       │
                          │     (Telegram)       │
                          │                      │
                          │  Text, voice notes,  │
                          │  photos, documents   │
                          └──────────┬───────────┘
                                     │
                            Telegram Bot API
                                     │
                          ┌──────────▼───────────┐
                          │                      │
                          │    CLAUDECLAW BOT     │
                          │   (your computer)     │
                          │                      │
                          │  Receives messages    │
                          │  Manages sessions     │
                          │  Tracks tokens        │
                          │  Runs scheduler       │
                          │                      │
                          └──────────┬───────────┘
                                     │
                              Spawns actual
                              Claude CLI
                                     │
                          ┌──────────▼───────────┐
                          │                      │
                          │     CLAUDE CODE       │
                          │                      │
                          │  Loads CLAUDE.md      │
                          │  Loads skills/        │
                          │  Full tool access     │
                          │                      │
                          └──────────┬───────────┘
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
        ┌────────▼───────┐  ┌───────▼────────┐  ┌──────▼───────┐
        │   YOUR FILES   │  │  GOOGLE (gws)  │  │     WEB      │
        │                │  │                │  │              │
        │ Obsidian vault │  │ Gmail          │  │ WebSearch    │
        │ ~/captures/    │  │ Calendar       │  │ WebFetch     │
        │ ~/priorities   │  │ Drive          │  │ Browser      │
        │ Any local file │  │ Sheets/Docs    │  │              │
        └────────────────┘  └────────────────┘  └──────────────┘


═══════════════════════════════════════════════════════════════


                        HOW IT LEARNS

        ┌──────────────┐
        │  You correct  │    "Don't send emails without
        │  the bot      │     asking me first"
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  Bot edits   │    Adds to Red tier:
        │  CLAUDE.md   │    "- Send emails without approval"
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  Next session │    CLAUDE.md loads automatically.
        │  loads it     │    Correction persists forever.
        └──────────────┘


═══════════════════════════════════════════════════════════════


                      WHAT LIVES WHERE

    ┌─────────────────────────────────────────────────────┐
    │                                                     │
    │  CLAUDE.md          Your bot's brain                │
    │  ├── Personality     How it talks                   │
    │  ├── Who you are     Context about you              │
    │  ├── Role            Entrepreneur/Consultant/Owner  │
    │  ├── Autonomy tiers  What it can/can't do alone     │
    │  ├── Learning rules  How corrections persist        │
    │  └── Morning brief   What "morning" triggers        │
    │                                                     │
    │  skills/                                            │
    │  ├── gmail/          Check and send email           │
    │  ├── google-calendar/ View and create events        │
    │  ├── morning-brief/  Daily briefing                 │
    │  ├── quick-capture/  Save ideas to daily files      │
    │  └── web-research/   Multi-source research          │
    │                                                     │
    │  store/claudeclaw.db                                │
    │  ├── sessions        Conversation state             │
    │  ├── messages        Chat history                   │
    │  ├── memories        Persistent facts (decay over   │
    │  │                   time unless reinforced)        │
    │  ├── scheduled_tasks Cron jobs (morning brief etc)  │
    │  └── token_usage     Cost tracking per turn         │
    │                                                     │
    │  .env                API keys and secrets           │
    │  ├── TELEGRAM_BOT_TOKEN                             │
    │  ├── ALLOWED_CHAT_ID                                │
    │  ├── GROQ_API_KEY    (voice transcription)          │
    │  └── ANTHROPIC_API_KEY (optional, for pay-per-use)  │
    │                                                     │
    └─────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════


                     SCHEDULED TASKS

    ┌──────────┐     ┌──────────────────────────────────┐
    │ scheduler│────▶│ Runs every 60 seconds             │
    │ (built   │     │ Checks: any tasks due right now?  │
    │  in)     │     │ If yes: spawns Claude, runs it    │
    │          │     │ Sends result back to Telegram     │
    └──────────┘     └──────────────────────────────────┘

    Example scheduled tasks:
    ┌────────────────────────────────────────────────┐
    │  "0 8 * * *"   Morning brief at 8am daily     │
    │  "0 9 * * 1"   Billing check Monday 9am       │
    │  "0 17 * * 5"  Week ahead Friday 5pm          │
    └────────────────────────────────────────────────┘

    Create via Telegram:
    "Schedule a morning brief every day at 8am"
    Bot runs: schedule-cli.js create "Run morning brief" "0 8 * * *"


═══════════════════════════════════════════════════════════════


                   VOICE NOTE FLOW

    ┌───────────┐     ┌───────────┐     ┌───────────┐
    │ You speak │────▶│ Groq      │────▶│ Claude    │
    │ into      │     │ Whisper   │     │ executes  │
    │ Telegram  │     │ (free)    │     │ the       │
    │           │     │ transcribes│    │ command   │
    └───────────┘     └───────────┘     └───────────┘

    "Check my email" (spoken) works the same as typing it.


═══════════════════════════════════════════════════════════════


                    THE FULL PICTURE

    ┌─────────┐        ┌──────────────┐        ┌──────────┐
    │  PHONE  │◀──────▶│  MAC MINI    │───────▶│  GOOGLE  │
    │         │        │              │        │  (gws)   │
    │Telegram │  Bot   │ ClaudeClaw   │  CLI   │ Gmail    │
    │  app    │  API   │ Claude Code  │  cmds  │ Calendar │
    │         │        │ SQLite DB    │        │ Drive    │
    │ Voice   │        │ Skills       │        └──────────┘
    │ Text    │        │ Scheduler    │
    │ Photos  │        │ Memory       │        ┌──────────┐
    │ Files   │        │              │───────▶│  WEB     │
    └─────────┘        │ CLAUDE.md    │        │ Search   │
                       │ (self-edits) │        │ Fetch    │
                       └──────────────┘        └──────────┘
                              │
                              │ Reads/writes
                              ▼
                       ┌──────────────┐
                       │  YOUR FILES  │
                       │ Obsidian     │
                       │ ~/captures/  │
                       │ Anything     │
                       └──────────────┘
```
