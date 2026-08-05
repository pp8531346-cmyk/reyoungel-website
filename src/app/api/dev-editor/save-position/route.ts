import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { isDevEnvironment, PROJECT_ROOT } from "@/dev-editor/server-utils";

type SavePositionBody = {
  id: string;
  x: number;
  y: number;
};

const POSITIONS_FILE = path.join(PROJECT_ROOT, "src", "dev-editor", "positions.json");

export async function POST(request: Request) {
  if (!isDevEnvironment()) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const body = (await request.json()) as SavePositionBody;
  if (!body.id) {
    return NextResponse.json({ status: "invalid" as const });
  }

  let current: Record<string, { x: number; y: number }> = {};
  try {
    current = JSON.parse(await fs.readFile(POSITIONS_FILE, "utf-8"));
  } catch {
    current = {};
  }

  current[body.id] = { x: body.x, y: body.y };

  await fs.writeFile(POSITIONS_FILE, JSON.stringify(current, null, 2) + "\n", "utf-8");
  return NextResponse.json({ status: "saved" as const });
}
