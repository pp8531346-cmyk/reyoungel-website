"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useEditMode } from "./EditModeContext";
import positions from "./positions.json";

const UI_ATTR = "data-dev-editor-ui";
const DRAG_THRESHOLD = 4;

// Only serializable metadata lives in state (drives the toolbar UI). The actual
// DOM element being edited lives in editingElementRef below — mutating DOM node
// properties (style/textContent) through a state value trips the immutability lint.
type TextEdit = { kind: "text"; oldText: string };
type ImageEdit = {
  kind: "image";
  oldPublicPath: string;
  fileName: string;
  oldSrc: string;
  dataUrl: string;
};
type ActiveEdit = TextEdit | ImageEdit;

type SaveStatus =
  | { kind: "saving" }
  | { kind: "saved"; message: string }
  | { kind: "not_found" }
  | { kind: "ambiguous"; candidates: { file: string; matches: number }[] }
  | { kind: "error"; message: string };

type DragInfo = { id: string; x: number; y: number };

type PositionMap = Record<string, { x: number; y: number }>;

function getPublicPathFromImg(img: HTMLImageElement): string | null {
  const src = img.getAttribute("src") || "";
  if (src.startsWith("/_next/image")) {
    try {
      const url = new URL(src, window.location.origin);
      const original = url.searchParams.get("url");
      return original ? decodeURIComponent(original) : null;
    } catch {
      return null;
    }
  }
  if (src.startsWith("/")) return src;
  return null;
}

/** Stable short id derived from an element's own text — used as the positions.json
 * key for free-dragged text blocks, since (unlike the logo) they have no source-level id. */
function hashText(text: string): string {
  const trimmed = text.trim();
  let hash = 5381;
  for (let i = 0; i < trimmed.length; i++) {
    hash = ((hash << 5) + hash + trimmed.charCodeAt(i)) | 0;
  }
  return "text:" + (hash >>> 0).toString(36);
}

function parseTranslate(transform: string): { x: number; y: number } {
  const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  return match ? { x: parseFloat(match[1]), y: parseFloat(match[2]) } : { x: 0, y: 0 };
}

function pillButtonStyle(bg: string): CSSProperties {
  return {
    background: bg,
    color: "#faf5ef",
    border: "none",
    borderRadius: 6,
    padding: "6px 10px",
    fontSize: 12,
    cursor: "pointer",
    fontFamily: "system-ui, sans-serif",
  };
}

/**
 * Dev-only in-page editor. Only ever reached via a NODE_ENV check in
 * layout.tsx, so this code never ships to production.
 */
