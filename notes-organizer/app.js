// CMPT 225 (Fall 2026) Notes Organizer
// Everything lives in localStorage, keyed by STORAGE_KEY, so notes persist
// across visits to this page but never leave the browser.

const STORAGE_KEY = 'cmpt225-fall26-notes-v1';

const TOPICS = [
  {
    id: 'oop',
    name: 'Object-Oriented Programming in Java',
    subtopics: [],
  },
  {
    id: 'adt',
    name: 'Abstract Data Types (ADTs)',
    subtopics: [],
  },
  {
    id: 'ds',
    name: 'Data Structures',
    subtopics: [
      'Lists',
      'Stacks',
      'Queues',
      'Sets',
      'Trees',
      'Binary Trees',
      'Binary Search Trees',
      'Self-Balancing Trees',
      'Priority Queues',
      'Heaps',
      'Hash Tables',
      'Disk-Bound Data',
    ],
  },
  {
    id: 'algo',
    name: 'Algorithms',
    subtopics: [
      'Searching',
      'Sorting',
      'Graph Traversing',
      'Recursion',
      'Divide and Conquer',
    ],
  },
  {
    id: 'analysis',
    name: 'Algorithm Efficiency',
    subtopics: ['Time Complexity', 'Space Complexity', 'Big-O Notation', 'Master Theorem'],
  },
  {
    id: 'other',
    name: 'Other',
    subtopics: [],
  },
];

const topicById = (id) => TOPICS.find((t) => t.id === id);

// ---------- storage ----------

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load notes', e);
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

let notes = loadNotes();
let activeNoteId = null;
let activeTopicFilter = 'all';
let searchQuery = '';

function uid() {
  return 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function upsertNote(note) {
  const idx = notes.findIndex((n) => n.id === note.id);
  if (idx === -1) notes.push(note);
  else notes[idx] = note;
  saveNotes(notes);
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id);
  saveNotes(notes);
  if (activeNoteId === id) activeNoteId = null;
}

// ---------- rendering ----------

