# Install Walkthrough (Step by Step)

This is the full handholding guide. Every command, every click, every screen.

---

## Phase 1: Prerequisites (10 min)

### Step 1: Install Node.js

1. Open Safari (or any browser)
2. Go to `nodejs.org`
3. Click the big green **LTS** button (not "Current")
4. Open the downloaded `.pkg` file
5. Click through the installer (Next, Next, Agree, Install)
6. Enter your Mac password when prompted
7. Done

**Verify it worked:**
Open Terminal (Cmd + Space, type "Terminal", hit Enter) and run:
```
node --version
```
You should see something like `v22.x.x`. If you see "command not found", close Terminal and reopen it.

### Step 2: Install Claude Code

In the same Terminal window:
```
npm install -g @anthropic-ai/claude-code
```

Wait for it to finish (takes ~30 seconds). Then:
```
claude login
```

A browser window opens. Sign in with your Anthropic account (or create one at claude.ai). Once you see "Login successful", go back to Terminal.

**Verify:**
```
claude --version
```
Should show a version number.

### Step 3: Install Google Workspace CLI

```
npm install -g @googleworkspace/cli
```

We'll set up Google auth later. Just install for now.

### Step 4: Set up Git identity

Check if Git is configured:
```
git config user.name
git config user.email
```

