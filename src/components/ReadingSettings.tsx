import { useEffect, useRef, useState } from "react";
import { Type, Check } from "lucide-react";
import {
  useReadingSettings,
  FONT_LABELS,
  FONT_STACKS,
  SIZE_LABELS,
  LINE_HEIGHT_LABELS,
  type FontKey,
  type SizeKey,
  type LineHeightKey,
} from "../hooks/useReadingSettings";

const FONT_OPTIONS: FontKey[] = ["newsreader", "lora", "sans", "system"];
const SIZE_OPTIONS: SizeKey[] = ["sm", "md", "lg", "xl"];
const LINE_HEIGHT_OPTIONS: LineHeightKey[] = ["snug", "normal", "relaxed"];

export function ReadingSettings() {
  const [open, setOpen] = useState(false);
  const { settings, setFont, setSize, setLineHeight } = useReadingSettings();
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (popoverRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Reading settings"
        aria-expanded={open}
        className="p-2 rounded-lg text-ink-300 hover:text-ink-100 hover:bg-ink-800/60"
      >
        <Type className="w-5 h-5" />
      </button>

      {open && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Reading settings"
          className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-1.5rem))] z-50 card !bg-ink-900/85 p-3 space-y-4 shadow-2xl"
        >
          <Section title="Font">
            <div className="grid grid-cols-2 gap-1.5">
              {FONT_OPTIONS.map((f) => (
                <OptionButton
                  key={f}
                  selected={settings.font === f}
                  onClick={() => setFont(f)}
                  style={{ fontFamily: FONT_STACKS[f] }}
                >
                  {FONT_LABELS[f]}
                </OptionButton>
              ))}
            </div>
          </Section>

          <Section title="Size">
            <div className="grid grid-cols-4 gap-1.5">
              {SIZE_OPTIONS.map((s) => (
                <OptionButton
                  key={s}
                  selected={settings.size === s}
                  onClick={() => setSize(s)}
                >
                  <span className={sizePreviewClass(s)}>A</span>
                </OptionButton>
              ))}
            </div>
            <div className="mt-1 text-[11px] text-ink-400 text-center">
              {SIZE_LABELS[settings.size]}
            </div>
          </Section>

          <Section title="Line spacing">
            <div className="grid grid-cols-3 gap-1.5">
              {LINE_HEIGHT_OPTIONS.map((lh) => (
                <OptionButton
                  key={lh}
                  selected={settings.lineHeight === lh}
                  onClick={() => setLineHeight(lh)}
                >
                  {LINE_HEIGHT_LABELS[lh]}
                </OptionButton>
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-ink-400 mb-1.5">
        {title}
      </div>
      {children}
    </div>
  );
}

function OptionButton({
  selected,
  onClick,
  children,
  style,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`relative px-2.5 py-2 rounded-lg text-sm border transition ${
        selected
          ? "border-accent bg-accent/10 text-ink-50"
          : "border-ink-800 text-ink-200 hover:bg-ink-800/60"
      }`}
    >
      {children}
      {selected && (
        <Check className="absolute top-1 right-1 w-3 h-3 text-accent-soft" />
      )}
    </button>
  );
}

function sizePreviewClass(s: SizeKey): string {
  switch (s) {
    case "sm":
      return "text-xs";
    case "md":
      return "text-sm";
    case "lg":
      return "text-base";
    case "xl":
      return "text-lg";
  }
}