const $ = (sel) => document.querySelector(sel);
const topicListEl = $('#topic-list');
const noteListEl = $('#note-list');
const searchInput = $('#search-input');
const emptyStateEl = $('#empty-state');
const editorEl = $('#editor');
const editorTitle = $('#editor-title');
const editorTopic = $('#editor-topic');
const editorSubtopic = $('#editor-subtopic');
const editorTags = $('#editor-tags');
const editorContent = $('#editor-content');
const editorPreview = $('#editor-preview');
const editorUpdated = $('#editor-updated');
const previewToggle = $('#preview-toggle');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// A small, dependency-free markdown-ish renderer: headers, bold/italic,
// inline code, fenced code blocks, bullet lists, and links.
function renderMarkdown(src) {
  const lines = escapeHtml(src).split('\n');
  let html = '';
  let inList = false;
  let inCode = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCode = !inCode;
      html += inCode ? '<pre><code>' : '</code></pre>';
      continue;
    }
    if (inCode) {
      html += line + '\n';
      continue;
    }
    const listMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (listMatch) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${inline(listMatch[1])}</li>`;
      continue;
    } else if (inList) {
      html += '</ul>';
      inList = false;
    }
    const headerMatch = line.match(/^(#{1,4})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length + 2; // h3..h6
      html += `<h${level}>${inline(headerMatch[2])}</h${level}>`;
      continue;
    }
    if (line.trim() === '') {
      html += '';
    } else {
      html += `<p>${inline(line)}</p>`;
    }
  }
  if (inList) html += '</ul>';
  if (inCode) html += '</code></pre>';
  return html;

  function inline(text) {
    return text
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
}

function formatDate(ts) {
  return new Date(ts).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderTopics() {
  const counts = { all: notes.length };
  for (const t of TOPICS) counts[t.id] = notes.filter((n) => n.topic === t.id).length;

  const items = [
    `<li class="topic-item ${activeTopicFilter === 'all' ? 'active' : ''}" data-topic="all">
       <span>All Notes</span><span class="count">${counts.all}</span>
     </li>`,
    ...TOPICS.map(
      (t) => `<li class="topic-item ${activeTopicFilter === t.id ? 'active' : ''}" data-topic="${t.id}">
         <span>${t.name}</span><span class="count">${counts[t.id]}</span>
       </li>`
    ),
  ];
  topicListEl.innerHTML = items.join('');
}

function filteredNotes() {
  let list = notes;
  if (activeTopicFilter !== 'all') {
    list = list.filter((n) => n.topic === activeTopicFilter);
  }
  const q = searchQuery.trim().toLowerCase();
  if (q) {
    list = list.filter((n) =>
      [n.title, n.content, n.subtopic, ...(n.tags || [])].join(' ').toLowerCase().includes(q)
    );
  }
  return list.slice().sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    return b.updatedAt - a.updatedAt;
  });
}

function snippet(content, len = 110) {
  const text = content.replace(/\n+/g, ' ').trim();
  return text.length > len ? text.slice(0, len) + '…' : text;
}

function renderNoteList() {
  const list = filteredNotes();
  if (list.length === 0) {
    noteListEl.innerHTML = '<li class="note-list-empty">No notes match.</li>';
    return;
  }
  noteListEl.innerHTML = list
    .map((n) => {
      const topic = topicById(n.topic);
      return `<li class="note-item ${n.id === activeNoteId ? 'active' : ''}" data-id="${n.id}">
        <div class="note-item-head">
          ${n.pinned ? '<span class="pin">★</span>' : ''}
          <span class="note-item-title">${escapeHtml(n.title || 'Untitled')}</span>
        </div>
        <div class="note-item-meta">
          <span class="badge">${topic ? escapeHtml(topic.name) : 'Uncategorized'}</span>
          ${n.subtopic ? `<span class="badge subtle">${escapeHtml(n.subtopic)}</span>` : ''}
        </div>
        <div class="note-item-snippet">${escapeHtml(snippet(n.content || ''))}</div>
        <div class="note-item-date">${formatDate(n.updatedAt)}</div>
      </li>`;
    })
    .join('');
}

function populateTopicSelect() {
  editorTopic.innerHTML = TOPICS.map((t) => `<option value="${t.id}">${t.name}</option>`).join('');
}

function populateSubtopicSelect(topicId, selected) {
  const topic = topicById(topicId);
  const subtopics = topic ? topic.subtopics : [];
  editorSubtopic.innerHTML =
    '<option value="">(none)</option>' +
    subtopics.map((s) => `<option value="${s}" ${s === selected ? 'selected' : ''}>${s}</option>`).join('');
  editorSubtopic.disabled = subtopics.length === 0;
}

function getActiveNote() {
  return notes.find((n) => n.id === activeNoteId) || null;
}

function renderEditor() {
  const note = getActiveNote();
  if (!note) {
    editorEl.classList.add('hidden');
    emptyStateEl.classList.remove('hidden');
    return;
  }
  emptyStateEl.classList.add('hidden');
  editorEl.classList.remove('hidden');

  editorTitle.value = note.title || '';
  populateTopicSelect();
  editorTopic.value = note.topic;
  populateSubtopicSelect(note.topic, note.subtopic);
  editorTags.value = (note.tags || []).join(', ');
  editorContent.value = note.content || '';
  editorUpdated.textContent = `Updated ${formatDate(note.updatedAt)}`;
  $('#pin-toggle').classList.toggle('active', !!note.pinned);
  updatePreview();
}

function updatePreview() {
  if (editorPreview.classList.contains('hidden')) return;
  editorPreview.innerHTML = renderMarkdown(editorContent.value || '*Nothing here yet.*');
}

function refreshAll() {
  renderTopics();
  renderNoteList();
  renderEditor();
}

// ---------- actions ----------

function newNote() {
  const note = {
    id: uid(),
    title: '',
    topic: activeTopicFilter !== 'all' ? activeTopicFilter : TOPICS[0].id,
    subtopic: '',
    tags: [],
    content: '',
    pinned: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  upsertNote(note);
  activeNoteId = note.id;
  refreshAll();
  editorTitle.focus();
}

function saveActiveNoteFromForm() {
  const note = getActiveNote();
  if (!note) return;
  note.title = editorTitle.value;
  note.topic = editorTopic.value;
  note.subtopic = editorSubtopic.value;
  note.tags = editorTags.value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  note.content = editorContent.value;
  note.updatedAt = Date.now();
  upsertNote(note);
  refreshAll();
}

function exportNotes() {
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cmpt225-fall26-notes-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importNotesFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      if (!Array.isArray(imported)) throw new Error('Not a list of notes');
      const existingIds = new Set(notes.map((n) => n.id));
      for (const n of imported) {
        if (!n.id || existingIds.has(n.id)) n.id = uid();
        n.topic = topicById(n.topic) ? n.topic : 'other';
        notes.push(n);
      }
      saveNotes(notes);
      refreshAll();
    } catch (e) {
      alert('Could not import that file: ' + e.message);
    }
  };
  reader.readAsText(file);
}

// ---------- events ----------

topicListEl.addEventListener('click', (e) => {
  const li = e.target.closest('.topic-item');
  if (!li) return;
  activeTopicFilter = li.dataset.topic;
  refreshAll();
});

noteListEl.addEventListener('click', (e) => {
  const li = e.target.closest('.note-item');
  if (!li) return;
  activeNoteId = li.dataset.id;
  refreshAll();
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderNoteList();
});

$('#new-note-btn').addEventListener('click', newNote);

$('#delete-note-btn').addEventListener('click', () => {
  const note = getActiveNote();
  if (!note) return;
  if (!confirm(`Delete "${note.title || 'Untitled'}"? This cannot be undone.`)) return;
  deleteNote(note.id);
  refreshAll();
});

$('#pin-toggle').addEventListener('click', () => {
  const note = getActiveNote();
  if (!note) return;
  note.pinned = !note.pinned;
  note.updatedAt = Date.now();
  upsertNote(note);
  refreshAll();
});

editorTopic.addEventListener('change', () => {
  populateSubtopicSelect(editorTopic.value, '');
  saveActiveNoteFromForm();
});

[editorTitle, editorSubtopic, editorTags].forEach((el) =>
  el.addEventListener('change', saveActiveNoteFromForm)
);

let saveTimer = null;
editorContent.addEventListener('input', () => {
  updatePreview();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveActiveNoteFromForm, 400);
});

previewToggle.addEventListener('click', () => {
  const showingPreview = !editorPreview.classList.contains('hidden');
  editorPreview.classList.toggle('hidden', showingPreview);
  editorContent.classList.toggle('hidden', !showingPreview);
  previewToggle.textContent = showingPreview ? 'Preview' : 'Edit';
  if (!showingPreview) updatePreview();
});

$('#export-btn').addEventListener('click', exportNotes);
$('#import-input').addEventListener('change', (e) => {
  if (e.target.files[0]) importNotesFromFile(e.target.files[0]);
  e.target.value = '';
});

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    saveActiveNoteFromForm();
  }
});

// ---------- init ----------

populateTopicSelect();
refreshAll();
