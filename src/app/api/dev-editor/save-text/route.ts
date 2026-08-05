import { NextResponse } from "next/server";
import {
  isDevEnvironment,
  listSourceFiles,
  toRelative,
  buildFuzzyTextMatcher,
  readFileSafe,
  writeFileSafe,
  PROJECT_ROOT,
} from "@/dev-editor/server-utils";
import path from "path";

type SaveTextBody = {
  oldText: string;
  newText: string;
  fileHint?: string;
};

async function findMatches(oldText: string) {
  const matcher = buildFuzzyTextMatcher(oldText);
  const files = await listSourceFiles();
  const hits: { file: string; matches: number }[] = [];
  for (const file of files) {
    const content = await readFileSafe(file);
    const count = content.match(new RegExp(matcher.source, "g"))?.length ?? 0;
    if (count > 0) hits.push({ file: toRelative(file), matches: count });
  }
  return hits;
}

async function applyReplacement(relativeFile: string, oldText: string, newText: string) {
  const absolute = path.join(PROJECT_ROOT, relativeFile);
  const content = await readFileSafe(absolute);
  const matcher = buildFuzzyTextMatcher(oldText);
  if (!matcher.test(content)) {
    return { ok: false as const };
  }
  const updated = content.replace(matcher, () => newText);
  await writeFileSafe(absolute, updated);
  return { ok: true as const };
}

export async function POST(request: Request) {
  if (!isDevEnvironment()) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const body = (await request.json()) as SaveTextBody;
  const oldText = body.oldText?.trim();
  const newText = body.newText ?? "";

  if (!oldText) {
    return NextResponse.json({ status: "not_found" as const });
  }

  if (body.fileHint) {
    const result = await applyReplacement(body.fileHint, oldText, newText);
    if (!result.ok) {
      return NextResponse.json({ status: "not_found" as const });
    }
    return NextResponse.json({ status: "saved" as const, file: body.fileHint });
  }

  const hits = await findMatches(oldText);

  if (hits.length === 0) {
    return NextResponse.json({ status: "not_found" as const });
  }

  if (hits.length === 1 && hits[0].matches === 1) {
    const result = await applyReplacement(hits[0].file, oldText, newText);
    if (!result.ok) {
      return NextResponse.json({ status: "not_found" as const });
    }
    return NextResponse.json({ status: "saved" as const, file: hits[0].file });
  }

  return NextResponse.json({ status: "ambiguous" as const, candidates: hits });
}
