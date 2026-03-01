import { Link, useLocation } from "react-router-dom";
import { Brain, Plus, LayoutDashboard, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/capture", label: "Capture", icon: Plus },
  { to: "/docs", label: "Docs", icon: BookOpen },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-border/50 flex flex-col z-50">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center glow-border group-hover:glow-sm transition-shadow">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-foreground">Second Brain</h1>
            <p className="text-xs text-muted-foreground">AI-powered knowledge</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-secondary"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <item.icon
                className={`relative z-10 w-4 h-4 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                }`}
              />
              <span
                className={`relative z-10 transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-lg bg-secondary/50 border border-border/30">
        <p className="text-xs text-muted-foreground">
          <span className="text-primary font-medium">AI-Ready</span> — Enable Lovable Cloud for semantic search, auto-tagging & conversational queries.
        </p>
      </div>
    </aside>
  );
}
