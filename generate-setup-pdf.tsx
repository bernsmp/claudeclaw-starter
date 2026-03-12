import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  Font,
  StyleSheet,
  renderToFile,
} from "@react-pdf/renderer";
import path from "path";
import { fileURLToPath } from "url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.join(DIR, "screenshots");
const FONTS = path.join(DIR, "fonts");

// --- Fonts ---
// Using built-in Helvetica for body and Courier for code (no download needed)
Font.registerHyphenationCallback((word: string) => [word]);

// --- Colors ---
const C = {
  bg: "#FFFFFF",
  pageBg: "#F8F7F4",
  text: "#1A1A1A",
  textMuted: "#6B6B6B",
  accent: "#E8590C",
  accentLight: "#FFF4E6",
  green: "#2B8A3E",
  greenBg: "#EBFBEE",
  yellow: "#E67700",
  yellowBg: "#FFF9DB",
  red: "#C92A2A",
  redBg: "#FFF5F5",
  codeBg: "#F1F3F5",
  codeBorder: "#DEE2E6",
  cardBg: "#FFFFFF",
  cardBorder: "#E9ECEF",
  divider: "#DEE2E6",
};

// --- Styles ---
const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.bg,
    padding: 48,
    paddingBottom: 64,
    color: C.text,
  },
  coverPage: {
    fontFamily: "Helvetica",
    backgroundColor: C.pageBg,
    padding: 48,
    justifyContent: "center",
    alignItems: "center",
    color: C.text,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: C.textMuted,
  },
  footerLine: {
    position: "absolute",
    bottom: 44,
    left: 48,
    right: 48,
    height: 0.5,
    backgroundColor: C.divider,
  },

  // Typography
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
    color: C.text,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 24,
    color: C.text,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    marginTop: 16,
    color: C.text,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 8,
    color: C.text,
  },
  bodyMuted: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 8,
    color: C.textMuted,
  },
  bold: {
    fontWeight: "bold",
  },

  // Code
  code: {
    fontFamily: "Courier",
    fontSize: 9,
    backgroundColor: C.codeBg,
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    border: `0.5px solid ${C.codeBorder}`,
    color: "#343A40",
    lineHeight: 1.5,
  },
  inlineCode: {
    fontFamily: "Courier",
    fontSize: 9,
    backgroundColor: C.codeBg,
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
  },

  // Cards
  card: {
    backgroundColor: C.cardBg,
    borderRadius: 6,
    padding: 14,
    marginBottom: 10,
    border: `0.5px solid ${C.cardBorder}`,
  },
  tipCard: {
    backgroundColor: C.accentLight,
    borderRadius: 6,
    padding: 14,
    marginBottom: 10,
    borderLeft: `3px solid ${C.accent}`,
  },
  warningCard: {
    backgroundColor: C.yellowBg,
    borderRadius: 6,
    padding: 14,
    marginBottom: 10,
    borderLeft: `3px solid ${C.yellow}`,
  },

  // Table
  tableRow: {
    flexDirection: "row",
    borderBottom: `0.5px solid ${C.divider}`,
    paddingVertical: 6,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: `1px solid ${C.text}`,
    paddingBottom: 4,
    marginBottom: 2,
  },

  // Screenshots
  screenshot: {
    width: "100%",
    borderRadius: 4,
    marginVertical: 8,
    border: `0.5px solid ${C.cardBorder}`,
  },
  screenshotCaption: {
    fontSize: 8,
    color: C.textMuted,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.2,
  },

  // Bullets
  bulletRow: {
    flexDirection: "row",
    marginBottom: 4,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 14,
    fontSize: 10,
    color: C.textMuted,
  },
  bulletText: {
    fontSize: 10,
    lineHeight: 1.6,
    flex: 1,
    color: C.text,
  },

  // Checklist
  checkRow: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 4,
    alignItems: "flex-start",
  },
  checkBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    border: `1px solid ${C.divider}`,
    marginRight: 8,
    marginTop: 1,
  },
  checkText: {
    fontSize: 10,
    lineHeight: 1.5,
    flex: 1,
    color: C.text,
  },

  // Phase header
  phaseTag: {
    backgroundColor: C.accent,
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    alignSelf: "flex-start",
    marginBottom: 6,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  phaseTime: {
    fontSize: 9,
    color: C.textMuted,
    marginBottom: 4,
  },

  divider: {
    height: 0.5,
    backgroundColor: C.divider,
    marginVertical: 16,
  },
});

