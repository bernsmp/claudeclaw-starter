# ClaudeClaw Setup Guide

> Your personal AI assistant, running on your computer, controlled from your phone.

This guide assumes you're starting from a brand new Mac with nothing installed. Every step has a verification check so you know it worked. Total time: ~30 minutes if nothing goes wrong, ~45 minutes if you hit snags.

---

## Your Setup Sidekick

Before you start, open **claude.ai** (or the Claude desktop app) in a separate window. This is your troubleshooting buddy. If you hit a wall at any point during setup, paste the error into that window and it'll tell you exactly what to do.

Upload this entire setup guide as a file into a new Claude conversation, then paste this prompt alongside it:

```
I just uploaded the setup guide I'm following. I'm installing ClaudeClaw
on my [Mac Mini / MacBook / iMac] running macOS [version — check Apple
menu → About This Mac].

You are my setup sidekick. Here's how to help me:

- When I paste an error from Terminal, tell me the exact command to fix
  it. No explaining, just the fix.
- When I send a screenshot, tell me what I'm looking at and what to
  click or type next.
- When I ask what something means, one sentence, then tell me if I
  need to do anything about it.
- If you need more info to help me, ask ONE specific question.
- Reference the step number from the guide so I can follow along.

I'm starting now.
```

Keep that Claude window open the whole time. Every error, every weird screen, every "what does this mean" moment, just paste it in. Claude has the full guide so it knows exactly where you are and what success looks like at each step.

> 📸 SCREENSHOT NEEDED: Claude.ai window with the sidekick prompt loaded, side-by-side with Terminal

---

## What You're Installing (and why)

Before we touch anything, here's what each piece does in plain English:

| Tool | What it is | Why you need it |
|------|-----------|-----------------|
| **Homebrew** | Mac's unofficial app store for developer tools. You type `brew install [thing]` instead of hunting for downloads. | Installs Node, Git, and handles permissions so nothing breaks |
| **Node.js** | The engine that runs JavaScript on your computer (not just in browsers). Most modern tools are built on it. | ClaudeClaw is a Node app |
| **Git** | Version control. Tracks changes to files so you can undo mistakes. Also how you download code from GitHub. | You need it to download ClaudeClaw's code |
| **Claude Code** | Anthropic's command-line tool for Claude. Same AI, but it can read your files, run commands, and use tools. | The brain of your bot. Everything runs through this. |
| **VS Code** | A code editor. You don't need to write code, but it's the cleanest way to see what Claude is doing. | Optional but recommended. Makes everything easier to manage. |
| **Telegram** | Messaging app. Your bot lives here. | The remote control for your assistant |

---

## Phase 0: Accounts to Create First (5 min)

Do this before touching your Mac Mini. Use your phone or another computer.

Open these in browser tabs and create accounts:

- [ ] **Anthropic** — go to claude.ai, create an account (you need a Pro or Max subscription, $20-100/mo)
- [ ] **GitHub** — go to github.com, create a free account (tip: use "Continue with Google" to skip the 15-character password requirement)
- [ ] **Telegram** — install the app on your phone, create an account with your phone number
- [ ] **Groq** — go to console.groq.com, create a free account, go to API Keys, create one. Save it somewhere. (This is for voice notes, totally free.)

Write down your GitHub username. You'll need it.

> 📸 SCREENSHOT NEEDED: All four account dashboards/confirmations

---

## Phase 1: Mac Setup (10 min)

### Open Terminal

Press **Command + Space**, type **Terminal**, hit Enter.

You'll see a window with text like `willsmacmini ~ %` and a blinking cursor. This is where you'll paste commands.

**Terminal tips for non-terminal people:**
- **Paste** is Command+V (same as everywhere else)
- **You won't see passwords as you type them.** The cursor won't move. This is normal. Just type and hit Enter.
- If something looks stuck, try pressing Enter
- If something is REALLY stuck, press **Control+C** to cancel it
- If you accidentally end up in a screen that won't let you type normally (this is called "vim"), type `:q!` and press Enter to escape

> 📸 SCREENSHOT NEEDED: Fresh terminal window, what it looks like

### Step 1: Install Homebrew

Paste this entire line into Terminal and press Enter:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It will ask for your **Mac password** (the one you use to log in to the computer). Type it and press Enter. You won't see the characters appear. That's normal.

This takes 2-5 minutes. It will also install Xcode Command Line Tools automatically. You might see a popup asking you to install — click **Install**.

**When it finishes**, it will show something like:

