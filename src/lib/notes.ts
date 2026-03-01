import { Note, NoteFormData } from "./types";

const STORAGE_KEY = "second-brain-notes";

function generateId(): string {
  return crypto.randomUUID();
}

function generateSummary(content: string): string {
  const sentences = content.split(/[.!?]+/).filter(Boolean);
  return sentences.slice(0, 2).join(". ").trim() + (sentences.length > 2 ? "..." : "");
}

function autoGenerateTags(content: string, title: string): string[] {
  const text = `${title} ${content}`.toLowerCase();
  const tagMap: Record<string, string[]> = {
    "idea": ["idea", "concept", "brainstorm", "thought"],
    "research": ["research", "study", "paper", "findings"],
    "project": ["project", "build", "implement", "develop"],
    "learning": ["learn", "course", "tutorial", "lesson"],
    "reference": ["reference", "link", "resource", "bookmark"],
    "meeting": ["meeting", "discussion", "call", "sync"],
    "task": ["todo", "task", "action", "deadline"],
  };
  const detected: string[] = [];
  for (const [tag, keywords] of Object.entries(tagMap)) {
    if (keywords.some((kw) => text.includes(kw))) detected.push(tag);
  }
  return detected;
}

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getSampleNotes();
    const notes = JSON.parse(raw);
    return notes.map((n: any) => ({
      ...n,
      createdAt: new Date(n.createdAt),
      updatedAt: new Date(n.updatedAt),
    }));
  } catch {
    return getSampleNotes();
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function createNote(data: NoteFormData): Note {
  const autoTags = autoGenerateTags(data.content, data.title);
  const allTags = [...new Set([...data.tags, ...autoTags])];
  const now = new Date();
  return {
    id: generateId(),
    title: data.title,
    content: data.content,
    summary: generateSummary(data.content),
    sourceUrl: data.sourceUrl || undefined,
    tags: allTags,
    metadata: data.metadata,
    createdAt: now,
    updatedAt: now,
  };
}

export function deleteNote(notes: Note[], id: string): Note[] {
  return notes.filter((n) => n.id !== id);
}

export function searchNotes(notes: Note[], query: string): Note[] {
  if (!query.trim()) return notes;
  const q = query.toLowerCase();
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.summary?.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function filterByTag(notes: Note[], tag: string): Note[] {
  return notes.filter((n) => n.tags.includes(tag));
}

export function getAllTags(notes: Note[]): string[] {
  const tags = new Set<string>();
  notes.forEach((n) => n.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

function getSampleNotes(): Note[] {
  const samples: Note[] = [
    {
      id: generateId(),
      title: "The Future of AI-Assisted Knowledge Management",
      content: "AI is transforming how we capture, organize, and retrieve knowledge. Vector embeddings enable semantic search that understands meaning, not just keywords. This fundamentally changes how personal knowledge bases work — moving from folder hierarchies to fluid, interconnected webs of ideas.",
      summary: "AI transforms knowledge management through semantic search and vector embeddings...",
      tags: ["idea", "research", "ai"],
      createdAt: new Date(Date.now() - 86400000 * 2),
      updatedAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: generateId(),
      title: "Building with pgvector and PostgreSQL",
      content: "PostgreSQL with the pgvector extension provides a powerful foundation for AI applications. Store embeddings alongside your relational data. Use cosine similarity for semantic search. The combination of traditional SQL queries with vector operations opens up hybrid search patterns that outperform pure vector databases for many use cases.",
      summary: "pgvector enables powerful AI applications within PostgreSQL using cosine similarity...",
      sourceUrl: "https://github.com/pgvector/pgvector",
      tags: ["reference", "project", "research"],
      createdAt: new Date(Date.now() - 86400000 * 5),
      updatedAt: new Date(Date.now() - 86400000 * 3),
    },
    {
      id: generateId(),
      title: "Design Principles for AI-Native Apps",
      content: "Three core principles: 1) AI should be assistive, not intrusive — enhance user workflows without taking over. 2) Transparency — always show when content is AI-generated. 3) Progressive enhancement — the app should work without AI, AI makes it better. These principles ensure trust and usability.",
      summary: "Three core AI design principles: assistive not intrusive, transparency, progressive enhancement...",
      tags: ["idea", "learning"],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(Date.now() - 86400000),
    },
    {
      id: generateId(),
      title: "Weekly Review: Project Architecture Decisions",
      content: "Decided on a modular architecture with clear separation between UI, API services, and database layers. The AI abstraction layer (lib/ai.ts) ensures we can swap providers without touching business logic. API-first design enables the embeddable widget and future integrations.",
      summary: "Modular architecture with AI abstraction layer for provider flexibility...",
      tags: ["meeting", "project"],
      createdAt: new Date(Date.now() - 86400000 * 7),
      updatedAt: new Date(Date.now() - 86400000 * 4),
    },
  ];
  saveNotes(samples);
  return samples;
}
