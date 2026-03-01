import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Note, NoteFormData } from "@/lib/types";
import { loadNotes, saveNotes, createNote, deleteNote as removeNote, searchNotes, filterByTag, getAllTags } from "@/lib/notes";

interface NotesContextType {
  notes: Note[];
  filteredNotes: Note[];
  allTags: string[];
  searchQuery: string;
  activeTag: string | null;
  sortBy: "newest" | "oldest";
  setSearchQuery: (q: string) => void;
  setActiveTag: (tag: string | null) => void;
  setSortBy: (s: "newest" | "oldest") => void;
  addNote: (data: NoteFormData) => Note;
  removeNoteById: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const allTags = getAllTags(notes);

  const filteredNotes = React.useMemo(() => {
    let result = searchQuery ? searchNotes(notes, searchQuery) : notes;
    if (activeTag) result = filterByTag(result, activeTag);
    result = [...result].sort((a, b) =>
      sortBy === "newest"
        ? b.createdAt.getTime() - a.createdAt.getTime()
        : a.createdAt.getTime() - b.createdAt.getTime()
    );
    return result;
  }, [notes, searchQuery, activeTag, sortBy]);

  const addNote = useCallback((data: NoteFormData) => {
    const note = createNote(data);
    setNotes((prev) => [note, ...prev]);
    return note;
  }, []);

  const removeNoteById = useCallback((id: string) => {
    setNotes((prev) => removeNote(prev, id));
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, filteredNotes, allTags, searchQuery, activeTag, sortBy, setSearchQuery, setActiveTag, setSortBy, addNote, removeNoteById }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}