// --- Helper Components ---

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <View style={s.bulletRow}>
    <Text style={s.bulletDot}>&#8226;</Text>
    <Text style={s.bulletText}>{children}</Text>
  </View>
);

const Check = ({ children }: { children: React.ReactNode }) => (
  <View style={s.checkRow}>
    <View style={s.checkBox} />
    <Text style={s.checkText}>{children}</Text>
  </View>
);

const Code = ({ children }: { children: string }) => (
  <Text style={s.code}>{children}</Text>
);

const Tip = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={s.tipCard} wrap={false}>
    <Text style={[s.body, s.bold, { color: C.accent, marginBottom: 4 }]}>{title}</Text>
    <Text style={s.body}>{children}</Text>
  </View>
);

const Warning = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={s.warningCard} wrap={false}>
    <Text style={[s.body, s.bold, { color: C.yellow, marginBottom: 4 }]}>{title}</Text>
    <Text style={s.body}>{children}</Text>
  </View>
);

const Screenshot = ({ src, caption }: { src: string; caption: string }) => (
  <View wrap={false} style={{ marginVertical: 4 }}>
    <Image src={src} style={s.screenshot} />
    <Text style={s.screenshotCaption}>{caption}</Text>
  </View>
);

const Phase = ({ number, title, time }: { number: string; title: string; time: string }) => (
  <View style={{ marginBottom: 4 }}>
    <Text style={s.phaseTag}>Phase {number}</Text>
    <Text style={s.h2}>{title}</Text>
    <Text style={s.phaseTime}>{time}</Text>
  </View>
);

const StepTitle = ({ children }: { children: string }) => (
  <Text style={s.h3}>{children}</Text>
);

const Divider = () => <View style={s.divider} />;

const Footer = () => (
  <>
    <View style={s.footerLine} fixed />
    <View style={s.footer} fixed>
      <Text style={s.footerText}>ClaudeClaw Setup Guide</Text>
      <Text
        style={s.footerText}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  </>
);

// --- Document ---

