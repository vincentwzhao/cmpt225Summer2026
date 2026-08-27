# CMPT 225 Notes Organizer (Fall 2026)

A small, self-contained, offline notes app for organizing CMPT 225 study notes by
topic. It's a single HTML file — no build step, no server, no external
dependencies, no other files to keep alongside it — and notes are saved to
that browser's `localStorage` (nothing is uploaded anywhere).

## Using it

Open [`index.html`](index.html) directly in a browser (double-click it, or
`open index.html` / `xdg-open index.html`). That's it. Because everything
(CSS and JS) is inlined into the one file, you can copy or download just
`index.html` on its own and it'll still work — no missing-stylesheet issues.

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
- **Related course materials** — while editing a note, the panel below the
  topic/subtopic pickers links to the lecture slides and quiz problem
  sets/solutions in this repo that match the selected topic.
- **Topic Coverage** (button, top right) — a table of every syllabus topic
  and subtopic showing how many notes you have, and which lecture/quiz
  materials exist for it. Click a row to jump back to notes filtered to that
  subtopic. This is the fastest way to see what you haven't reviewed yet.

Note: the course-material links (both in the editor and the coverage view)
are relative paths like `../lectures/...`, so they only resolve while
`index.html` stays in place inside the cloned repo (`notes-organizer/`). If
you move or download just this file elsewhere, note-taking still works fully
offline — only those particular links will 404.

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

Edit the `TOPICS` array in the `<script>` block of [`index.html`](index.html)
if the course outline changes or you want to add finer-grained subtopics.

## Lecture/quiz mapping

The `RESOURCES` array (also in the `<script>` block) maps each topic/subtopic
to the matching lecture folder and quiz problem set/solutions in this repo.
It was built from the actual lecture slide titles (not folder names) and each
quiz's stated textbook chapters, cross-referenced against the textbook's
table of contents — not guessed. It currently reflects the Summer 2026
offering's lecture order, since that's what's in this repo; a couple of
syllabus topics (Sets, Searching, Disk-Bound Data) have no matching lecture
yet, which the coverage view correctly shows as gaps. When Fall 2026 lecture
materials land in this repo, update the `path`/`label` values in `RESOURCES`
to match.

## Data

Notes are plain JSON objects (`id`, `title`, `topic`, `subtopic`, `tags`,
`content`, `pinned`, `createdAt`, `updatedAt`) stored under the
`cmpt225-fall26-notes-v1` key in `localStorage`. Use **Export JSON**
periodically to keep a backup outside the browser.
