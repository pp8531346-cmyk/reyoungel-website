import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import {
  isDevEnvironment,
  PUBLIC_DIR,
  assertInsideProject,
  listSourceFiles,
  readFileSafe,
  writeFileSafe,
  toRelative,
  escapeRegExp,
} from "@/dev-editor/server-utils";

type SaveImageBody = {
  /** Path relative to /public as currently referenced in source, e.g. "/images/product-box-1785649852968.jpg" */
  oldPublicPath: string;
  /** Original filename of the picked file, used to preserve its extension */
  fileName: string;
  /** data: URL from a FileReader.readAsDataURL() of the picked file */
  dataUrl: string;
};

function sanitizeBaseName(name: string) {
  const withoutExt = name.replace(/\.[^./\\]+$/, "");
  return withoutExt.replace(/[^a-zA-Z0-9-_]+/g, "-").replace(/^-+|-+$/g, "") || "image";
}

export async function POST(request: Request) {
  if (!isDevEnvironment()) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const body = (await request.json()) as SaveImageBody;
  const { oldPublicPath, fileName, dataUrl } = body;

  if (!oldPublicPath || !oldPublicPath.startsWith("/") || !dataUrl?.startsWith("data:")) {
    return NextResponse.json({ status: "invalid" as const });
  }

  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) {
    return NextResponse.json({ status: "invalid" as const });
  }
  const base64 = dataUrl.slice(commaIndex + 1);
  const buffer = Buffer.from(base64, "base64");

  // Always write under a brand-new filename (never overwrite in place). Next.js's
  // image optimizer caches optimized output on disk keyed by URL — overwriting the
  // same path leaves the old bytes served from that cache indefinitely. A fresh
  // filename means a fresh URL, which guarantees the new image actually renders.
  const dir = path.posix.dirname(oldPublicPath);
  const pickedExt = path.extname(fileName || "") || path.extname(oldPublicPath) || ".png";
  const base = sanitizeBaseName(fileName || path.basename(oldPublicPath));
  const newPublicPath = `${dir}/${base}-${Date.now()}${pickedExt}`.replace(/\/{2,}/g, "/");

  const absoluteNew = path.join(PUBLIC_DIR, newPublicPath);
  try {
    assertInsideProject(absoluteNew);
  } catch {
    return NextResponse.json({ status: "invalid" as const });
  }

  await fs.mkdir(path.dirname(absoluteNew), { recursive: true });
  await fs.writeFile(absoluteNew, buffer);

  // Rewrite every literal reference to the old path across the source tree so the
  // new file is actually what renders after reload.
  const files = await listSourceFiles();
  const pattern = new RegExp(escapeRegExp(oldPublicPath), "g");
  const updatedFiles: string[] = [];

  for (const file of files) {
    const content = await readFileSafe(file);
    if (!pattern.test(content)) continue;
    pattern.lastIndex = 0;
    const updated = content.replace(pattern, newPublicPath);
    await writeFileSafe(file, updated);
    updatedFiles.push(toRelative(file));
  }

  if (updatedFiles.length === 0) {
    return NextResponse.json({
      status: "no_reference_found" as const,
      newPublicPath,
    });
  }

  return NextResponse.json({
    status: "saved" as const,
    newPublicPath,
    updatedFiles,
  });
}
