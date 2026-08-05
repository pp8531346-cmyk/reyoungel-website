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

/** Builds a whitespace-tolerant regex from a literal string — handles JSX text
 * whose source spans multiple indented lines but renders with collapsed whitespace. */
export function buildFuzzyTextMatcher(literal: string): RegExp {
  const escaped = literal.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = escaped.replace(/\s+/g, "\\s+");
  return new RegExp(pattern);
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
