import { motion } from "framer-motion";
import { useNotes } from "@/hooks/use-notes";
import { SearchBar } from "@/components/SearchBar";
import { NoteCard } from "@/components/NoteCard";
import { Brain, Plus, Inbox } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { filteredNotes, notes, removeNoteById } = useNotes();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">
            Knowledge Base
          </h1>
          <p className="text-muted-foreground">
            {notes.length} note{notes.length !== 1 ? "s" : ""} captured
          </p>
        </div>
        <Link
          to="/capture"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-sm"
        >
          <Plus className="w-4 h-4" />
          Capture
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Notes", value: notes.length, icon: Brain },
          { label: "Tags Used", value: new Set(notes.flatMap((n) => n.tags)).size, icon: Brain },
          { label: "This Week", value: notes.filter((n) => n.createdAt > new Date(Date.now() - 7 * 86400000)).length, icon: Brain },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <SearchBar />

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note, i) => (
            <NoteCard key={note.id} note={note} index={i} onDelete={removeNoteById} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">No notes found</h3>
          <p className="text-muted-foreground text-sm mb-6">
            {notes.length === 0
              ? "Start capturing your knowledge"
              : "Try adjusting your search or filters"}
          </p>
          {notes.length === 0 && (
            <Link
              to="/capture"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium"
            >
              <Plus className="w-4 h-4" />
              Capture your first note
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
}
