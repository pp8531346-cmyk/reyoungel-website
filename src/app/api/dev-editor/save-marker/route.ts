import { NextResponse } from "next/server";
import path from "path";
import { isDevEnvironment, escapeRegExp, readFileSafe, writeFileSafe, PROJECT_ROOT } from "@/dev-editor/server-utils";

type SaveMarkerBody = {
  code: string;
  id: string;
  x: number;
  y: number;
};

const CONTENT_FILE = path.join(PROJECT_ROOT, "src", "lib", "productShowcaseContent.ts");

/** Finds the `{ ... }` object literal containing `needle` (a `key: "value"` match), by
 * walking brace depth outward from that match — robust against nested object braces
 * inside the same block, and against reordered/commented fields around the needle. */
function findBlockContaining(content: string, needle: RegExp): { start: number; end: number } | null {
  const match = content.match(needle);
  if (!match || match.index === undefined) return null;
  const matchIndex = match.index;

  let depth = 0;
  let start = -1;
  for (let i = matchIndex; i >= 0; i--) {
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
  if (!body.code || !body.id || typeof body.x !== "number" || typeof body.y !== "number") {
    return NextResponse.json({ status: "invalid" as const });
  }

  const content = await readFileSafe(CONTENT_FILE);

  // `heroBoxes` (above showcaseEntries in this file) also has one `code: "<x>"`
  // per product, so the search has to start after showcaseEntries begins —
  // otherwise the first (wrong) `code` match wins and everything below silently
  // scopes to the wrong block.
  const showcaseEntriesStart = content.indexOf("showcaseEntries");
  if (showcaseEntriesStart === -1) {
    return NextResponse.json({ status: "not_found" as const });
  }
  const searchSpace = content.slice(showcaseEntriesStart);

  // Scope to the correct product entry first — marker `id`s are only unique
  // within their own product's markers array, not across the whole file.
  const entryInSearchSpace = findBlockContaining(
    searchSpace,
    new RegExp(`code:\\s*"${escapeRegExp(body.code)}"`),
  );
  if (!entryInSearchSpace) {
    return NextResponse.json({ status: "not_found" as const });
  }
  const entry = {
    start: entryInSearchSpace.start + showcaseEntriesStart,
    end: entryInSearchSpace.end + showcaseEntriesStart,
  };
  const entryBlock = content.slice(entry.start, entry.end);

  // Then, within that product's block, find the specific marker object by its
  // stable `id` — never by `label`, so editing the label text can never break
  // (or silently mis-target) a position save.
  const marker = findBlockContaining(entryBlock, new RegExp(`id:\\s*"${escapeRegExp(body.id)}"`));
  if (!marker) {
    return NextResponse.json({ status: "not_found" as const });
  }
  const markerBlock = entryBlock.slice(marker.start, marker.end);

  if (!/x:\s*[-\d.]+/.test(markerBlock) || !/y:\s*[-\d.]+/.test(markerBlock)) {
    return NextResponse.json({ status: "not_found" as const });
  }

  const x = Math.round(body.x * 10) / 10;
  const y = Math.round(body.y * 10) / 10;
  const updatedMarkerBlock = markerBlock
    .replace(/x:\s*[-\d.]+/, `x: ${x}`)
    .replace(/y:\s*[-\d.]+/, `y: ${y}`);

  const updatedEntryBlock =
    entryBlock.slice(0, marker.start) + updatedMarkerBlock + entryBlock.slice(marker.end);
  const updatedContent = content.slice(0, entry.start) + updatedEntryBlock + content.slice(entry.end);

  await writeFileSafe(CONTENT_FILE, updatedContent);
  return NextResponse.json({ status: "saved" as const });
}