If both show values, skip ahead. If blank, run:
```
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## Phase 2: Create Your Telegram Bot (2 min)

Do this on your PHONE:

1. Open Telegram
2. Search for `@BotFather`
3. Tap Start (or send `/start`)
4. Send: `/newbot`
5. BotFather asks for a **name** (display name, can be anything): type whatever you want to call your bot
6. BotFather asks for a **username** (must end in "bot"): pick something like `willsassistant_bot`
7. BotFather gives you a **token** that looks like: `7123456789:AAF...something...long`
8. **Copy that token** (tap and hold to copy). You'll paste it in the setup wizard.

Don't close Telegram. You'll come back to it.

---

## Phase 3: Clone and Install (3 min)

Back in Terminal on the Mac Mini:

```
cd ~/Desktop
git clone https://github.com/bernsmp/claudeclaw-starter.git
cd claudeclaw-starter
npm install
```

The `npm install` step takes 1-2 minutes. Wait for it to finish.

---

## Phase 4: Run the Setup Wizard (5 min)

```
npm run setup
```

The wizard walks you through everything. Here's what it asks:

### Screen 1: What is ClaudeClaw?
Read it. Press `y` to continue.

### Screen 2: System checks
It verifies Node.js, Claude CLI, Git. Everything should show green checkmarks. If something fails, follow its instructions.

### Screen 3: What do you do?
Pick your role:
- `1` for Entrepreneur / Creator
- `2` for Consultant / Agency
- `3` for Business Owner / Operator

### Screen 4: About you
- **Your first name**: just your first name
- **What should the bot be called?**: whatever you want (e.g. "Atlas", "Friday", anything)
- **One sentence: what do you do?**: e.g. "Will runs a leadership development consultancy"
- **Obsidian vault path**: press Enter to skip (or type the path if you use Obsidian)

### Screen 5: Autonomy tiers
Three questions about what the bot can do on its own.

**Green (just do it):** things like looking things up, checking calendar, creating tasks. Press Enter to accept the defaults or type your own list.

**Yellow (confirm first):** things like sending emails on your behalf. Press Enter for defaults or customize.

**Red (never):** things like deleting data, making purchases. Press Enter for defaults or customize.

### Screen 6: Features
- Voice input (Groq Whisper)? Say `y` (it's free)
- Voice output (ElevenLabs)? Say `n` for now
- Video analysis? Say `n` for now
- WhatsApp bridge? Say `n` for now

### Screen 7: Ecosystem
"Clone any repos?" Say `n`.

### Screen 8: CLAUDE.md
It auto-generates your CLAUDE.md. Review if you want (`n` is fine, you can edit later).

### Screen 9: Telegram
Paste the bot token from BotFather.
Chat ID: press Enter to skip (the bot will tell you on first message).

### Screen 10: Voice
If you said yes to voice input, paste a Groq API key.
Get one free at `console.groq.com` (sign up, go to API Keys, create one).
If you don't have one yet, press Enter to skip. Voice notes won't work until you add it.

### Screen 11: Claude auth
Press Enter to skip (uses your `claude login` from earlier).

### Screen 12: Auto-start
Say `y` to install as a background service. This means the bot starts automatically when the Mac Mini boots up.

### Screen 13: Done!
You'll see a summary of everything configured.

---

## Phase 5: Start the Bot (1 min)

```
npm start
```

You should see the ClaudeClaw banner and "Bot online: @yourbotname".

**If it says "not built":**
```
npm run build
npm start
```

---

## Phase 6: First Message (1 min)

1. Open Telegram on your phone
2. Search for your bot's username (the one you picked in BotFather)
3. Tap Start
4. Send: `/chatid`
5. The bot replies with your chat ID number
6. Copy that number

Now go back to Terminal on the Mac Mini:
1. Press `Ctrl+C` to stop the bot
2. Open `.env` in a text editor: `nano .env`
3. Find the line `ALLOWED_CHAT_ID=`
4. Paste your chat ID after the `=`
5. Press `Ctrl+X`, then `Y`, then Enter to save
6. Start the bot again: `npm start`

Now send it a real message: "Hi, what can you do?"

---

## Phase 7: Connect Google (3 min)

In a NEW Terminal window (don't close the bot):

```
gws auth setup
```

Follow the prompts. It opens a browser window for Google OAuth. Sign in, approve access. Done.

Now go to Telegram and try:
- "Check my email"
- "What's on my calendar today?"
- "Morning"

---

## Phase 8: Test the Learning Loop (2 min)

This is the key moment. Send the bot a correction:

"From now on, always call me by my first name"

or

"Never use exclamation points in anything you write"

or

"Stop being so formal"

The bot should:
1. Acknowledge it
2. Edit its own CLAUDE.md
3. Tell you what it changed

Check the CLAUDE.md file to see the edit:
```
cat CLAUDE.md
```

That correction now persists across every future conversation. This is the self-improving loop.

---

## Phase 9: Set Up a Morning Brief (2 min)

Send to Telegram:
"Send me a morning brief every day at 8am"

The bot creates a scheduled task. Tomorrow at 8am, you'll get a brief with your calendar, email summary, and priorities.

---

## Troubleshooting

### "command not found: node"
Close Terminal, reopen it. Node needs a fresh shell after install.

### "command not found: claude"
Run: `npm install -g @anthropic-ai/claude-code` again.

### Bot doesn't respond
- Check Terminal for errors
- Make sure `ALLOWED_CHAT_ID` is set in `.env`
- Make sure the bot is running (`npm start`)

### "gws: command not found"
Run: `npm install -g @googleworkspace/cli`

### Google auth fails
Run `gws auth login` instead of `gws auth setup`.

### Bot responds but says "not allowed"
Your chat ID isn't matching. Send `/chatid` again and update `.env`.

### Voice notes don't transcribe
You need a Groq API key in `.env`. Sign up free at console.groq.com.

### Mac Mini goes to sleep and bot stops
System Settings > Energy > turn off "Put hard disks to sleep" and set display sleep but NOT system sleep. Or: the launchd service auto-restarts it on wake.

### Want to restart the bot
```
Ctrl+C
npm start
```

### Want to see what the bot sees (CLAUDE.md)
```
cat ~/Desktop/claudeclaw-starter/CLAUDE.md
```

### Want to edit the bot's brain manually
```
nano ~/Desktop/claudeclaw-starter/CLAUDE.md
```
Edit, save (Ctrl+X, Y, Enter), restart the bot.

### Want to add more skills
Drop a folder with a `SKILL.md` file into `~/.claude/skills/` or `skills/` in the project.

### Want marketing skills
```
git clone https://github.com/coreyhaines31/marketingskills.git
cp -r marketingskills/skills/copywriting ~/.claude/skills/
cp -r marketingskills/skills/pricing-strategy ~/.claude/skills/
cp -r marketingskills/skills/cold-email ~/.claude/skills/
```
