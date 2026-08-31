import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { isDevEnvironment, PROJECT_ROOT } from "@/dev-editor/server-utils";

type SaveSizeBody = {
  /** The element's `data-edit-id` — same identifier the text editor uses, so
   * resize persistence follows the same targeting mechanism for consistency. */
  id: string;
  kind: "text" | "image";
  scale: number;
};

const SIZES_FILE = path.join(PROJECT_ROOT, "src", "dev-editor", "sizes.json");

const BOUNDS: Record<SaveSizeBody["kind"], { min: number; max: number }> = {
  text: { min: 0.5, max: 3 },
  image: { min: 0.25, max: 2 },
};

export async function POST(request: Request) {
  if (!isDevEnvironment()) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const body = (await request.json()) as SaveSizeBody;
  if (!body.id || (body.kind !== "text" && body.kind !== "image") || typeof body.scale !== "number") {
    return NextResponse.json({ status: "invalid" as const });
  }

  const { min, max } = BOUNDS[body.kind];
  const scale = Math.round(Math.min(max, Math.max(min, body.scale)) * 1000) / 1000;

  let current: Record<string, { kind: string; scale: number }> = {};
  try {
    current = JSON.parse(await fs.readFile(SIZES_FILE, "utf-8"));
  } catch {
    current = {};
  }

  current[body.id] = { kind: body.kind, scale };

  await fs.writeFile(SIZES_FILE, JSON.stringify(current, null, 2) + "\n", "utf-8");
  return NextResponse.json({ status: "saved" as const, scale });
}
