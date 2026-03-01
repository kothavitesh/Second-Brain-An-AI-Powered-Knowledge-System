import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useNotes } from "@/hooks/use-notes";
import { NoteFormData } from "@/lib/types";
import { aiSummarize, aiAutoTag } from "@/lib/ai";
import { Save, X, Plus, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CapturePage() {
  const { addNote } = useNotes();
  const navigate = useNavigate();
  const [form, setForm] = useState<NoteFormData>({
    title: "",
    content: "",
    sourceUrl: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleAISummarize = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Add a title and content first");
      return;
    }
    setAiLoading("summarize");
    try {
      const summary = await aiSummarize(form.title, form.content);
      setAiSummary(summary);
      toast.success("AI summary generated!");
    } catch (e: any) {
      toast.error(e.message || "Failed to summarize");
    } finally {
      setAiLoading(null);
    }
  };

  const handleAIAutoTag = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Add a title and content first");
      return;
    }
    setAiLoading("tags");
    try {
      const tags = await aiAutoTag(form.title, form.content);
      const merged = [...new Set([...form.tags, ...tags])];
      setForm((prev) => ({ ...prev, tags: merged }));
      toast.success(`AI suggested ${tags.length} tags!`);
    } catch (e: any) {
      toast.error(e.message || "Failed to generate tags");
    } finally {
      setAiLoading(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    const note = addNote({
      ...form,
      metadata: aiSummary ? { aiSummary } : undefined,
    });
    toast.success("Note captured!", {
      description: `"${note.title}" saved with ${note.tags.length} tags`,
    });
    navigate("/");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Capture Knowledge</h1>
        <p className="text-muted-foreground">Add a new thought, reference, or idea. Use AI to auto-summarize and tag.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-xl p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="What's this about?"
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content <span className="text-muted-foreground font-normal">(Markdown supported)</span>
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((p) => ({ ...p, content: e.target.value }))}
              placeholder="Write your notes, ideas, or paste content here..."
              rows={8}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm resize-y font-body leading-relaxed"
            />
          </div>

          {/* AI Actions */}
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleAISummarize}
              disabled={!!aiLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50 border border-primary/20"
            >
              {aiLoading === "summarize" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              AI Summarize
            </button>
            <button
              type="button"
              onClick={handleAIAutoTag}
              disabled={!!aiLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50 border border-primary/20"
            >
              {aiLoading === "tags" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              AI Auto-Tag
            </button>
          </div>

          {/* AI Summary Preview */}
          {aiSummary && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="rounded-lg bg-primary/5 border border-primary/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">AI Summary</span>
              </div>
              <p className="text-sm text-secondary-foreground">{aiSummary}</p>
            </motion.div>
          )}

          {/* Source URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Source URL <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={form.sourceUrl}
              onChange={(e) => setForm((p) => ({ ...p, sourceUrl: e.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-tag text-tag-foreground">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 text-sm"
              />
              <button type="button" onClick={handleAddTag} className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors glow-sm">
            <Save className="w-4 h-4" />
            Save Note
          </button>
          <button type="button" onClick={() => navigate("/")} className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