const SetupGuide = () => (
  <Document title="ClaudeClaw Setup Guide" author="ClaudeClaw" subject="Installation Guide">

    {/* ====== COVER PAGE ====== */}
    <Page size="A4" style={s.coverPage}>
      <View style={{ alignItems: "center", marginBottom: 40 }}>
        <Text style={{ fontSize: 42, fontWeight: "bold", letterSpacing: -1.5, marginBottom: 8 }}>
          ClaudeClaw
        </Text>
        <Text style={{ fontSize: 15, color: C.textMuted, letterSpacing: 0.5 }}>
          SETUP GUIDE
        </Text>
      </View>

      <View style={{ width: 60, height: 2, backgroundColor: C.accent, marginBottom: 40 }} />

      <Text style={{ fontSize: 13, color: C.textMuted, textAlign: "center", lineHeight: 1.8, maxWidth: 380 }}>
        Your personal AI assistant, running on your computer,{"\n"}controlled from your phone.
      </Text>

      <View style={{ marginTop: 60, alignItems: "center" }}>
        <Text style={{ fontSize: 9, color: C.textMuted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 12 }}>
          What you'll set up
        </Text>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {["Homebrew", "Node.js", "Claude Code", "Telegram Bot"].map((t) => (
            <View key={t} style={{ backgroundColor: C.bg, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 4, border: `0.5px solid ${C.cardBorder}` }}>
              <Text style={{ fontSize: 9, color: C.text }}>{t}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ position: "absolute", bottom: 48 }}>
        <Text style={{ fontSize: 9, color: C.textMuted, textAlign: "center" }}>
          Starting from a brand new Mac with nothing installed.{"\n"}
          Total time: ~30 minutes
        </Text>
      </View>
    </Page>

    {/* ====== CONTENT PAGES ====== */}
    <Page size="A4" style={s.page}>
      <Footer />

      {/* --- SIDEKICK --- */}
      <View style={[s.card, { backgroundColor: C.accentLight, border: `1px solid ${C.accent}`, marginBottom: 16 }]}>
        <Text style={[s.h3, { color: C.accent, marginTop: 0 }]}>Your Setup Sidekick</Text>
        <Text style={s.body}>
          Before you start, open claude.ai (or the Claude desktop app) in a separate window. This is your troubleshooting buddy. If you hit a wall at any point, paste the error into that window and it'll tell you exactly what to do.
        </Text>
        <Text style={[s.body, { marginBottom: 4 }]}>
          Upload this entire guide as a file into a new Claude conversation, then paste this prompt:
        </Text>
        <Code>{`I just uploaded the setup guide I'm following. I'm installing
ClaudeClaw on my [Mac Mini / MacBook / iMac] running macOS
[version -- check Apple menu > About This Mac].

You are my setup sidekick. Here's how to help me:

- When I paste an error from Terminal, tell me the exact
  command to fix it. No explaining, just the fix.
- When I send a screenshot, tell me what I'm looking at
  and what to click or type next.
- If you need more info, ask ONE specific question.
- Reference the step number from the guide.

I'm starting now.`}</Code>
        <Text style={s.bodyMuted}>
          Keep that window open the whole time. Every error, every weird screen, just paste it in.
        </Text>
      </View>

      <Screenshot
        src={path.join(SHOTS, "01-sidekick-natural.jpg")}
        caption="Real example: Will opened claude.ai as his troubleshooting buddy during setup"
      />

      <Divider />

      {/* --- WHAT YOU'RE INSTALLING --- */}
      <Text style={s.h2}>What You're Installing (and why)</Text>

      <View style={s.tableHeader}>
        <Text style={[s.body, s.bold, { width: 80 }]}>Tool</Text>
        <Text style={[s.body, s.bold, { width: 200 }]}>What it is</Text>
        <Text style={[s.body, s.bold, { flex: 1 }]}>Why you need it</Text>
      </View>
      {[
        ["Homebrew", "Mac's app store for dev tools", "Installs everything else cleanly"],
        ["Node.js", "Runs JavaScript on your computer", "ClaudeClaw is a Node app"],
        ["Git", "Downloads code from GitHub", "Gets ClaudeClaw's source code"],
        ["Claude Code", "Anthropic's CLI for Claude", "The brain of your bot"],
        ["VS Code", "Code editor (optional)", "Easiest way to manage things"],
        ["Telegram", "Messaging app", "Your remote control"],
      ].map(([tool, what, why], i) => (
        <View key={i} style={s.tableRow}>
          <Text style={[s.body, s.bold, { width: 80 }]}>{tool}</Text>
          <Text style={[s.body, { width: 200 }]}>{what}</Text>
          <Text style={[s.body, { flex: 1 }]}>{why}</Text>
        </View>
      ))}

      <Divider />

      {/* --- PHASE 0 --- */}
      <Phase number="0" title="Accounts to Create First" time="5 minutes  --  do this before touching your Mac" />

      <Text style={s.body}>
        Open these in browser tabs and create accounts. Do it from your phone or another computer.
      </Text>

      <Check>Anthropic -- go to claude.ai, create an account (Pro or Max subscription, $20-100/mo)</Check>
      <Check>GitHub -- go to github.com, create a free account (tip: use "Continue with Google" to skip the password hassle)</Check>
      <Check>Telegram -- install the app on your phone, create account with your phone number</Check>
      <Check>Groq -- go to console.groq.com, free account, go to API Keys, create one. Save it. (For voice notes, totally free.)</Check>

      <Text style={[s.body, { marginTop: 8 }]}>Write down your GitHub username. You'll need it.</Text>

      <Screenshot
        src={path.join(SHOTS, "07-github-login.jpg")}
        caption="GitHub sign-in -- note the 'Continue with Google' option to skip password creation"
      />

      <View break />

      {/* --- PHASE 1 --- */}
      <Phase number="1" title="Mac Setup" time="10 minutes" />

      <StepTitle>Open Terminal</StepTitle>
      <Text style={s.body}>
        Press Command + Space, type Terminal, hit Enter. You'll see a window with text like "macmini ~ %" and a blinking cursor.
      </Text>

      <View style={s.card} wrap={false}>
        <Text style={[s.body, s.bold, { marginBottom: 6 }]}>Terminal tips for non-terminal people</Text>
        <Bullet>Paste is Command+V (same as everywhere else)</Bullet>
        <Bullet>You won't see passwords as you type them. The cursor won't move. This is normal.</Bullet>
        <Bullet>If something looks stuck, try pressing Enter</Bullet>
        <Bullet>If something is REALLY stuck, press Control+C to cancel</Bullet>
        <Bullet>If you end up in a screen that won't let you type (called "vim"), type :q! and press Enter</Bullet>
      </View>

      <StepTitle>Step 1: Install Homebrew</StepTitle>
      <Text style={s.body}>Paste this entire line into Terminal and press Enter:</Text>
      <Code>{`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}</Code>

      <Text style={s.body}>
        It asks for your Mac password (the one you use to log into the computer). Type it and press Enter. You won't see characters appear. That's normal.
      </Text>
      <Text style={s.body}>
        This takes 2-5 minutes. It also installs Xcode Command Line Tools automatically.
      </Text>

      <Warning title="Important: Run the PATH commands">
        {"When Homebrew finishes, it shows \"Next steps\" with 3 commands to run. You MUST copy and run each one. If you skip this, every brew command will fail with \"command not found.\""}
      </Warning>

      <Screenshot
        src={path.join(SHOTS, "05-homebrew-installing.jpg")}
        caption="Homebrew installing in Terminal -- watch for the 'Next steps' output at the end"
      />

      <Screenshot
        src={path.join(SHOTS, "06-homebrew-path-commands.jpg")}
        caption="The sidekick helped Will find and run the PATH commands when he got stuck"
      />

      <Text style={s.body}>Verify it worked:</Text>
      <Code>brew --version</Code>
      <Text style={s.bodyMuted}>
        Should show "Homebrew 4.x.x". If "command not found", close Terminal (Command+Q) and reopen.
      </Text>

      <StepTitle>Step 2: Install Node.js and Git</StepTitle>
      <Code>brew install node git</Code>
      <Text style={s.body}>Verify both:</Text>
      <Code>{`node --version && git --version`}</Code>
      <Text style={s.bodyMuted}>Should show two version numbers like v22.14.0 and git version 2.47.1</Text>

      <StepTitle>Step 3: Set up Git identity</StepTitle>
      <Text style={s.body}>Use your real name and the email connected to your GitHub account:</Text>
      <Code>{`git config --global user.name "Your Name"\ngit config --global user.email "your@email.com"`}</Code>
      <Text style={s.bodyMuted}>No output means it worked.</Text>

      <StepTitle>Step 4: Prevent the Vim Trap</StepTitle>
      <Text style={s.body}>Some tools open a text editor called Vim, which is famously impossible to exit. This prevents it:</Text>
      <Code>{`echo 'export EDITOR=nano' >> ~/.zshrc && source ~/.zshrc`}</Code>

      <View break />

      {/* --- PHASE 2 --- */}
      <Phase number="2" title="Install Claude Code" time="5 minutes" />

      <StepTitle>Step 1: Install</StepTitle>
      <Code>npm install -g @anthropic-ai/claude-code</Code>
      <Text style={s.body}>Wait ~30 seconds.</Text>

      <Tip title="Permission error?">
        {"If you get EACCES or \"operation not permitted\", run:\nsudo npm install -g @anthropic-ai/claude-code\nIt asks for your Mac password again."}
      </Tip>

      <StepTitle>Step 2: Fix the PATH (if needed)</StepTitle>
      <Code>claude --version</Code>
      <Text style={s.body}>
        If you see a version number, skip to Step 3. If "command not found" or "not in your path":
      </Text>
      <Code>{`echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc`}</Code>

      <StepTitle>Step 3: Log in</StepTitle>
      <Code>claude login</Code>
      <Text style={s.body}>A browser window opens. Sign in with your Anthropic account.</Text>

      <Screenshot
        src={path.join(SHOTS, "02-claude-code-login.jpg")}
        caption="Claude Code first launch -- select 'Claude account with subscription' (option 1)"
      />

      <StepTitle>Step 4: VS Code Extension (recommended)</StepTitle>
      <Bullet>Open VS Code</Bullet>
      <Bullet>Press Command+Shift+X (opens Extensions panel)</Bullet>
      <Bullet>Search for "Claude Code"</Bullet>
      <Bullet>Click Install</Bullet>

      <Screenshot
        src={path.join(SHOTS, "03-vscode-claude-panel.jpg")}
        caption="Claude Code running inside VS Code -- the panel on the right is where you'll interact"
      />

      <View break />

      {/* --- PHASE 3 --- */}
      <Phase number="3" title="Create Your Telegram Bot" time="3 minutes  --  do this on your phone" />

      <View style={s.card}>
        <Bullet>Open Telegram, search for @BotFather (blue checkmark)</Bullet>
        <Bullet>Tap Start, then send: /newbot</Bullet>
        <Bullet>It asks for a display name -- type whatever you want (e.g., "Maverick AI")</Bullet>
        <Bullet>It asks for a username -- must end in "bot" (e.g., maverick_ai_bot)</Bullet>
        <Bullet>BotFather gives you a token -- a long string like 7123456789:AAF...</Bullet>
        <Bullet>Copy that token and save it somewhere. You'll paste it in 5 minutes.</Bullet>
      </View>

      <Screenshot
        src={path.join(SHOTS, "04-botfather-newbot.jpg")}
        caption="Creating a new bot in BotFather -- copy the token it gives you"
      />

      <View break />

      {/* --- PHASE 4 --- */}
      <Phase number="4" title="Clone and Configure" time="10 minutes" />

      <StepTitle>Step 1: Download the code</StepTitle>
      <Code>{`cd ~/Desktop\ngit clone https://github.com/moazbuilds/claudeclaw.git\ncd claudeclaw\nnpm install`}</Code>
      <Text style={s.bodyMuted}>The npm install step takes 1-2 minutes. Wait for it to finish.</Text>

      <StepTitle>Step 2: Run the Setup Wizard</StepTitle>
      <Warning title="Run this in Terminal, not VS Code">
        The wizard needs keyboard input that doesn't work well inside Claude Code's panel. Use your regular Terminal window.
      </Warning>
      <Code>npm run setup</Code>

      <Text style={s.body}>The wizard walks you through everything:</Text>

      <View style={s.card} wrap={false}>
        <Text style={[s.body, s.bold, { marginBottom: 6 }]}>Screen 1-2: Welcome + System Checks</Text>
        <Text style={s.body}>Press y to continue. Everything should show green checkmarks.</Text>
      </View>

      <View style={s.card} wrap={false}>
        <Text style={[s.body, s.bold, { marginBottom: 6 }]}>Screen 3: What do you do?</Text>
        <Bullet>1 - Entrepreneur / Creator</Bullet>
        <Bullet>2 - Consultant / Agency</Bullet>
        <Bullet>3 - Business Owner / Operator</Bullet>
      </View>

      <View style={s.card} wrap={false}>
        <Text style={[s.body, s.bold, { marginBottom: 6 }]}>Screen 4: About You</Text>
        <Bullet>Your first name</Bullet>
        <Bullet>Bot name (e.g., "Maverick", "Atlas", "Friday")</Bullet>
        <Bullet>One sentence: what you do</Bullet>
        <Bullet>Obsidian vault path: press Enter to skip</Bullet>
      </View>

      <Screenshot
        src={path.join(SHOTS, "08-wizard-role-picker.jpg")}
        caption="The setup wizard: role selection and 'About you' fields"
      />

      <View style={[s.card, { backgroundColor: C.greenBg, borderLeft: `3px solid ${C.green}` }]} wrap={false}>
        <Text style={[s.body, s.bold, { color: C.green, marginBottom: 6 }]}>Screen 5: Autonomy Tiers</Text>
        <Text style={s.body}>This is the important one. Three permission levels:</Text>
        <View style={{ marginTop: 6 }}>
          <Text style={[s.body, { color: C.green }]}>Green (just do it): Look things up, check calendar, create tasks, draft content, read emails</Text>
          <Text style={[s.body, { color: C.yellow }]}>Yellow (confirm first): Send emails, post content, schedule meetings</Text>
          <Text style={[s.body, { color: C.red }]}>Red (never): Delete data, make purchases, publish anything publicly</Text>
        </View>
        <Text style={[s.bodyMuted, { marginTop: 4 }]}>Press Enter on each to accept the sensible defaults. Edit later in CLAUDE.md.</Text>
      </View>

      <View style={s.card} wrap={false}>
        <Text style={[s.body, s.bold, { marginBottom: 6 }]}>Screens 6-8: Features + CLAUDE.md</Text>
        <Bullet>Voice input (Groq Whisper)? y (free)</Bullet>
        <Bullet>Voice output (ElevenLabs)? y (set up later)</Bullet>
        <Bullet>Video analysis (Gemini)? y</Bullet>
        <Bullet>WhatsApp bridge? n (skip for now)</Bullet>
        <Bullet>Ecosystem repos? y to all three</Bullet>
        <Bullet>CLAUDE.md review? Press Enter to accept</Bullet>
      </View>

      <View style={s.card} wrap={false}>
        <Text style={[s.body, s.bold, { marginBottom: 6 }]}>Screen 9: Telegram</Text>
        <Text style={s.body}>Paste the bot token you saved from BotFather.</Text>
        <Text style={s.body}>Chat ID: Press Enter to skip. The bot tells you on first message.</Text>
      </View>

      <Screenshot
        src={path.join(SHOTS, "10-telegram-token.jpg")}
        caption="Pasting the Telegram bot token during setup"
      />

      <View style={s.card} wrap={false}>
        <Text style={[s.body, s.bold, { marginBottom: 6 }]}>Screens 10-13: Voice, Auth, Auto-start</Text>
        <Bullet>Voice: paste Groq API key if you have it, or Enter to skip</Bullet>
        <Bullet>Claude auth: press Enter (uses your subscription login)</Bullet>
        <Bullet>Auto-start: y (bot starts when Mac boots)</Bullet>
      </View>

      <View break />

      {/* --- PHASE 5 --- */}
      <Phase number="5" title="Start Your Bot" time="2 minutes" />

      <Code>npm start</Code>
      <Text style={s.body}>
        You should see the ClaudeClaw banner and "Bot online: @yourbotname".
      </Text>
      <Text style={s.bodyMuted}>If it says "not built": npm run build && npm start</Text>

      <Screenshot
        src={path.join(SHOTS, "11-bot-online.jpg")}
        caption="ClaudeClaw online! The terminal shows 'Bot online' and the sidekick confirms next steps."
      />

      <StepTitle>Send your first message</StepTitle>
      <View style={s.card}>
        <Bullet>Open Telegram on your phone</Bullet>
        <Bullet>Search for your bot's username</Bullet>
        <Bullet>Tap Start</Bullet>
        <Bullet>Send: hi</Bullet>
      </View>

      <Text style={s.body}>
        If the bot responds with a chat ID notice, copy that number, then update your .env file:
      </Text>
      <Code>{`# Stop the bot: Control+C\nnano .env\n# Find ALLOWED_CHAT_ID= and paste your chat ID\n# Save: Control+X, then Y, then Enter\nnpm start`}</Code>

      <Screenshot
        src={path.join(SHOTS, "12-first-response.jpg")}
        caption="MaverickBot's first response -- it introduces itself with its capabilities and permission levels"
      />

      <View break />

      {/* --- PHASE 6 --- */}
      <Phase number="6" title="Train Your Bot" time="5 minutes" />

      <Text style={s.body}>
        This is the part that matters. The bot learns from corrections and remembers them forever.
      </Text>

      <StepTitle>Test the learning loop</StepTitle>
      <Text style={s.body}>Send any correction to your bot in Telegram:</Text>
      <View style={s.card}>
        <Bullet>"From now on, always call me by my first name"</Bullet>
        <Bullet>"Never use exclamation points in anything you write"</Bullet>
        <Bullet>"Stop being so formal"</Bullet>
        <Bullet>"When I say morning, include my top 3 priorities"</Bullet>
      </View>

      <Text style={s.body}>
        The bot acknowledges it, edits its own CLAUDE.md file, and tells you what changed. That correction persists across every future conversation.
      </Text>

      <StepTitle>Try a few commands</StepTitle>
      <View style={s.card}>
        <Bullet>"What can you do?" -- see what's available</Bullet>
        <Bullet>"Morning" -- daily brief (needs Google connected)</Bullet>
        <Bullet>"Capture: [any idea]" -- saves to daily notes</Bullet>
        <Bullet>"Research [any topic]" -- multi-source web research</Bullet>
      </View>

      <StepTitle>Set up a scheduled task</StepTitle>
      <Text style={s.body}>Send: "Send me a morning brief every day at 8am"</Text>
      <Text style={s.bodyMuted}>The bot creates a cron job. Tomorrow at 8am, you'll get an automatic briefing.</Text>

      <Screenshot
        src={path.join(SHOTS, "13-bot-research.jpg")}
        caption="The bot doing web research -- asked for monitor recommendations and returned real results"
      />

      <View break />

      {/* --- PHASE 7 --- */}
      <Phase number="7" title="Connect Google (optional)" time="3 minutes" />

      <Text style={s.body}>This lets your bot read your email and calendar. In a new Terminal window:</Text>
      <Code>{`npm install -g @googleworkspace/cli\ngws auth setup`}</Code>
      <Text style={s.body}>Follow the prompts. A browser opens for Google sign-in. Approve permissions.</Text>

      <Tip title="Tip">
        If you want the bot to see your main calendar without giving it your main Gmail, create a shared calendar and share it with the new Gmail account.
      </Tip>

      <Divider />

      {/* --- PHASE 8 --- */}
      <Phase number="8" title="Mac Mini Housekeeping" time="2 minutes" />

      <StepTitle>Prevent sleep</StepTitle>
      <Text style={s.body}>
        {"System Settings > Energy > turn OFF \"Put hard disks to sleep\". Set display sleep but NOT system sleep. The launchd service auto-restarts the bot if it crashes."}
      </Text>

      <StepTitle>Quick reference</StepTitle>
      <View style={s.tableHeader}>
        <Text style={[s.body, s.bold, { width: 200 }]}>Task</Text>
        <Text style={[s.body, s.bold, { flex: 1 }]}>Command</Text>
      </View>
      {[
        ["Start the bot", "npm start"],
        ["Stop the bot", "Control+C in Terminal"],
        ["Check if running", "npm run status"],
        ["See logs", "tail -f /tmp/claudeclaw.log"],
        ["Edit bot brain", "Open CLAUDE.md in any editor"],
        ["Add a skill", "Drop folder with SKILL.md into skills/"],
        ["Rebuild after changes", "npm run build && npm start"],
        ["Update from GitHub", "git pull && npm install && npm run build"],
      ].map(([task, cmd], i) => (
        <View key={i} style={s.tableRow}>
          <Text style={[s.body, { width: 200 }]}>{task}</Text>
          <Text style={[s.body, { fontFamily: "Courier", fontSize: 9, flex: 1 }]}>{cmd}</Text>
        </View>
      ))}

      <Divider />

      {/* --- TROUBLESHOOTING --- */}
      <Text style={s.h2}>Troubleshooting</Text>

      {[
        ['"command not found: node"', "Close Terminal completely (Command+Q), reopen it. Node needs a fresh shell after install."],
        ['"command not found: claude"', "Run npm install -g @anthropic-ai/claude-code again. Permission errors? Add sudo in front."],
        ['"command not found: brew"', "You didn't run the PATH commands after Homebrew install. Go back to Phase 1, Step 1."],
        ['"not in your path"', 'Run: echo \'export PATH="$HOME/.npm-global/bin:$PATH"\' >> ~/.zshrc && source ~/.zshrc'],
        ["Permission errors (EACCES)", "Add sudo before the command and enter your Mac password."],
        ["Bot doesn't respond", "Check Terminal for errors. Make sure ALLOWED_CHAT_ID is set in .env. Make sure bot is running."],
        ["Stuck in vim", "Type :q! and press Enter. Then :q! and Enter again if needed."],
        ["Garbled text in Terminal", "Press Control+C, then type reset and press Enter."],
      ].map(([problem, fix], i) => (
        <View key={i} style={[s.card, { padding: 10 }]} wrap={false}>
          <Text style={[s.body, s.bold, { marginBottom: 2 }]}>{problem}</Text>
          <Text style={s.bodyMuted}>{fix}</Text>
        </View>
      ))}

      <Divider />

      {/* --- WHAT'S NEXT --- */}
      <Text style={s.h2}>What's Next</Text>

      <StepTitle>Skills included in your starter kit</StepTitle>
      <View style={s.card}>
        <Bullet>gmail -- read, triage, reply to email</Bullet>
        <Bullet>google-calendar -- view schedule, create events</Bullet>
        <Bullet>morning-brief -- daily briefing with calendar + email + priorities</Bullet>
        <Bullet>quick-capture -- save ideas to daily notes files</Bullet>
        <Bullet>web-research -- multi-source research with confidence levels</Bullet>
        <Bullet>tldr -- summarize conversations and save notes</Bullet>
      </View>

      <StepTitle>The learning loop</StepTitle>
      <Text style={s.body}>
        Every correction you make gets written into CLAUDE.md and persists forever. The more you correct, the more personalized it becomes. After a week of corrections, your bot behaves nothing like a default Claude session.
      </Text>

    </Page>
  </Document>
);

// --- Render ---
(async () => {
  const out = path.join(DIR, "ClaudeClaw-Setup-Guide.pdf");
  await renderToFile(<SetupGuide />, out);
  console.log(`PDF saved to ${out}`);
})();
