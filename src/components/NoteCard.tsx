import { motion } from "framer-motion";
import { Note } from "@/lib/types";
import { ExternalLink, Trash2, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  note: Note;
  index: number;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, index, onDelete }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group glass rounded-xl p-5 hover:glow-border transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-semibold text-foreground leading-tight line-clamp-2 flex-1 pr-2">
          {note.title}
        </h3>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {note.sourceUrl && (
            <a
              href={note.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {note.summary && (
        <div className="flex items-start gap-2 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {note.summary}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-tag text-tag-foreground"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded-full text-xs text-muted-foreground">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(note.createdAt, { addSuffix: true })}
        </span>
      </div>
    </motion.div>
  );
}
