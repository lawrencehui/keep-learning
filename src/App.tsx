import { useEffect, useState } from "react";
import { Route, Routes, useLocation, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { ModulePage } from "./pages/ModulePage";
import { ChapterPage } from "./pages/ChapterPage";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <Sidebar mobile open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col">
        <MobileTopBar onOpenMenu={() => setDrawerOpen(true)} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/m/:moduleId" element={<ModulePage />} />
          <Route path="/m/:moduleId/c/:chapterId" element={<ChapterPage />} />
        </Routes>
      </main>
    </div>
  );
}

function MobileTopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div className="md:hidden sticky top-0 z-30 bg-ink-950/85 backdrop-blur border-b border-ink-800 safe-pt">
      <div className="flex items-center gap-3 px-3 py-2.5">
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="p-2 -ml-1 rounded-lg text-ink-200 hover:bg-ink-900 active:bg-ink-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl">ψ</span>
          <span className="font-serif italic text-base leading-none">
            keep-learning
          </span>
        </NavLink>
      </div>
    </div>
  );
}
