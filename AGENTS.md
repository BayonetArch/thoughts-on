
# Code Style
- Meaningful variable names
- No comments
- Never use emojis, em-dashes or excessive capitalization



## Design tokens (do not deviate)

Palette is the lackluster color scheme. Every color has a job, don't add new ones.

| var | hex | role |
|---|---|---|
| `--bg` | `#080808` | page background |
| `--surface` | `#191919` | cards, panels, terminal blocks |
| `--surface-alt` | `#2a2a2a` | rarely used, deeper surface |
| `--border` / `--border-soft` | `#444444` | hairlines, card borders |
| `--text` | `#DDDDDD` | primary text |
| `--text-dim` | `#aaaaaa` | body copy, descriptions |
| `--text-mute` | `#7a7a7a` | labels, timestamps, meta |
| `--mint` | `#deeeed` | brand accent: wordmark, primary button, links on hover |
| `--blue` | `#7788AA` | secondary accent, one of the section rule colors |
| `--green` | `#789978` | "alive/running" signal (status dot text, prompt `$`), one section rule |
| `--orange` | `#ffaa88` | warm accent, one section rule, one timeline clip |
| `--red` | `#D70000` | the recording dot and the timeline playhead only, nothing else |
| `--slate` | `#708090` | dividers, one timeline clip, one section rule |


never use the blinking dots.

## rules (strict)

- No emojis, no em dashes.
- No "X, no Y, no Z" negation lists ("no cloud, no watermark, no subscription"). It reads as AI-generated. State the fact plainly instead: "clips stay on disk," not "no uploads, no cloud, no tracking."
- No "not X, but Y" contrast pairs in headings either, same problem.
- Don't reuse an identical decorative device on every section for flavor. One clean structural device (the color rule) does that job. 
- Active voice, plain verbs, sentence case. Lowercase wordmark  never caps-locked.

