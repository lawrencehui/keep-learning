import { useEffect, useState } from "react";
import { Route, Routes, useLocation, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { ThemeToggle } from "./components/ThemeToggle";
import { InstallBanner } from "./components/InstallBanner";
import { ReadingSettings } from "./components/ReadingSettings";
import { Dashboard } from "./pages/Dashboard";
import { ModulePage } from "./pages/ModulePage";
import { ChapterPage } from "./pages/ChapterPage";
import { useSidebarCollapsed } from "./hooks/useSidebar";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { collapsed, toggle: toggleCollapsed } = useSidebarCollapsed();
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
      <Sidebar collapsed={collapsed} onToggleCollapsed={toggleCollapsed} />
      <Sidebar mobile open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main className="flex-1 min-w-0 max-w-full overflow-x-clip flex flex-col">
        <InstallBanner />
        <MobileTopBar onOpenMenu={() => setDrawerOpen(true)} />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/module/:moduleId" element={<ModulePage />} />
          <Route
            path="/module/:moduleId/chapter/:chapterId"
            element={<ChapterPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

function MobileTopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div className="md:hidden sticky top-0 z-30 bg-ink-950/85 backdrop-blur border-b border-ink-800">
      <div className="flex items-center gap-3 px-4 pb-2.5 pt-[max(0.625rem,env(safe-area-inset-top))]">
        <button
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="p-2 -ml-1 rounded-lg text-ink-200 hover:bg-ink-800 active:bg-ink-700"
        >
          <Menu className="w-5 h-5" />
        </button>
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl">ψ</span>
          <span className="font-serif italic text-base leading-none">
            keep-learning
          </span>
        </NavLink>
        <div className="ml-auto flex items-center gap-1 -mr-1">
          <ReadingSettings />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
