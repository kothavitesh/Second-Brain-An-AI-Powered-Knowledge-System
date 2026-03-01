import { Search, SlidersHorizontal } from "lucide-react";
import { useNotes } from "@/hooks/use-notes";

export function SearchBar() {
  const { searchQuery, setSearchQuery, allTags, activeTag, setActiveTag, sortBy, setSortBy } = useNotes();

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-body text-sm"
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="bg-secondary/50 border border-border/50 rounded-lg px-2.5 py-1.5 text-xs text-secondary-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        <div className="h-4 w-px bg-border/50" />

        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              !activeTag
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-tag text-tag-foreground hover:bg-primary/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
