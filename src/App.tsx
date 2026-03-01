import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotesProvider } from "@/hooks/use-notes";
import { AppSidebar } from "@/components/AppSidebar";
import { AIChatPanel } from "@/components/AIChatPanel";
import Dashboard from "./pages/Dashboard";
import Capture from "./pages/Capture";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NotesProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <main className="flex-1 ml-64 p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/capture" element={<Capture />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <AIChatPanel />
          </div>
        </NotesProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
