"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

// next/dynamic(..., { ssr: false }) is only allowed inside a Client Component,
// which is why this indirection exists — it's what actually makes Turbopack
// split DevEditorRoot (and everything it imports) into its own chunk that is
// only fetched when this branch renders, i.e. never in production.
const DevEditorRoot = dynamic(
  () => import("./DevEditorRoot").then((m) => m.DevEditorRoot),
  { ssr: false },
);

export function DevEditorGate({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV !== "development") {
    return <>{children}</>;
  }
  return <DevEditorRoot>{children}</DevEditorRoot>;
}
