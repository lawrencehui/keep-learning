import { BlockMath, InlineMath } from "react-katex";

/**
 * Render text containing inline `$...$` and block `$$...$$` LaTeX.
 * Splits the text and feeds math segments to KaTeX.
 */
export function MathText({ children }: { children: string }) {
  const parts = splitMath(children);
  return (
    <span>
      {parts.map((p, i) => {
        if (p.kind === "text") return <span key={i}>{p.value}</span>;
        if (p.kind === "inline") return <InlineMath key={i} math={p.value} />;
        return (
          <span key={i} className="block">
            <BlockMath math={p.value} />
          </span>
        );
      })}
    </span>
  );
}

type Part = { kind: "text" | "inline" | "block"; value: string };

function splitMath(input: string): Part[] {
  const out: Part[] = [];
  let i = 0;
  while (i < input.length) {
    // block $$...$$
    if (input.startsWith("$$", i)) {
      const end = input.indexOf("$$", i + 2);
      if (end === -1) {
        out.push({ kind: "text", value: input.slice(i) });
        break;
      }
      out.push({ kind: "block", value: input.slice(i + 2, end) });
      i = end + 2;
      continue;
    }
    // inline $...$
    if (input[i] === "$") {
      const end = input.indexOf("$", i + 1);
      if (end === -1) {
        out.push({ kind: "text", value: input.slice(i) });
        break;
      }
      out.push({ kind: "inline", value: input.slice(i + 1, end) });
      i = end + 1;
      continue;
    }
    // plain text up to next $
    const next = input.indexOf("$", i);
    if (next === -1) {
      out.push({ kind: "text", value: input.slice(i) });
      break;
    }
    out.push({ kind: "text", value: input.slice(i, next) });
    i = next;
  }
  return out;
}
