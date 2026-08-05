"use client";

import { useState, type ReactNode } from "react";
import { EditModeContext } from "./EditModeContext";
import { DevEditorOverlay } from "./DevEditorOverlay";

/**
 * Only ever mounted via a process.env.NODE_ENV === "development" check in
 * layout.tsx, loaded through next/dynamic({ ssr: false }) — this whole module
 * (and everything it imports) is excluded from production bundles.
 */
export function DevEditorRoot({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
      <DevEditorOverlay />
    </EditModeContext.Provider>
  );
}