```
==> Next steps:
- Run these commands in your terminal to add Homebrew to your PATH:
    echo >> /Users/will/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/will/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```

**You MUST run those commands.** Copy each line one at a time, paste into Terminal, press Enter. There are usually 3 lines.

> 📸 SCREENSHOT NEEDED: The "Next steps" output, and what to copy
> 📸 SCREENSHOT NEEDED: What it looks like if Xcode popup appears

**Verify it worked:**
```
brew --version
```
You should see something like `Homebrew 4.x.x`. If you see "command not found", close Terminal completely (Command+Q) and reopen it.

### Step 2: Install Node.js and Git

```
brew install node git
```

This takes 1-2 minutes. Homebrew handles everything.

**Verify both worked:**
```
node --version && git --version
```

You should see two version numbers, something like:
```
v22.14.0
git version 2.47.1
```

> 📸 SCREENSHOT NEEDED: Both version numbers showing

### Step 3: Set up Git identity

Git needs to know who you are. Use your real name and the email connected to your GitHub account:

```
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

No output means it worked.

### Step 4: Prevent the Vim Trap

Some tools will try to open a text editor called Vim, which is famously impossible to exit. This one command makes sure it opens a normal editor instead:

```
echo 'export EDITOR=nano' >> ~/.zshrc && source ~/.zshrc
```

You'll never think about this again, but it'll save you from getting stuck.

---

## Phase 2: Install Claude Code (5 min)

### Step 1: Install

```
npm install -g @anthropic-ai/claude-code
```

Wait ~30 seconds.

**If you get a permission error** like `EACCES` or `operation not permitted`:
```
sudo npm install -g @anthropic-ai/claude-code
```
It will ask for your Mac password again.

### Step 2: Fix the PATH (if needed)

After installing, type:
```
claude --version
```

If you see a version number, skip ahead to Step 3.

If you see **"command not found"** or **"installation exists but local bin not in your path"**, you need to add it to your PATH. Run:

```
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

Then try `claude --version` again.

> 📸 SCREENSHOT NEEDED: "command not found" error (the broken state)
> 📸 SCREENSHOT NEEDED: Version number showing (the working state)

### Step 3: Log in

```
claude login
```

A browser window opens. Sign in with your Anthropic account. Once you see "Login successful" in the browser, go back to Terminal.

> 📸 SCREENSHOT NEEDED: The browser login screen
> 📸 SCREENSHOT NEEDED: "Login successful" confirmation

### Step 4: Install VS Code Extension (recommended)

If you use VS Code:

1. Open VS Code
2. Press **Command+Shift+X** (opens Extensions panel)
3. Search for **"Claude Code"**
4. Click **Install**

Now you can open Claude Code inside VS Code by clicking the Claude icon in the left sidebar, instead of using the raw terminal.

> 📸 SCREENSHOT NEEDED: VS Code extension search result
> 📸 SCREENSHOT NEEDED: Claude Code panel open in VS Code sidebar

---

## Phase 3: Create Your Telegram Bot (3 min)

Do this on your **phone**:

1. Open Telegram
2. Search for **@BotFather** (it has a blue checkmark)
3. Tap **Start**
4. Send: `/newbot`
5. It asks for a **display name** — type whatever you want (e.g., "Maverick AI")
6. It asks for a **username** — must end in `bot` (e.g., `maverick_ai_bot`, `willsbot_bot`)
   - If your first choice is taken, just add numbers or underscores
7. BotFather gives you a **token** — a long string like `7123456789:AAF...something...`
8. **Copy that token and save it somewhere** (Notes app, text file, whatever). You'll paste it in 5 minutes.

> 📸 SCREENSHOT NEEDED: BotFather conversation showing the token (redact the actual token)

---

## Phase 4: Clone and Configure (10 min)

### Step 1: Download the code

Back in Terminal:

```
cd ~/Desktop
git clone https://github.com/moazbuilds/claudeclaw.git
cd claudeclaw
npm install
```

The `npm install` step takes 1-2 minutes. Wait for it to finish.

> **Note:** If the clone URL above doesn't work or the project has moved, check the latest link in your training materials. The setup process is the same regardless of which ClaudeClaw version you use.

### Step 2: Run the Setup Wizard

**Important: Run this in Terminal, not inside VS Code's Claude panel.** The wizard needs keyboard input that doesn't work well inside Claude Code.

```
npm run setup
```

The wizard walks you through everything. Here's what each screen asks:

---

**Screen 1: Welcome**
Read it. Press `y` to continue.

**Screen 2: System checks**
It verifies Node.js, Claude CLI, Git. Everything should show green checkmarks.

