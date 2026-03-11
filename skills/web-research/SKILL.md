---
name: web-research
description: Quick web research — searches multiple angles, reads sources, synthesizes findings with confidence level. Triggers on "research", "look into", "find out about", "what's the latest on".
allowed-tools: WebSearch, WebFetch
---

# Web Research

Triggers: "research", "look into", "find out about", "what's the latest on", "dig into".

## Steps

1. Take the user's topic or question.
2. Run 2-3 searches with different angles: broad overview, specific angle, recent news.
3. Fetch and read the top 3-5 results.
4. Synthesize into the output format below.

## Output Format

```
Here's what I found on [topic].

Key findings:
• [finding 1 — specific, with source]
• [finding 2]
• [finding 3-5]

Sources:
1. [title] — [url]
2. [title] — [url]
3. [title] — [url]

Confidence: [High/Medium/Low] — [one line explaining why]
```

## Rules

- Confidence levels: 3+ sources agree = High, mixed signals = Medium, limited/conflicting = Low.
- Keep findings specific and actionable. No vague summaries.
- Prioritize sources from the last 6 months when the topic is time-sensitive.
- For people or companies, include their web presence (site, LinkedIn, social).
- Total output fits on one phone screen. Be ruthlessly concise.
- Use WebSearch for searching. Use WebFetch for reading pages. Never use Bash curl.
