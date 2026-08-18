import { promises as fs } from "fs";
import path from "path";

export const PROJECT_ROOT = process.cwd();
export const SRC_DIR = path.join(PROJECT_ROOT, "src");
export const PUBLIC_DIR = path.join(PROJECT_ROOT, "public");

const SOURCE_EXTENSIONS = new Set([".tsx", ".ts"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);

export function isDevEnvironment() {
  return process.env.NODE_ENV === "development";
}

/** Resolves a path and throws if it escapes src/ or public/ — refuses to write anywhere else. */
export function assertInsideProject(targetPath: string) {
  const resolved = path.resolve(targetPath);
  const insideSrc = resolved.startsWith(SRC_DIR + path.sep);
  const insidePublic = resolved.startsWith(PUBLIC_DIR + path.sep);
  if (!insideSrc && !insidePublic) {
    throw new Error(`Refusing to write outside src/ or public/: ${resolved}`);
  }
  return resolved;
}

export async function listSourceFiles(): Promise<string[]> {
  const results: string[] = [];
  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
        results.push(full);
      }
    }
  }
  await walk(SRC_DIR);
  return results;
}

export function toRelative(absolutePath: string) {
  return path.relative(PROJECT_ROOT, absolutePath).split(path.sep).join("/");
}

export function escapeRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function readFileSafe(absolutePath: string) {
  return fs.readFile(absolutePath, "utf-8");
}

export async function writeFileSafe(absolutePath: string, content: string) {
  assertInsideProject(absolutePath);
  await fs.writeFile(absolutePath, content, "utf-8");
}

/** A `data-edit-id` is `"<file relative to project root>#<slug>"` — self-contained,
 * so the client never needs a separate id-to-file lookup table. */
export function parseEditId(editId: string): { file: string; slug: string } | null {
  const hashIndex = editId.indexOf("#");
  if (hashIndex === -1) return null;
  return { file: editId.slice(0, hashIndex), slug: editId.slice(hashIndex + 1) };
}

// The trailing `\}?` swallows the closing brace of a JSX comment container
// (`{/* @edit:slug */}`) so it isn't mistaken for the start of the editable
// content that follows. Plain block comments in .ts array/prop literals have
// no such brace, so it just doesn't match there — harmless either way.
function markerRegex(slug: string): RegExp {
  return new RegExp(`/\\*\\s*@edit:${escapeRegExp(slug)}\\s*\\*/\\}?`);
}

/** True if the marker for `slug` appears more than once in `content` — every slug must
 * be unique within its own file, since the marker alone (not old-text) locates the edit. */
export function isMarkerAmbiguous(content: string, slug: string): boolean {
  const matches = content.match(new RegExp(markerRegex(slug).source, "g"));
  return (matches?.length ?? 0) > 1;
}

/**
 * Locates the literal immediately following an `/* @edit:<slug> *\/` marker comment and
 * splices in `newText` — purely structural (marker position), no text-content matching,
 * so it can't be confused by whitespace differences or duplicate strings elsewhere.
 * Handles two shapes:
 *   - a quoted string literal right after the marker (array/prop values in .ts/.tsx)
 *   - a raw JSX text run right after the marker, up to the next `<` or `{`
 */
export function replaceAfterMarker(
  content: string,
  slug: string,
  newText: string,
): { ok: true; content: string } | { ok: false } {
  const match = content.match(markerRegex(slug));
  if (!match || match.index === undefined) return { ok: false };

  let i = match.index + match[0].length;
  while (i < content.length && /\s/.test(content[i])) i++;

  const quoteChars = new Set(['"', "'", "`"]);
  const ch = content[i];

  if (ch !== undefined && quoteChars.has(ch)) {
    const quote = ch;
    let j = i + 1;
    while (j < content.length && content[j] !== quote) {
      if (content[j] === "\\") j++;
      j++;
    }
    if (j >= content.length) return { ok: false };
    const escaped = newText.replace(/\\/g, "\\\\").replace(new RegExp(quote, "g"), "\\" + quote);
    return { ok: true, content: content.slice(0, i + 1) + escaped + content.slice(j) };
  }

  // Raw JSX text run: scan to the next tag/expression boundary, then trim trailing
  // whitespace off the run so the original indentation before that boundary survives.
  let j = i;
  while (j < content.length && content[j] !== "<" && content[j] !== "{") j++;
  if (j >= content.length) return { ok: false };
  let end = j;
  while (end > i && /\s/.test(content[end - 1])) end--;

  return { ok: true, content: content.slice(0, i) + newText + content.slice(end) };
}
