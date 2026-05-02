import { useRegisterSW } from "virtual:pwa-register/react";
import { RefreshCw, X } from "lucide-react";

// Poll for SW updates this often (in addition to the browser's own checks
// on page load). One hour balances battery / network against staleness.
const UPDATE_POLL_MS = 60 * 60 * 1000;

export function UpdateBanner() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      // Periodically ask the browser to check for a new SW. This drives the
      // `needRefresh` state used below. No-op if a new version is already
      // pending or the user is offline.
      window.setInterval(() => {
        registration.update().catch(() => {
          // Network errors here are expected when offline; ignore.
        });
      }, UPDATE_POLL_MS);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="bg-accent/15 border-b border-accent/40 text-ink-100">
      <div className="flex items-center gap-2 px-3 py-2 text-[13px] sm:text-sm">
        <RefreshCw className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
        <span className="flex-1 min-w-0 truncate">
          New version available
        </span>
        <button
          onClick={() => updateServiceWorker(true)}
          className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-white hover:opacity-90 shrink-0"
        >
          Update
        </button>
        <button
          onClick={() => setNeedRefresh(false)}
          aria-label="Dismiss"
          className="p-1.5 rounded text-ink-400 hover:text-ink-100 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
