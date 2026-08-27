# CMPT 225 Notes Organizer (Fall 2026)

A small, self-contained, offline notes app for organizing CMPT 225 study notes by
topic. No build step, no server, no external dependencies — everything runs
directly in the browser and notes are saved to that browser's `localStorage`
(nothing is uploaded anywhere).

## Using it

Open [`index.html`](index.html) directly in a browser (double-click it, or
`open index.html` / `xdg-open index.html`). That's it.

- **Topics** (left column) — filter notes by the course's topic areas.
- **Notes list** (middle column) — search, browse, and pick a note to edit.
  Pinned notes float to the top.
- **Editor** (right column) — title, topic + subtopic, free-form tags, and a
  content area that supports light Markdown (`# headers`, `**bold**`,
  `*italic*`, `` `code` ``, ` ```code blocks``` `, `- lists`, `[links](url)`).
  Toggle **Preview** to render it. Notes autosave as you type, or press
  `Cmd/Ctrl+S`.
- **Export / Import JSON** — back up your notes to a file, or move them
  between browsers/computers.

## Topic taxonomy

The topic list mirrors the Fall 2026 CMPT 225 course outline:

- **Object-Oriented Programming in Java**
- **Abstract Data Types (ADTs)**
- **Data Structures** — Lists, Stacks, Queues, Sets, Trees, Binary Trees,
  Binary Search Trees, Self-Balancing Trees, Priority Queues, Heaps,
  Hash Tables, Disk-Bound Data
- **Algorithms** — Searching, Sorting, Graph Traversing, Recursion,
  Divide and Conquer
- **Algorithm Efficiency** — Time Complexity, Space Complexity, Big-O
  Notation, Master Theorem
- **Other** — anything that doesn't fit the above (logistics, quiz prep, etc.)

Edit the `TOPICS` array at the top of [`app.js`](app.js) if the course outline
changes or you want to add finer-grained subtopics.

## Data

Notes are plain JSON objects (`id`, `title`, `topic`, `subtopic`, `tags`,
`content`, `pinned`, `createdAt`, `updatedAt`) stored under the
`cmpt225-fall26-notes-v1` key in `localStorage`. Use **Export JSON**
periodically to keep a backup outside the browser.
