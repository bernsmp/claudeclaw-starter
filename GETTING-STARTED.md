# Getting Started

## What is this?

This turns Claude into a personal assistant on your phone via Telegram. It runs on your computer, has access to your files, email, and calendar, and learns from your corrections over time. Think of it as a smart assistant that actually knows your business.

---

## Install (15 minutes)

### 1. Install Node.js

Go to [nodejs.org](https://nodejs.org) and download the **LTS** version. Run the installer, click through, done.

### 2. Install Claude Code

Open Terminal (Mac: press `Cmd + Space`, type "Terminal", hit Enter). Paste this:

```
npm install -g @anthropic-ai/claude-code
```

Then log in:

```
claude login
```

It'll open a browser window. Sign in with your Anthropic account.

### 3. Install Google Workspace CLI (optional, for email + calendar)

```
npm install -g @googleworkspace/cli
```

### 4. Clone and set up the bot

```
git clone https://github.com/bernsmp/claudeclaw-starter.git
cd claudeclaw-starter
npm install
npm run setup
```

### 5. Walk through the setup wizard

It'll ask for your name, what you do, how much autonomy you want the bot to have, and your Telegram bot token. Follow the prompts. If you don't have a Telegram bot yet, the wizard tells you exactly how to create one (takes 2 minutes inside Telegram).

### 6. Start it

```
npm start
```

Open Telegram, find your bot, and say hi.

---

## Your First 48 Hours

**Day 1:** Just talk to it. Ask questions. Tell it to check your email. When it does something you don't like, correct it: say "don't do that again" or "always do X instead." It writes the correction into its own brain and remembers next time.

**Day 2:** Say "morning" to get your daily brief. Connect your calendar and email if you haven't yet by running `gws auth setup` in Terminal. Try "capture [idea]" to save a thought. Try "research [topic]" to get a quick summary.

---

## Key Concepts (5 things to know)

1. **CLAUDE.md** is your bot's brain. It loads every session. When you correct the bot, it edits this file automatically. You can also open it in any text editor and change it by hand.

2. **Skills** are saved workflows. Say "morning" and it runs your morning brief skill. Say "research X" and it runs web research. Type `ls ~/.claude/skills/` in Terminal to see what's installed.

3. **Context window** is the memory limit per conversation. When it starts forgetting things, say `/newchat` to reset. Say `convolife` to check how much memory is left before that happens.

4. **Voice notes** let you talk to it like a person. Send a voice message on Telegram, it transcribes and executes. No typing needed.

5. **Autonomy tiers** control what it can do without asking. Green means it just does it. Yellow means it asks first. Red means never. You set these during install and can change them anytime in CLAUDE.md.

---

## Want marketing skills?

Corey Haines built 32 high-quality marketing skills: copywriting, pricing strategy, cold email, content strategy, SEO, paid ads, and more. Install any of them here:

https://github.com/coreyhaines31/marketingskills/tree/main/skills

Good starting points: `copywriting`, `pricing-strategy`, and `cold-email`.

---

## Next Steps

- Open `CLAUDE.md` and add more context about yourself and your business (your clients, your offers, how you prefer to communicate)
- Ask the bot: "send me a morning brief every day at 8am" to set up a daily schedule
- See the full `README.md` for advanced features: multi-agent teams, WhatsApp bridge, voice cloning
