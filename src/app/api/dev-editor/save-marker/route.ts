import { NextResponse } from "next/server";
import path from "path";
import { isDevEnvironment, escapeRegExp, readFileSafe, writeFileSafe, PROJECT_ROOT } from "@/dev-editor/server-utils";

type SaveMarkerBody = {
  code: string;
  label: string;
  x: number;
  y: number;
};

const CONTENT_FILE = path.join(PROJECT_ROOT, "src", "lib", "productShowcaseContent.ts");

/** Finds the `{ ... }` object literal that contains `code: "<code>"`, by walking
 * brace depth outward from that match — robust against the nested marker-array
 * braces inside the same entry, unlike a naive regex. */
function findEntryBlock(content: string, code: string): { start: number; end: number } | null {
  const codeMatch = content.match(new RegExp(`code:\\s*"${escapeRegExp(code)}"`));
  if (!codeMatch || codeMatch.index === undefined) return null;
  const codeIndex = codeMatch.index;

  let depth = 0;
  let start = -1;
  for (let i = codeIndex; i >= 0; i--) {
    const ch = content[i];
    if (ch === "}") depth++;
    else if (ch === "{") {
      if (depth === 0) {
        start = i;
        break;
      }
      depth--;
    }
  }
  if (start === -1) return null;

  depth = 1;
  let end = -1;
  for (let i = start + 1; i < content.length; i++) {
    const ch = content[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) return null;

  return { start, end };
}

export async function POST(request: Request) {
  if (!isDevEnvironment()) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const body = (await request.json()) as SaveMarkerBody;
  if (!body.code || !body.label || typeof body.x !== "number" || typeof body.y !== "number") {
    return NextResponse.json({ status: "invalid" as const });
  }

  const content = await readFileSafe(CONTENT_FILE);
  const entry = findEntryBlock(content, body.code);
  if (!entry) {
    return NextResponse.json({ status: "not_found" as const });
  }

  const block = content.slice(entry.start, entry.end);
  const markerPattern = new RegExp(
    `(\\{\\s*label:\\s*"${escapeRegExp(body.label)}"\\s*,\\s*x:\\s*)[-\\d.]+(\\s*,\\s*y:\\s*)[-\\d.]+(\\s*\\})`,
  );
  if (!markerPattern.test(block)) {
    return NextResponse.json({ status: "not_found" as const });
  }

  const x = Math.round(body.x * 10) / 10;
  const y = Math.round(body.y * 10) / 10;
  const updatedBlock = block.replace(markerPattern, (_m, pre, mid, post) => `${pre}${x}${mid}${y}${post}`);
  const updatedContent = content.slice(0, entry.start) + updatedBlock + content.slice(entry.end);

  await writeFileSafe(CONTENT_FILE, updatedContent);
  return NextResponse.json({ status: "saved" as const });
}