If Git shows a warning about not being configured, type `y` to set it up now, then enter your name and GitHub email.

> 📸 SCREENSHOT NEEDED: System checks with all green

**Screen 3: What do you do?**
Pick your role:
- `1` Entrepreneur / Creator
- `2` Consultant / Agency
- `3` Business Owner / Operator

This sets some default behaviors. You can change everything later.

**Screen 4: About you**
- **Your first name**: just your first name
- **Bot name**: whatever you want to call your assistant (e.g., "Maverick", "Atlas", "Friday")
- **One sentence: what do you do**: e.g., "Will helps founders build and launch digital businesses"
- **Obsidian vault path**: press Enter to skip (unless you use Obsidian)

**Screen 5: Autonomy tiers**

This is important. You're setting three permission levels for what the bot can do without asking.

🟢 **Green (just do it):** Things like looking things up, checking calendar, creating tasks, drafting content, reading emails. Press Enter to accept defaults, or type your own list.

🟡 **Yellow (confirm first):** Things like sending emails, posting content, scheduling meetings. The bot will draft it and ask "should I send this?" before acting.

🔴 **Red (never):** Things like deleting data, making purchases, publishing anything. The bot won't do these even if you ask.

Press Enter on each to accept the sensible defaults. You can always edit these later in `CLAUDE.md`.

> 📸 SCREENSHOT NEEDED: Autonomy tier screen

**Screen 6: Features**
- **Voice input (Groq Whisper)?** → `y` (free, and very useful)
- **Voice output (ElevenLabs)?** → `y` (set up later, but good to enable)
- **Video analysis (Gemini)?** → `y` (can analyze photos/videos you send)
- **WhatsApp bridge?** → `n` (skip for now, adds complexity)

**Screen 7: Ecosystem repos**
"Clone any repos for reference?" → `y` to all three. These are just reference code, won't affect your bot.

**Screen 8: CLAUDE.md review**
The wizard generates your bot's personality file. Press Enter to accept. You can edit this file any time later.

**Screen 9: Telegram**
Paste the bot token you saved from BotFather.

**Chat ID:** Press Enter to skip. Your bot will tell you your chat ID when you send it your first message.

**Screen 10: Voice**
If you said yes to voice input, paste your Groq API key (from console.groq.com → API Keys).

If you don't have it handy, press Enter to skip. Voice notes won't work until you add it later.

**Screen 11: Claude auth**
Press Enter to skip. It uses your `claude login` from earlier (your subscription).

**Screen 12: Auto-start**
Say `y`. This makes the bot start automatically when your Mac boots up. You won't have to remember to start it manually.

**Screen 13: Done**
You'll see a summary of everything configured.

> 📸 SCREENSHOT NEEDED: Final summary screen

---

## Phase 5: Start Your Bot (2 min)

### Step 1: Start the bot

```
npm start
```

You should see the ClaudeClaw banner and something like "Bot online: @yourbotname".

If it says "not built":
```
npm run build && npm start
```

> 📸 SCREENSHOT NEEDED: Bot online banner in terminal

### Step 2: Send your first message

1. Open Telegram on your phone
2. Search for your bot's username (the one you picked in BotFather)
3. Tap **Start**
4. Send: **hi**

The bot should respond. It might take 5-10 seconds on the first message.

**If the bot responds with a chat ID notice:** Copy that number. Then:
1. Go back to Terminal on your Mac
2. Press **Control+C** to stop the bot
3. Open the `.env` file: `nano .env`
4. Find `ALLOWED_CHAT_ID=` and paste your chat ID after the `=`
5. Press **Control+X**, then **Y**, then **Enter** to save
6. Start the bot again: `npm start`

> 📸 SCREENSHOT NEEDED: First message in Telegram
> 📸 SCREENSHOT NEEDED: Bot responding

---

## Phase 6: Train Your Bot (5 min)

This is the part that matters. The bot learns from your corrections and remembers them forever.

### Test the learning loop

Send any correction to your bot in Telegram:

- "From now on, always call me by my first name"
- "Never use exclamation points in anything you write"
- "Stop being so formal"
- "When I say morning, include my top 3 priorities"

The bot should:
1. Acknowledge it briefly ("Got it" or "Updated")
2. Edit its own `CLAUDE.md` file
3. Tell you what it changed

That correction now persists across every future conversation. This is how it gets smarter over time.

### Try a few commands

- **"What can you do?"** — see what's available
- **"Morning"** — get a daily brief (needs Google connected, see Phase 7)
- **"Capture: [any idea]"** — saves to a daily notes file
- **"Research [any topic]"** — multi-source web research with confidence levels

