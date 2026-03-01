import { motion } from "framer-motion";
import { BookOpen, Brain, Shield, Layers, Zap, Globe } from "lucide-react";

const sections = [
  {
    icon: Layers,
    title: "Portable Architecture",
    content: `Clean separation between UI, API services, and database layers. The AI abstraction layer (lib/ai.ts) ensures provider swapping without touching business logic. Each layer communicates through well-defined interfaces.

**Layers:**
- **UI Layer** — React components, pages, and hooks
- **Service Layer** — Business logic and data transformation
- **Data Layer** — Storage abstraction (localStorage → Supabase)
- **AI Layer** — Provider-agnostic AI operations`,
  },
  {
    icon: Brain,
    title: "UX Principles",
    content: `**1. AI is Assistive, Not Intrusive**
AI enhances workflows without taking over. Summaries and tags are suggestions, not replacements.

**2. Transparency of AI-Generated Content**
AI-generated summaries are clearly marked with the ✨ icon. Users always know what's human vs. machine.

**3. Progressive Enhancement**
The app works fully without AI. Semantic search, auto-tagging, and summaries are additive layers.

**4. Fast Perceived Performance**
Optimistic UI updates, smooth animations, and instant local operations ensure snappy interactions.

**5. Minimal Cognitive Load**
Clean interface, consistent patterns, and smart defaults reduce decision fatigue.`,
  },
  {
    icon: Zap,
    title: "Agent Thinking",
    content: `Background intelligence that works for you:

- **Re-analysis** — Periodically reviews older notes to improve tags and summaries
- **Connection Detection** — Identifies related notes across your knowledge base
- **Suggestion Engine** — Proposes connections, follow-ups, and knowledge gaps
- **Embedding Refresh** — Updates vector representations as context evolves`,
  },
  {
    icon: Globe,
    title: "Infrastructure Mindset",
    content: `**API-First Design**
All operations are available through REST endpoints, enabling integrations and automation.

**Endpoints:**
- \`GET /api/public/notes\` — Retrieve notes with pagination
- \`POST /api/public/query\` — Conversational AI query against your knowledge base

**Embeddable Widget**
Drop a single script tag to embed a query interface on any website:
\`\`\`html
<script src="/widget.js" data-brain-id="your-id"></script>
\`\`\``,
  },
  {
    icon: Shield,
    title: "Security",
    content: `- All AI calls are server-side only — API keys never reach the client
- Environment variables for all secrets
- Rate limiting on public endpoints
- Input validation with Zod schemas
- Row-level security when using Supabase`,
  },
];

export default function DocsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Architecture Docs</h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Design decisions, principles, and technical architecture behind the Second Brain application.
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <section.icon className="w-4 h-4 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="text-sm text-secondary-foreground leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Database Schema */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-xl p-6 mt-6"
      >
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Database Schema (Prisma)</h2>
        <pre className="text-xs text-secondary-foreground bg-background rounded-lg p-4 overflow-x-auto font-mono leading-relaxed">
{`model Note {
  id        String   @id @default(uuid())
  title     String
  content   String
  summary   String?
  sourceUrl String?
  tags      String[]
  metadata  Json?
  embedding Float[]  // pgvector
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`}
        </pre>
      </motion.div>
    </motion.div>
  );
}
