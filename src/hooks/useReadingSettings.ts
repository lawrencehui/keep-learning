import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "learning.reading.v1";

export type FontKey = "newsreader" | "lora" | "sans" | "system";
export type SizeKey = "sm" | "md" | "lg" | "xl";
export type LineHeightKey = "snug" | "normal" | "relaxed";

export interface ReadingSettings {
  font: FontKey;
  size: SizeKey;
  lineHeight: LineHeightKey;
}

const DEFAULT: ReadingSettings = {
  font: "newsreader",
  size: "md",
  lineHeight: "normal",
};

export const FONT_STACKS: Record<FontKey, string> = {
  newsreader: '"Newsreader", Georgia, "Times New Roman", serif',
  lora: '"Lora", Georgia, "Times New Roman", serif',
  sans: '"Source Sans 3", Inter, system-ui, sans-serif',
  system:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
};

export const FONT_LABELS: Record<FontKey, string> = {
  newsreader: "Newsreader",
  lora: "Lora",
  sans: "Source Sans",
  system: "System",
};

export const SIZE_REM: Record<SizeKey, string> = {
  sm: "0.95rem",
  md: "1.0625rem",
  lg: "1.1875rem",
  xl: "1.3125rem",
};

export const SIZE_LABELS: Record<SizeKey, string> = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "X-Large",
};

export const LINE_HEIGHT_VAL: Record<LineHeightKey, string> = {
  snug: "1.55",
  normal: "1.7",
  relaxed: "1.95",
};

export const LINE_HEIGHT_LABELS: Record<LineHeightKey, string> = {
  snug: "Snug",
  normal: "Normal",
  relaxed: "Relaxed",
};

function load(): ReadingSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT, ...parsed };
  } catch {
    return DEFAULT;
  }
}

function applyToDom(s: ReadingSettings) {
  const root = document.documentElement;
  root.style.setProperty("--reading-font", FONT_STACKS[s.font]);
  root.style.setProperty("--reading-size", SIZE_REM[s.size]);
  root.style.setProperty("--reading-line-height", LINE_HEIGHT_VAL[s.lineHeight]);
}

export function useReadingSettings() {
  const [state, setState] = useState<ReadingSettings>(load);

  useEffect(() => {
    applyToDom(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const setFont = useCallback(
    (font: FontKey) => setState((s) => ({ ...s, font })),
    []
  );
  const setSize = useCallback(
    (size: SizeKey) => setState((s) => ({ ...s, size })),
    []
  );
  const setLineHeight = useCallback(
    (lineHeight: LineHeightKey) => setState((s) => ({ ...s, lineHeight })),
    []
  );
  const reset = useCallback(() => setState(DEFAULT), []);

  return { settings: state, setFont, setSize, setLineHeight, reset };
}

/** Apply once on app boot, before any UI mounts, to avoid a flash. */
export function bootApplyReadingSettings() {
  if (typeof document === "undefined") return;
  applyToDom(load());
}