### Set up a scheduled task

Send: **"Send me a morning brief every day at 8am"**

The bot creates a cron job. Tomorrow at 8am, you'll get an automatic briefing.

---

## Phase 7: Connect Google (optional, 3 min)

This lets your bot read your email and calendar.

In a **new Terminal window** (don't close the bot):

```
npm install -g @googleworkspace/cli
gws auth setup
```

Follow the prompts. A browser window opens for Google sign-in. Approve the permissions.

**Tip:** If you want the bot to see your main calendar without giving it your main Gmail, create a shared calendar and share it with the new Gmail account.

Once connected, try in Telegram:
- "Check my email"
- "What's on my calendar today?"
- "Morning"

---

## Phase 8: Mac Mini Housekeeping

### Prevent sleep

Your Mac Mini needs to stay awake for the bot to work.

System Settings → Energy → turn OFF "Put hard disks to sleep" and set display sleep but NOT system sleep.

The launchd service (from Step 12 of setup) will auto-restart the bot if it crashes or the machine restarts.

### Keep Terminal free

Once the bot is running via launchd (auto-start), you don't need Terminal open. The bot runs in the background. You can close Terminal.

To check if it's running:
```
npm run status
```

To see logs:
```
tail -f /tmp/claudeclaw.log
```

---

## Troubleshooting

### "command not found: node"
Close Terminal completely (Command+Q), reopen it. Node needs a fresh shell after install.

### "command not found: claude"
Run `npm install -g @anthropic-ai/claude-code` again. If you get permission errors, add `sudo` in front.

### "command not found: brew"
You didn't run the PATH commands after installing Homebrew. Go back to Phase 1, Step 1 and look for the "Next steps" section.

### Claude Code installed but "not in your path"
Run:
```
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
```

### Permission errors (EACCES)
Always means the same thing: your user doesn't have access to that folder. Add `sudo` before the command and enter your Mac password.

### Bot doesn't respond in Telegram
- Check Terminal for errors
- Make sure `ALLOWED_CHAT_ID` is set in `.env`
- Make sure the bot is running (`npm start` or check `npm run status`)

### "gws: command not found"
Run: `npm install -g @googleworkspace/cli`

### Voice notes don't transcribe
You need a Groq API key in `.env`. Sign up free at console.groq.com, go to API Keys, create one.

### Mac Mini goes to sleep and bot stops
System Settings → Energy → disable system sleep. The launchd auto-start will handle restarts.

### Stuck in a weird screen that won't let you type (vim)
Type `:q!` and press Enter. Then type `:q!` and press Enter again if needed. You're back.

### Terminal is showing garbled text or weird characters
Press **Control+C**, then type `reset` and press Enter.

---

## What's Next

### Edit your bot's brain
Open `CLAUDE.md` in any text editor (or VS Code). This is everything your bot knows about you, your preferences, and its rules. The more context you add, the better it performs.

### Add skills
Skills are folders with a `SKILL.md` file. Drop them into `~/.claude/skills/` or the `skills/` folder in the project. Your bot auto-discovers them.

Starter skills included:
- **gmail** — read, triage, reply to email
- **google-calendar** — view schedule, create events
- **morning-brief** — daily briefing with calendar + email + priorities
- **quick-capture** — save ideas to daily notes files
- **web-research** — multi-source research with confidence levels
- **tldr** — summarize conversations and save notes

### Want marketing skills?
Install from the community:
```
git clone https://github.com/coreyhaines31/marketingskills.git
cp -r marketingskills/skills/copywriting ~/.claude/skills/
cp -r marketingskills/skills/pricing-strategy ~/.claude/skills/
cp -r marketingskills/skills/cold-email ~/.claude/skills/
```

### The learning loop
Every correction you make ("don't do that", "always do X") gets written into `CLAUDE.md` and persists forever. The more you correct, the more personalized it becomes. After a week of corrections, your bot behaves nothing like a default Claude session.

---

## Quick Reference

| Task | Command |
|------|---------|
| Start the bot | `npm start` |
| Stop the bot | Control+C in Terminal |
| Check if running | `npm run status` |
| See logs | `tail -f /tmp/claudeclaw.log` |
| Edit bot brain | Open `CLAUDE.md` in any editor |
| Add a skill | Drop folder with `SKILL.md` into `skills/` |
| Rebuild after changes | `npm run build && npm start` |
| Update from GitHub | `git pull && npm install && npm run build` |
