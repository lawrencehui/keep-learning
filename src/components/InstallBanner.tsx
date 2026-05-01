import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

const STORAGE_KEY = "learning.install-banner.v1";
const COOLDOWN_DAYS = 30;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari exposes its own flag
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(navigator as unknown as { MSStream?: unknown }).MSStream
  );
}

function recentlyDismissed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { dismissedAt } = JSON.parse(raw) as { dismissedAt?: number };
    if (typeof dismissedAt !== "number") return false;
    const days = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return days < COOLDOWN_DAYS;
  } catch {
    return false;
  }
}

export function InstallBanner() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const ios = typeof navigator !== "undefined" && isIOS();

  useEffect(() => {
    if (isStandalone() || recentlyDismissed()) return;

    // iOS Safari has no install API — show static instructions.
    if (ios) {
      setShow(true);
      return;
    }

    // Chrome/Edge/Android: wait for the prompt event.
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    const onInstalled = () => {
      setShow(false);
      setPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [ios]);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ dismissedAt: Date.now() })
      );
    } catch {
      // Silently ignore storage failures (Safari private mode).
    }
    setShow(false);
  };

  const install = async () => {
    if (!prompt) return;
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") setShow(false);
      else dismiss();
    } catch {
      dismiss();
    }
  };

  return (
    <div className="bg-ink-900/95 backdrop-blur border-b border-ink-800 text-ink-100">
      <div className="flex items-center gap-3 px-4 py-2 text-sm pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.5rem,env(safe-area-inset-top))]">
        <Download className="w-4 h-4 text-accent-soft shrink-0" aria-hidden="true" />
        {ios ? (
          <span className="flex-1 min-w-0 truncate">
            Install: tap <strong>Share</strong> → <strong>Add to Home Screen</strong>
          </span>
        ) : (
          <span className="flex-1 min-w-0 truncate">Install for offline reading</span>
        )}
        {!ios && prompt && (
          <button
            onClick={install}
            className="text-xs font-medium px-3 py-1 rounded-full bg-accent text-ink-950 hover:opacity-90 shrink-0"
          >
            Install
          </button>
        )}
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="p-1.5 -m-1 rounded text-ink-400 hover:text-ink-200 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
