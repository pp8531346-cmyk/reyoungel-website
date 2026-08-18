import { NextResponse } from "next/server";
import {
  isDevEnvironment,
  readFileSafe,
  writeFileSafe,
  PROJECT_ROOT,
  parseEditId,
  replaceAfterMarker,
  isMarkerAmbiguous,
} from "@/dev-editor/server-utils";
import path from "path";

type SaveTextBody = {
  newText: string;
  /** `"<file>#<slug>"` — the only way a save is located. Structural (marker
   * position), not content-based, so it's immune to whitespace drift, line-break
   * changes, word reordering, or embedded inline elements. The client only ever
   * starts an edit session on a node that carries this directly (see
   * DevEditorOverlay's resolveEditableText), so it's always present here. */
  editId: string;
};

export async function POST(request: Request) {
  if (!isDevEnvironment()) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const body = (await request.json()) as SaveTextBody;
  const newText = body.newText ?? "";

  const parsed = body.editId ? parseEditId(body.editId) : null;
  if (!parsed) {
    return NextResponse.json({ status: "not_found" as const });
  }

  const absolute = path.join(PROJECT_ROOT, parsed.file);
  let content: string;
  try {
    content = await readFileSafe(absolute);
  } catch {
    return NextResponse.json({ status: "not_found" as const });
  }

  if (isMarkerAmbiguous(content, parsed.slug)) {
    return NextResponse.json({
      status: "error" as const,
      message: `Marker "${parsed.slug}" appears more than once in ${parsed.file} — fix the duplicate marker in source`,
    });
  }

  const result = replaceAfterMarker(content, parsed.slug, newText);
  if (!result.ok) {
    return NextResponse.json({ status: "not_found" as const });
  }

  await writeFileSafe(absolute, result.content);
  return NextResponse.json({ status: "saved" as const, file: parsed.file });
}