export function DevEditorOverlay() {
  const { editMode, setEditMode } = useEditMode();
  const pathname = usePathname();
  const [activeEdit, setActiveEdit] = useState<ActiveEdit | null>(null);
  const [status, setStatus] = useState<SaveStatus | null>(null);
  const [dragInfo, setDragInfo] = useState<DragInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingImageElement = useRef<HTMLImageElement | null>(null);
  const activeEditRef = useRef<ActiveEdit | null>(null);
  const editingElementRef = useRef<HTMLElement | HTMLImageElement | null>(null);

  useEffect(() => {
    activeEditRef.current = activeEdit;
  }, [activeEdit]);

  // Re-applies any previously-saved free-drag text positions after the page's own
  // content is in the DOM, and again on every client-side route change (this
  // component never remounts on navigation, only `children` swaps beneath it).
  useEffect(() => {
    const entries = Object.entries(positions as PositionMap).filter(([id]) =>
      id.startsWith("text:"),
    );
    if (entries.length === 0) return;
    const byId = new Map(entries);

    const raf = requestAnimationFrame(() => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const applied = new Set<Element>();
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent || "";
        if (!text.trim()) continue;
        const parent = node.parentElement;
        if (!parent || applied.has(parent) || parent.closest(`[${UI_ATTR}]`)) continue;
        const pos = byId.get(hashText(text));
        if (pos) {
          parent.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
          applied.add(parent);
        }
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (!editMode) return;

    const hoveredRef: { current: HTMLElement | null } = { current: null };
    let suppressNextClick = false;

    function isInsideUi(el: Element) {
      return !!el.closest(`[${UI_ATTR}]`);
    }

    function findEditableTextFallback(start: Element): HTMLElement | null {
      let el: Element | null = start;
      let depth = 0;
      while (el && depth < 8) {
        const hasDirectText = Array.from(el.childNodes).some(
          (node) => node.nodeType === Node.TEXT_NODE && (node.textContent || "").trim().length > 0,
        );
        if (hasDirectText) return el as HTMLElement;
        el = el.parentElement;
        depth++;
      }
      return null;
    }

    /** Resolves the actual text-owning element under the cursor. Uses the browser's
     * own caret-hit-testing (precise, works at any DOM nesting depth) with an
     * ancestor-walk fallback for the rare case a caret position isn't available. */
    function resolveEditableText(e: MouseEvent): HTMLElement | null {
      const target = e.target as Element;
      if (!target || isInsideUi(target)) return null;
      if (target.closest("[data-dev-positionable]") || target.closest("img")) return null;

      const doc = document as Document & {
        caretRangeFromPoint?: (x: number, y: number) => Range | null;
        caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null;
      };

      let node: Node | null = null;
      if (doc.caretRangeFromPoint) {
        node = doc.caretRangeFromPoint(e.clientX, e.clientY)?.startContainer ?? null;
      } else if (doc.caretPositionFromPoint) {
        node = doc.caretPositionFromPoint(e.clientX, e.clientY)?.offsetNode ?? null;
      }

      const el = node ? (node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element)) : null;
      if (el && !isInsideUi(el) && !el.closest("[data-dev-positionable]") && (el.textContent || "").trim()) {
        return el as HTMLElement;
      }

      return findEditableTextFallback(target);
    }

    function clearHoverOutline() {
      if (hoveredRef.current) {
        hoveredRef.current.style.outline = "";
        hoveredRef.current.style.cursor = "";
        hoveredRef.current = null;
      }
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as Element;
      if (!target || isInsideUi(target)) return;
      if (activeEditRef.current) return;

      const positionable = target.closest("[data-dev-positionable]");
      if (positionable) {
        if (positionable === hoveredRef.current) return;
        clearHoverOutline();
        (positionable as HTMLElement).style.outline = "2px dashed #2b6cb0";
        (positionable as HTMLElement).style.cursor = "grab";
        hoveredRef.current = positionable as HTMLElement;
        return;
      }

      const img = target.closest("img");
      const el = img ?? resolveEditableText(e);
      if (!el || el === hoveredRef.current) return;

      clearHoverOutline();
      (el as HTMLElement).style.outline = "2px dashed #ab213a";
      (el as HTMLElement).style.cursor = img ? "pointer" : "move";
      hoveredRef.current = el as HTMLElement;
    }

    function handleMouseOut(e: MouseEvent) {
      const related = e.relatedTarget as Element | null;
      if (hoveredRef.current && (!related || !hoveredRef.current.contains(related))) {
        clearHoverOutline();
      }
    }

    function startTextEdit(element: HTMLElement) {
      hoveredRef.current = null;
      const oldText = element.textContent || "";
      element.setAttribute("contenteditable", "true");
      element.style.outline = "2px solid #ab213a";
      element.style.cursor = "text";
      element.focus();
      const range = document.createRange();
      range.selectNodeContents(element);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);

      editingElementRef.current = element;
      setActiveEdit({ kind: "text", oldText });
      setStatus(null);
    }

    function startImageEdit(img: HTMLImageElement) {
      hoveredRef.current = null;
      pendingImageElement.current = img;
      fileInputRef.current?.click();
    }

    function savePositionRequest(id: string, x: number, y: number) {
      fetch("/api/dev-editor/save-position", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, x, y }),
      })
        .then(() => {
          setStatus({ kind: "saved", message: "Saved position" });
          setTimeout(() => setStatus(null), 2000);
        })
        .catch(() => setStatus({ kind: "error", message: "Request failed" }));
    }

    /** Click drags the logo (and any future data-dev-positionable element) —
     * unconstrained, unconditionally on mousedown, no click/drag distinction needed
     * since these elements have no separate "edit content" action to conflict with. */
    function handlePositionableMouseDown(e: MouseEvent, positionable: HTMLElement) {
      e.preventDefault();
      hoveredRef.current = null;
      const id = positionable.getAttribute("data-dev-positionable") || "";
      const { x: baseX, y: baseY } = parseTranslate(positionable.style.transform || "");
      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      positionable.style.cursor = "grabbing";

      setDragInfo({ id, x: baseX, y: baseY });

      function handleDragMove(moveEvent: MouseEvent) {
        const x = baseX + (moveEvent.clientX - startMouseX);
        const y = baseY + (moveEvent.clientY - startMouseY);
        positionable.style.transform = `translate(${x}px, ${y}px)`;
        setDragInfo({ id, x, y });
      }

      function handleDragEnd() {
        document.removeEventListener("mousemove", handleDragMove);
        document.removeEventListener("mouseup", handleDragEnd);
        positionable.style.cursor = "grab";
        setDragInfo((current) => {
          if (current) savePositionRequest(current.id, current.x, current.y);
          return null;
        });
      }

      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
    }

    /** A plain click on a text block edits its content (existing behavior); dragging
     * past a small threshold instead free-repositions the block via transform,
     * saved to positions.json under a content-hash-derived id. */
    function handleTextMouseDown(e: MouseEvent, textEl: HTMLElement) {
      e.preventDefault();
      suppressNextClick = true;
      hoveredRef.current = null;

      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const { x: baseX, y: baseY } = parseTranslate(textEl.style.transform || "");
      const positionId = hashText(textEl.textContent || "");
      let dragging = false;

      function handleMove(moveEvent: MouseEvent) {
        const dx = moveEvent.clientX - startMouseX;
        const dy = moveEvent.clientY - startMouseY;
        if (!dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
          dragging = true;
          textEl.style.cursor = "grabbing";
          textEl.style.outline = "2px solid #2b6cb0";
        }
        if (dragging) {
          const x = baseX + dx;
          const y = baseY + dy;
          textEl.style.transform = `translate(${x}px, ${y}px)`;
          setDragInfo({ id: positionId, x, y });
        }
      }

      function handleUp() {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleUp);

        if (dragging) {
          textEl.style.cursor = "";
          textEl.style.outline = "";
          setDragInfo((current) => {
            if (current) savePositionRequest(current.id, current.x, current.y);
            return null;
          });
        } else {
          startTextEdit(textEl);
        }
      }

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
    }

    function handleMouseDown(e: MouseEvent) {
      const target = e.target as Element;
      if (!target || isInsideUi(target) || activeEditRef.current) return;

      const positionable = target.closest("[data-dev-positionable]") as HTMLElement | null;
      if (positionable) {
        handlePositionableMouseDown(e, positionable);
        return;
      }

      if (target.closest("img")) return; // images: click-to-replace only, handled below

      const textEl = resolveEditableText(e);
      if (textEl) handleTextMouseDown(e, textEl);
    }

    function handleClick(e: MouseEvent) {
      const target = e.target as Element;
      if (!target || isInsideUi(target)) return;

      if (suppressNextClick) {
        suppressNextClick = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (target.closest("[data-dev-positionable]")) return;
      if (activeEditRef.current) return;

      const img = target.closest("img");
      if (img) {
        e.preventDefault();
        e.stopPropagation();
        startImageEdit(img as HTMLImageElement);
      }
    }

    document.addEventListener("click", handleClick, true);
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
      clearHoverOutline();
    };
  }, [editMode]);

  function cancelEdit() {
    const element = editingElementRef.current;
    if (activeEdit?.kind === "text" && element) {
      element.textContent = activeEdit.oldText;
      element.removeAttribute("contenteditable");
      element.style.outline = "";
      element.style.cursor = "";
    }
    if (activeEdit?.kind === "image" && element) {
      (element as HTMLImageElement).src = activeEdit.oldSrc;
    }
    editingElementRef.current = null;
    setActiveEdit(null);
    setStatus(null);
  }

  async function saveTextEdit(fileHint?: string) {
    if (!activeEdit || activeEdit.kind !== "text") return;
    const element = editingElementRef.current;
    if (!element) return;
    const newText = element.textContent || "";
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/dev-editor/save-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldText: activeEdit.oldText, newText, fileHint }),
      });
      const data = await res.json();
      if (data.status === "saved") {
        element.removeAttribute("contenteditable");
        element.style.outline = "";
        element.style.cursor = "";
        editingElementRef.current = null;
        setStatus({ kind: "saved", message: `Saved to ${data.file}` });
        setActiveEdit(null);
        setTimeout(() => setStatus(null), 2500);
      } else if (data.status === "ambiguous") {
        setStatus({ kind: "ambiguous", candidates: data.candidates });
      } else {
        setStatus({ kind: "not_found" });
      }
    } catch {
      setStatus({ kind: "error", message: "Request failed" });
    }
  }

  function handleFileChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const img = pendingImageElement.current;
    e.target.value = "";
    if (!file || !img) return;

    const oldPublicPath = getPublicPathFromImg(img);
    if (!oldPublicPath) {
      setStatus({ kind: "error", message: "Couldn't determine this image's public/ path" });
      return;
    }

    const oldSrc = img.src;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      // next/image sets srcset (and sizes) alongside src; browsers prefer a matching
      // srcset candidate over a JS-assigned src, so the preview silently no-ops unless
      // srcset is cleared too.
      img.removeAttribute("srcset");
      img.removeAttribute("sizes");
      img.src = dataUrl;
      editingElementRef.current = img;
      setActiveEdit({ kind: "image", oldPublicPath, fileName: file.name, oldSrc, dataUrl });
      setStatus(null);
    };
    reader.readAsDataURL(file);
  }

  async function saveImageEdit() {
    if (!activeEdit || activeEdit.kind !== "image") return;
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/dev-editor/save-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPublicPath: activeEdit.oldPublicPath,
          fileName: activeEdit.fileName,
          dataUrl: activeEdit.dataUrl,
        }),
      });
      const data = await res.json();
      if (data.status === "saved") {
        setStatus({
          kind: "saved",
          message: `Saved ${data.newPublicPath} (updated ${data.updatedFiles.length} file${data.updatedFiles.length === 1 ? "" : "s"})`,
        });
        setActiveEdit(null);
        setTimeout(() => setStatus(null), 4000);
      } else if (data.status === "no_reference_found") {
        setStatus({
          kind: "error",
          message: `Wrote ${data.newPublicPath} but found no source reference to update — swap it in manually`,
        });
      } else {
        setStatus({ kind: "error", message: "Couldn't save image" });
      }
    } catch {
      setStatus({ kind: "error", message: "Request failed" });
    }
  }

  return (
    <div data-dev-editor-ui="true">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChosen}
        style={{ display: "none" }}
      />

      {dragInfo && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 9998,
            background: "#1a1414",
            color: "#faf5ef",
            fontSize: 12,
            fontFamily: "monospace",
            padding: "6px 10px",
            borderRadius: 6,
            pointerEvents: "none",
          }}
        >
          {dragInfo.id}: translate({Math.round(dragInfo.x)}px, {Math.round(dragInfo.y)}px)
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          if (editMode) cancelEdit();
          setEditMode(!editMode);
        }}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9998,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          background: editMode ? "#ab213a" : "#1a1414",
          color: "#faf5ef",
          fontSize: 20,
          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        }}
        title={editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
      >
        {editMode ? "✕" : "✎"}
      </button>

      {editMode && (activeEdit || status) && (
        <div
          style={{
            position: "fixed",
            bottom: 84,
            right: 20,
            zIndex: 9998,
            maxWidth: 340,
            background: "#1a1414",
            color: "#faf5ef",
            borderRadius: 8,
            padding: "12px 14px",
            fontSize: 13,
            fontFamily: "system-ui, sans-serif",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {activeEdit?.kind === "text" && !status && (
            <>
              <span>Editing text — click Save when done.</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => saveTextEdit()} style={pillButtonStyle("#ab213a")}>
                  Save
                </button>
                <button onClick={cancelEdit} style={pillButtonStyle("#5a5450")}>
                  Cancel
                </button>
              </div>
            </>
          )}

          {activeEdit?.kind === "image" && !status && (
            <>
              <span>Replace image?</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={saveImageEdit} style={pillButtonStyle("#ab213a")}>
                  Save
                </button>
                <button onClick={cancelEdit} style={pillButtonStyle("#5a5450")}>
                  Cancel
                </button>
              </div>
            </>
          )}

          {status?.kind === "saving" && <span>Saving…</span>}
          {status?.kind === "saved" && <span>✓ {status.message}</span>}
          {status?.kind === "not_found" && (
            <>
              <span>Couldn&apos;t locate that text in source — copy it manually.</span>
              <button onClick={() => setStatus(null)} style={pillButtonStyle("#5a5450")}>
                Dismiss
              </button>
            </>
          )}
          {status?.kind === "error" && <span>⚠ {status.message}</span>}
          {status?.kind === "ambiguous" && (
            <>
              <span>Found in multiple files — pick one:</span>
              {status.candidates.map((c) => (
                <button
                  key={c.file}
                  onClick={() => saveTextEdit(c.file)}
                  style={{ ...pillButtonStyle("#5a5450"), textAlign: "start" }}
                >
                  {c.file} ({c.matches})
                </button>
              ))}
              <button onClick={cancelEdit} style={pillButtonStyle("#5a5450")}>
                Cancel
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
