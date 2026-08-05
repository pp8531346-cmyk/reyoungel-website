"use client";

import { createContext, useContext } from "react";

type EditModeContextValue = {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
};

// Default (no provider mounted, i.e. production): editMode always false, so any
// component reading this context — like Positionable — behaves as a plain
// pass-through with zero dev-editor behavior.
export const EditModeContext = createContext<EditModeContextValue>({
  editMode: false,
  setEditMode: () => {},
});

export function useEditMode() {
  return useContext(EditModeContext);
}
