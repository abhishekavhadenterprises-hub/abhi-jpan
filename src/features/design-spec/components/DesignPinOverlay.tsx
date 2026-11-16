"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback, useMemo } from "react";
import {
  Pin,
  CheckCircle2,
  AlertTriangle,
  History,
  X,
  ShieldCheck,
  Trash2,
  FileCheck,
  ChevronRight,
  Eye,
  EyeOff,
  PlusSquare,
  Layers,
  Pencil,
  ListOrdered,
  Locate,
  GripVertical,
  RotateCcw,
  CloudUpload,
} from "lucide-react";
import type {
  DesignSpecPin,
  DesignPinAdapter,
  DesignPinOverlayProps,
} from "../types/designSpec.types";
import { createLocalStorageAdapter } from "../adapters/localStorageAdapter";

interface LivePinInfo {
  pin: DesignSpecPin;
  index: number;
  badgeX: number;
  badgeY: number;
  targetRect: DOMRect;
  isVisible: boolean;
  popoverPlacement: {
    top: number;
    left: number;
    arrowSide: "left" | "right" | "top" | "bottom";
  };
}

const getShowAllPinsStorageKey = (key: string) => `design_spec_show_all_pins_${key}`;
const getShowCardsStorageKey = (key: string) => `design_spec_show_cards_${key}`;

const readShowAllPinsPreference = (projectKey: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw =
      localStorage.getItem(getShowAllPinsStorageKey(projectKey)) ??
      localStorage.getItem("design_spec_show_all_pins");
    if (raw !== null) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to read showAllPins preference from localStorage", e);
  }
  return false;
};

const saveShowAllPinsPreference = (projectKey: string, value: boolean) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getShowAllPinsStorageKey(projectKey), JSON.stringify(value));
    localStorage.setItem("design_spec_show_all_pins", JSON.stringify(value));
  } catch (e) {
    console.warn("Failed to write showAllPins preference to localStorage", e);
  }
};

const readShowCardsPreference = (projectKey: string): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const raw =
      localStorage.getItem(getShowCardsStorageKey(projectKey)) ??
      localStorage.getItem("design_spec_show_cards");
    if (raw !== null) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to read showDescriptionsAlways preference from localStorage", e);
  }
  return false;
};

const saveShowCardsPreference = (projectKey: string, value: boolean) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getShowCardsStorageKey(projectKey), JSON.stringify(value));
    localStorage.setItem("design_spec_show_cards", JSON.stringify(value));
  } catch (e) {
    console.warn("Failed to write showDescriptionsAlways preference to localStorage", e);
  }
};

const defaultInferModuleAndScreen = (route: string) => {
  const clean = (route || "").replace(/^\//, "");
  const parts = clean.split("/");
  if (!parts[0]) return { moduleName: "Dashboard", screenName: "Overview" };
  const cap = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
  const moduleName = cap(parts[0]);
  const screenName = parts[1] ? cap(parts[1]) : "Main Screen";
  return { moduleName, screenName };
};

/**
 * Generate a robust, unambiguous CSS selector for any element.
 * Traverses up the DOM tree and uses unique IDs, test IDs, or hierarchical nth-of-type tags.
 */
const getElementSelector = (target: HTMLElement | Element): string => {
  if (!target || !(target instanceof Element)) return "body";

  const targetTag = (target.tagName || "div").toLowerCase();
  if (targetTag === "body" || targetTag === "html") {
    return targetTag;
  }

  // 1. Direct unique attributes
  if (target.id) {
    try {
      if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
        return `#${CSS.escape(target.id)}`;
      }
      if (/^[A-Za-z_][A-Za-z0-9_-]*$/.test(target.id)) {
        return `#${target.id}`;
      }
    } catch {
      // ignore
    }
  }
  if (target instanceof HTMLElement && target.dataset?.testid) {
    return `[data-testid="${target.dataset.testid}"]`;
  }
  if (target.getAttribute("data-cy")) {
    return `[data-cy="${target.getAttribute("data-cy")}"]`;
  }
  if (target.getAttribute("name")) {
    return `${targetTag}[name="${target.getAttribute("name")}"]`;
  }

  // 2. Hierarchical path generator walking up to root or main
  const parts: string[] = [];
  let current: Element | null = target;
  let depth = 0;

  // Filter out volatile / generic utility classes that match hundreds of nodes
  const genericClasses = new Set([
    "relative", "absolute", "fixed", "flex", "inline-flex", "grid", "block", "inline-block",
    "items-center", "items-start", "items-end", "justify-between", "justify-center", "justify-start",
    "w-full", "h-full", "min-w-0", "p-4", "p-3", "p-2", "p-1", "p-6", "p-0",
    "px-2", "px-3", "px-4", "py-2", "py-3", "py-1", "m-0", "gap-1", "gap-2", "gap-3", "gap-4",
    "transition-all", "duration-200", "duration-300", "ease-in-out", "cursor-pointer",
    "bg-white", "bg-white dark:bg-slate-900", "text-slate-900 dark:text-slate-100", "text-slate-900 dark:text-slate-100", "border", "border-slate-200 dark:border-slate-800",
    "rounded-xl", "rounded-lg", "rounded-md", "rounded-2xl", "shadow-sm", "shadow-md"
  ]);

  while (current && depth < 8) {
    const tag = (current.tagName || "").toLowerCase();
    if (!tag || tag === "html" || tag === "body") break;

    // Anchor on unique ID if present on ancestor
    if (current.id) {
      try {
        if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
          parts.unshift(`#${CSS.escape(current.id)}`);
          break;
        } else if (/^[A-Za-z_][A-Za-z0-9_-]*$/.test(current.id)) {
          parts.unshift(`#${current.id}`);
          break;
        }
      } catch {
        // ignore
      }
    }

    let identifier = tag;

    // Safely extract classnames (guards against SVGAnimatedString)
    const rawClass = typeof current.className === "string"
      ? current.className
      : (current.getAttribute("class") || "");

    if (rawClass && typeof rawClass === "string") {
      const distinctiveClasses = rawClass
        .trim()
        .split(/\s+/)
        .filter(
          (c) =>
            c.length > 2 &&
            !genericClasses.has(c) &&
            !c.includes(":") &&
            !c.includes("/") &&
            !c.includes("[") &&
            /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.test(c)
        );

      if (distinctiveClasses.length > 0) {
        identifier += `.${distinctiveClasses.slice(0, 2).join(".")}`;
      }
    }

    // Disambiguate siblings with nth-of-type
    if (current.parentElement) {
      const siblings = Array.from(current.parentElement.children).filter(
        (c) => (c.tagName || "").toLowerCase() === tag
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        identifier += `:nth-of-type(${index})`;
      }
    }

    parts.unshift(identifier);
    if (tag === "main") break;
    current = current.parentElement;
    depth++;
  }

  const generated = parts.join(" > ").trim();
  if (generated.length > 0) {
    return generated;
  }

  return targetTag || "body";
};

/**
 * Intelligently infer an intuitive human-readable component title from any DOM element.
 */
const inferElementTitle = (el: HTMLElement | null): string => {
  if (!el) return "UI Element";

  // 1. Explicit accessible label / title
  const ariaLabel = el.getAttribute("aria-label")?.trim();
  if (ariaLabel && ariaLabel.length >= 2 && ariaLabel.length <= 60) return ariaLabel;

  const titleAttr = el.getAttribute("title")?.trim();
  if (titleAttr && titleAttr.length >= 2 && titleAttr.length <= 60) return titleAttr;

  // 2. Input / Textarea placeholder or name
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    if (el.placeholder && el.placeholder.trim()) return el.placeholder.trim();
    if (el.name) return el.name;
    return "Search / Input Field";
  }

  // 3. Dropdown items or labeled checkboxes
  const roleItem = el.closest("[role='menuitem'], [role='option'], label, li");
  if (roleItem && roleItem !== el) {
    const roleText = (roleItem.textContent || "").trim().split("\n")[0]?.trim();
    if (roleText && roleText.length >= 2 && roleText.length <= 40) return roleText;
  }

  // 4. Closest labeled button / link
  const parentBtn = el.closest("button, a");
  if (parentBtn) {
    const btnAria = parentBtn.getAttribute("aria-label")?.trim() || parentBtn.getAttribute("title")?.trim();
    if (btnAria && btnAria.length >= 2 && btnAria.length <= 60) return btnAria;
    const btnText = ((parentBtn as HTMLElement).innerText || parentBtn.textContent || "").trim().split("\n")[0]?.trim();
    if (btnText && btnText.length >= 2 && btnText.length <= 40) return btnText;
  }

  // 5. Clean inner text (only for leaf / small nodes so we don't pick top header on body)
  if (el.children.length <= 3) {
    const text = (el.innerText || el.textContent || "").trim().split("\n")[0]?.trim();
    if (text && text.length >= 2 && text.length <= 40) {
      return text;
    }
  }

  // 6. Semantic tag fallbacks
  const tag = (el.tagName || "div").toLowerCase();
  if (tag === "header") return "Header Bar";
  if (tag === "nav" || tag === "aside") return "Sidebar Navigation";
  if (tag === "table") return "Data Table";
  if (tag === "thead" || tag === "th") return "Table Header";
  if (tag === "tr" || tag === "td") return "Table Row / Cell";
  if (tag === "form") return "Form Container";
  if (tag === "main") return "Main Content View";

  return `${tag.toUpperCase()} Component`;
};

/**
 * Locate the DOM element for a pin, prioritizing active data attributes,
 * robust CSS selectors, coordinate-based element lookup, and text-content fallbacks.
 */
const findElementForPin = (pin: DesignSpecPin): HTMLElement | null => {
  if (typeof document === "undefined") return null;

  const isGlobalHeaderPin =
    pin.module_name?.toLowerCase().includes("global navbar") ||
    pin.selector.includes("[data-global-header]");

  // Strict scope isolation: Page pins search within <main> and any active open dialogs/sheets/portals
  const roots: HTMLElement[] = [];
  if (isGlobalHeaderPin) {
    roots.push(document.body);
  } else {
    const mainEl =
      document.querySelector<HTMLElement>("main") ||
      document.querySelector<HTMLElement>(".app-viewport-container");
    if (mainEl) roots.push(mainEl);

    // Support elements rendered inside Radix UI Portals (Dialogs, Sheets, Drawers, Modals)
    const activePortals = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[role="dialog"], [data-slot="sheet-content"], [data-radix-portal] > div'
      )
    ).filter((d) => !d.closest(".design-spec-ignore"));
    roots.push(...activePortals);

    if (roots.length === 0) roots.push(document.body);
  }

  // 1. Direct pin ID attribute
  for (const root of roots) {
    let matchEl = root.querySelector<HTMLElement>(`[data-design-spec-id="${pin.id}"]`);
    if (matchEl && document.body.contains(matchEl)) {
      if (!isGlobalHeaderPin && matchEl.closest("header, [data-global-header], .design-spec-global-header")) {
        matchEl.removeAttribute("data-design-spec-id");
      } else {
        return matchEl;
      }
    }
  }

  let el: HTMLElement | null = null;

  // 2. Query selector match (split multiple selectors and try each safely within active roots)
  if (pin.selector && pin.selector !== "html" && pin.selector !== "body") {
    const candidates = pin.selector.split(",").map((s) => s.trim()).filter(Boolean);
    for (const candidate of candidates) {
      if (!isGlobalHeaderPin && (candidate === "header button" || candidate === "header" || candidate === "button")) {
        continue;
      }
      try {
        for (const root of roots) {
          const matches = root.querySelectorAll<HTMLElement>(candidate);
          for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            if (match.closest(".design-spec-ignore")) continue;
            if (!isGlobalHeaderPin && match.closest("header, [data-global-header], .design-spec-global-header")) {
              continue;
            }

            if (!candidate.includes("[data-spec") && pin.element_text && pin.element_text.trim().length > 2) {
              const snippet = pin.element_text.trim().toLowerCase().slice(0, 30);
              if (!match.innerText?.toLowerCase().includes(snippet)) {
                continue;
              }
            }

            el = match;
            break;
          }
          if (el) break;
        }
        if (el) break;
      } catch {
        // Ignored for invalid selector fallbacks
      }
    }
  }

  // Fallback direct lookup on document.body if targeting a specific data-spec attribute inside any portal
  if (!el && pin.selector && pin.selector.includes("[data-spec=")) {
    try {
      const specMatches = document.querySelectorAll<HTMLElement>(pin.selector);
      for (let i = 0; i < specMatches.length; i++) {
        const match = specMatches[i];
        if (match.closest(".design-spec-ignore")) continue;
        if (!isGlobalHeaderPin && match.closest("header, [data-global-header], .design-spec-global-header")) continue;
        el = match;
        break;
      }
    } catch {
      // Ignored
    }
  }

  // 3. Fallback search by tag and text snippet across interactive tags inside active roots
  if (!el && pin.element_text && pin.element_text.trim().length >= 2) {
    const tags = pin.element_tag ? [pin.element_tag, "button", "div", "span", "a"] : ["button", "div", "span", "a"];
    const targetSnippet = pin.element_text.trim().toLowerCase().slice(0, 30);
    for (const tag of tags) {
      try {
        for (const root of roots) {
          const candidates = root.querySelectorAll<HTMLElement>(tag);
          for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.closest(".design-spec-ignore")) continue;
            if (!isGlobalHeaderPin && candidate.closest("header, [data-global-header], .design-spec-global-header")) {
              continue;
            }
            if (candidate.innerText?.toLowerCase().includes(targetSnippet)) {
              el = candidate;
              break;
            }
          }
          if (el) break;
        }
        if (el) break;
      } catch {
        // Ignored
      }
    }
  }

  // 4. Fallback search by Title keywords in buttons and actions inside active roots
  if (!el && pin.title) {
    const titleLower = pin.title.toLowerCase();
    if (titleLower.includes("add task")) {
      try {
        for (const root of roots) {
          const buttons = Array.from(root.querySelectorAll<HTMLElement>("button, a, div[role='button']"));
          const btn = buttons.find(
            (b: HTMLElement) =>
              !b.closest(".design-spec-ignore") &&
              !b.closest("header, [data-global-header]") &&
              Boolean(b.innerText?.toLowerCase().includes("add task"))
          );
          if (btn) {
            el = btn;
            break;
          }
        }
      } catch {
        // Ignored
      }
    }
  }

  // Tag element for instantaneous lookup on future frames
  if (el && el !== document.body && el !== document.documentElement) {
    el.setAttribute("data-design-spec-id", pin.id);
  }

  return el;
};

/**
 * Reusable, portable DesignPinOverlay component.
 * Can be plugged into any React application with zero setup (defaults to LocalStorage)
 * or connected to a REST/GraphQL/Firebase backend via the `adapter` prop.
 */
export const DesignPinOverlay: React.FC<DesignPinOverlayProps> = ({
  projectKey = "default",
  currentRoute: customRoute,
  getRouteContext = defaultInferModuleAndScreen,
  currentUser = { name: "Feature Owner", role: "Feature Owner" },
  adapter: customAdapter,
  onNotify,
  enabled = true,
  defaultToolbarExpanded = true,
  className = "",
}) => {
  // Determine active route (supports prop, window.location.pathname fallback)
  const activeRoute = useMemo(() => {
    if (customRoute !== undefined) return customRoute;
    if (typeof window !== "undefined") return window.location.pathname || "/";
    return "/";
  }, [customRoute]);

  // Memoize active storage adapter (defaults to built-in LocalStorage adapter)
  const adapter = useMemo<DesignPinAdapter>(() => {
    return customAdapter || createLocalStorageAdapter(projectKey);
  }, [customAdapter, projectKey]);

  // Internal notification dispatcher
  const notify = useCallback(
    (type: "success" | "error" | "info", msg: string) => {
      if (onNotify) {
        onNotify(type, msg);
      } else {
        // Lightweight built-in fallback console logger / toast
        if (type === "error") console.error(`[DesignPinOverlay] ${msg}`);
        else console.log(`[DesignPinOverlay] ${msg}`);
      }
    },
    [onNotify]
  );

  // Toolbar state: Draggable floating position (left/top coordinates clamped to screen)
  const [toolbarPosition, setToolbarPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startMouseX: number;
    startMouseY: number;
    startToolbarX: number;
    startToolbarY: number;
    hasMoved: boolean;
  } | null>(null);

  // Initialize toolbar expanded state from localStorage if available
  const [isToolbarExpanded, setIsToolbarExpanded] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`design_spec_toolbar_expanded_${projectKey || "default"}`);
        if (stored !== null) {
          return stored === "true";
        }
      } catch {
        // ignore localStorage access errors
      }
    }
    return defaultToolbarExpanded;
  });

  // Keep expanded state synchronized if projectKey changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(`design_spec_toolbar_expanded_${projectKey || "default"}`);
      if (stored !== null) {
        setIsToolbarExpanded(stored === "true");
      }
    } catch {
      // ignore
    }
  }, [projectKey]);

  // Persist toolbar expansion state to localStorage
  const handleToggleToolbar = useCallback(
    (expanded: boolean) => {
      setIsToolbarExpanded(expanded);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            `design_spec_toolbar_expanded_${projectKey || "default"}`,
            String(expanded)
          );
        } catch (e) {
          console.warn("[DesignPinOverlay] Failed to persist toolbar expanded state", e);
        }
      }
    },
    [projectKey]
  );

  const toolbarContainerRef = useRef<HTMLDivElement | null>(null);

  // Measure element width & height dynamically or clamp to viewport
  const clampPosition = (x: number, y: number) => {
    const padding = 16;
    const el = toolbarContainerRef.current;
    const width = el?.offsetWidth || 380;
    const height = el?.offsetHeight || 48;

    const minX = padding;
    const maxX = Math.max(padding, window.innerWidth - width - padding);
    const minY = padding;
    const maxY = Math.max(padding, window.innerHeight - height - padding);

    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  };

  // Re-clamp whenever window resizes or toolbar expands/collapses
  useEffect(() => {
    const handleResize = () => {
      setToolbarPosition((prev) => {
        if (!prev) return null;
        return clampPosition(prev.x, prev.y);
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When expanding or collapsing, clamp immediately so it never goes off-screen
  useLayoutEffect(() => {
    if (toolbarPosition) {
      requestAnimationFrame(() => {
        setToolbarPosition((prev) => {
          if (!prev) return null;
          return clampPosition(prev.x, prev.y);
        });
      });
    }
  }, [isToolbarExpanded]);

  // Feature Modes:
  // 1. Single Select Mode vs Multi-Mark Continuous Mode
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [isMultiMarkMode, setIsMultiMarkMode] = useState(false);

  // 2. Visibility toggles: Global Visibility of pins & descriptions (hydrated & persisted in localStorage, OFF by default)
  const [showAllPins, setShowAllPins] = useState<boolean>(false);
  const [showDescriptionsAlways, setShowDescriptionsAlways] = useState<boolean>(false);

  // Sync initial visibility preferences from localStorage on client mount
  useEffect(() => {
    setShowAllPins(readShowAllPinsPreference(projectKey));
    setShowDescriptionsAlways(readShowCardsPreference(projectKey));
  }, [projectKey]);

  // Hover & selection
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Single Box Hide / Unhide (Collapsed description state) & Dismiss state
  const [collapsedBoxIds, setCollapsedBoxIds] = useState<Record<string, boolean>>({});
  const [dismissedBoxIds, setDismissedBoxIds] = useState<Record<string, boolean>>({});

  const toggleBoxCollapse = (pinId: string) => {
    setCollapsedBoxIds((prev) => ({
      ...prev,
      [pinId]: !prev[pinId],
    }));
  };

  const dismissBox = (pinId: string) => {
    setDismissedBoxIds((prev) => ({
      ...prev,
      [pinId]: true,
    }));
  };

  const restoreBox = (pinId: string) => {
    setDismissedBoxIds((prev) => {
      const next = { ...prev };
      delete next[pinId];
      return next;
    });
  };

  const handlePinMouseEnter = (pinId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredPinId(pinId);
    restoreBox(pinId);
  };

  const handlePinMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPinId(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Pins state
  const [pins, setPins] = useState<DesignSpecPin[]>([]);
  const [activePinForView, setActivePinForView] = useState<DesignSpecPin | null>(null);

  // Dynamic live tracking state for scroll & layout sync
  const [livePositions, setLivePositions] = useState<Record<string, LivePinInfo>>({});

  // Form state
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formHowItWorks, setFormHowItWorks] = useState("");
  const [formOwnerName, setFormOwnerName] = useState(currentUser?.name || "Feature Owner");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client Actions inside View Dialog
  const [showChangeRequestInput, setShowChangeRequestInput] = useState(false);
  const [changeNotes, setChangeNotes] = useState("");
  const [clientName, setClientName] = useState(currentUser?.name || "Client Stakeholder");
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Edit Specification inside View Dialog
  const [isEditingPin, setIsEditingPin] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editHowItWorks, setEditHowItWorks] = useState("");

  // Toggle for the Side Rail (Feed of all pin specification boxes)
  const [showPinRail, setShowPinRail] = useState(false);

  // Custom drag positions for live floating boxes: Record<pinId, { left: number; top: number }>
  const [customBoxPositions, setCustomBoxPositions] = useState<Record<string, { left: number; top: number }>>({});
  const [draggingBoxId, setDraggingBoxId] = useState<string | null>(null);
  const boxDragRef = useRef<{
    pinId: string;
    startMouseX: number;
    startMouseY: number;
    startBoxX: number;
    startBoxY: number;
    hasMoved: boolean;
  } | null>(null);

  const handleBoxMouseDown = (e: React.MouseEvent, pinId: string, currentLeft: number, currentTop: number) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, a")) return; // Don't drag if clicking buttons

    e.stopPropagation();
    boxDragRef.current = {
      pinId,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startBoxX: currentLeft,
      startBoxY: currentTop,
      hasMoved: false,
    };
    setDraggingBoxId(pinId);
  };

  const resetBoxPosition = (pinId: string) => {
    setCustomBoxPositions((prev) => {
      const next = { ...prev };
      delete next[pinId];
      return next;
    });
  };

  // Keep author names in sync with the authenticated user context
  useEffect(() => {
    if (currentUser?.name && currentUser.name !== "Feature Owner") {
      setFormOwnerName(currentUser.name);
      setClientName(currentUser.name);
    }
  }, [currentUser?.name]);

  // Load pins on route change
  const loadPins = useCallback(async () => {
    try {
      const data = await adapter.getPins(activeRoute, projectKey);
      setPins(data || []);
    } catch (err: any) {
      // silently ignore if offline or reloading
    }
  }, [adapter, activeRoute, projectKey]);

  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedToDatabase = useCallback(async () => {
    if (typeof (adapter as any).seedDefaultSpecs !== "function") {
      notify("info", "Database seeding adapter not available.");
      return;
    }
    setIsSeeding(true);
    try {
      notify("info", "Syncing default specifications to database...");
      const result = await (adapter as any).seedDefaultSpecs(activeRoute, projectKey);
      notify("success", `Synced to database: ${result.created} created, ${result.skipped} existing, ${result.errors} errors.`);
      await loadPins();
    } catch (err: any) {
      notify("error", `Failed to sync specs to database: ${err?.message || "Unknown error"}`);
    } finally {
      setIsSeeding(false);
    }
  }, [adapter, activeRoute, projectKey, notify, loadPins]);

  useEffect(() => {
    loadPins();
    setActivePinForView(null);
    setHoveredPinId(null);
    setSelectedElement(null);
    setHoveredRect(null);
    setCustomBoxPositions({});
    setCollapsedBoxIds({});
    setDismissedBoxIds({});
  }, [activeRoute, loadPins]);

  // Stable chronological sorting: Pin 1 is always the 1st pin created, Pin 2 is 2nd, etc.
  const sortedPins = useMemo(() => {
    return [...pins].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }, [pins]);

  // Toolbar entire container drag handling (anchored & clamped to viewport bounds)
  const handleMouseDownOnToolbar = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;
    if (isToolbarExpanded) {
      const isInteractiveButton = !!target.closest("button, input, textarea, select, a");
      if (isInteractiveButton) return;
    }

    const currentRect = toolbarContainerRef.current?.getBoundingClientRect();
    const curX = currentRect?.left ?? (window.innerWidth - 400);
    const curY = currentRect?.top ?? (window.innerHeight - 80);

    dragRef.current = {
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startToolbarX: curX,
      startToolbarY: curY,
      hasMoved: false,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Handle toolbar dragging
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.startMouseX;
        const dy = e.clientY - dragRef.current.startMouseY;

        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          dragRef.current.hasMoved = true;
        }

        if (dragRef.current.hasMoved) {
          const next = clampPosition(
            dragRef.current.startToolbarX + dx,
            dragRef.current.startToolbarY + dy
          );
          setToolbarPosition(next);
        }
      }

      // 2. Handle live floating popover box dragging
      if (boxDragRef.current) {
        const dx = e.clientX - boxDragRef.current.startMouseX;
        const dy = e.clientY - boxDragRef.current.startMouseY;

        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          boxDragRef.current.hasMoved = true;
        }

        if (boxDragRef.current.hasMoved) {
          const clampedX = Math.max(8, Math.min(window.innerWidth - 360, boxDragRef.current.startBoxX + dx));
          const clampedY = Math.max(70, Math.min(window.innerHeight - 100, boxDragRef.current.startBoxY + dy));
          const pinId = boxDragRef.current.pinId;
          setCustomBoxPositions((prev) => ({
            ...prev,
            [pinId]: { left: clampedX, top: clampedY },
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDraggingBoxId(null);
      setTimeout(() => {
        dragRef.current = null;
        if (boxDragRef.current) {
          boxDragRef.current = null;
        }
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Handle hover and click while in Select Mode or Multi-Mark Mode
  useEffect(() => {
    const activePicking = (isSelectMode || isMultiMarkMode) && !showCreateDialog && !activePinForView;
    if (!activePicking) {
      setHoveredRect(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest(".design-spec-ignore")) {
        setHoveredRect(null);
        return;
      }

      let targetEl = target;
      if (
        targetEl.tagName &&
        /^(svg|path|circle|rect|polygon|line|polyline|g)$/i.test(targetEl.tagName) &&
        targetEl.parentElement
      ) {
        targetEl =
          (targetEl.closest(
            "button, a, input, select, textarea, [role='button'], table, th, td, div, span, li, header, nav, section, article, main"
          ) as HTMLElement) || (targetEl.parentElement as HTMLElement) || targetEl;
      }

      const rect = targetEl.getBoundingClientRect();
      setHoveredRect(rect);
    };

    const handleClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest(".design-spec-ignore")) return;

      e.preventDefault();
      e.stopPropagation();

      let targetEl = target;
      if (
        targetEl.tagName &&
        /^(svg|path|circle|rect|polygon|line|polyline|g)$/i.test(targetEl.tagName) &&
        targetEl.parentElement
      ) {
        targetEl =
          (targetEl.closest(
            "button, a, input, select, textarea, [role='button'], table, th, td, div, span, li, header, nav, section, article, main"
          ) as HTMLElement) || (targetEl.parentElement as HTMLElement) || targetEl;
      }

      setHoveredRect(null);

      const inferredTitle = inferElementTitle(targetEl);
      const { screenName } = getRouteContext(activeRoute);

      // Open detailed specification dialog for the clicked element
      // (In Multi-Mark mode, dialog opens per element for input, and remains in Multi-Mark mode upon submit)
      setSelectedElement(targetEl);
      setFormTitle(inferredTitle);
      setFormDesc(`Design specification for ${inferredTitle}`);
      setFormHowItWorks(`Interactive ${targetEl.tagName.toLowerCase()} element in ${screenName}.`);

      if (isSelectMode) {
        setIsSelectMode(false);
      }
      setShowCreateDialog(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick, true);
    };
  }, [isSelectMode, isMultiMarkMode, showCreateDialog, activePinForView, activeRoute, getRouteContext]);

  // Keyboard shortcut: Escape cancels selection mode or closes open modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showCreateDialog) {
          setShowCreateDialog(false);
          setSelectedElement(null);
        } else if (activePinForView) {
          setActivePinForView(null);
        } else if (isSelectMode || isMultiMarkMode) {
          setIsSelectMode(false);
          setIsMultiMarkMode(false);
          setHoveredRect(null);
          notify("info", "Selection mode cancelled");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCreateDialog, activePinForView, isSelectMode, isMultiMarkMode, notify]);

  // Real-time position tracking algorithm
  const updatePositions = useCallback(() => {
    if (!showAllPins || sortedPins.length === 0) {
      setLivePositions({});
      return;
    }

    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
    const windowHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    const headerThreshold = 74;

    const placedBoxes: Array<{ top: number; left: number; width: number; height: number }> = [];
    const nextPositions: Record<string, LivePinInfo> = {};

    sortedPins.forEach((pin, index) => {
      const el = findElementForPin(pin);
      let targetRect: DOMRect;
      let isElementVisible = false;

      if (el && (document.body.contains(el) || el === document.body || el === document.documentElement)) {
        targetRect = el.getBoundingClientRect();

        const hasSize = targetRect.width > 0 && targetRect.height > 0;
        const inVerticalView =
          targetRect.bottom > 20 && targetRect.top < windowHeight;

        let inScrollContainers = true;
        let parent = el.parentElement;
        while (parent && parent !== document.body && parent !== document.documentElement) {
          const style = window.getComputedStyle(parent);
          if (
            style.overflowY === "auto" ||
            style.overflowY === "scroll" ||
            style.overflowX === "auto" ||
            style.overflowX === "scroll"
          ) {
            const pRect = parent.getBoundingClientRect();
            if (
              targetRect.bottom < pRect.top ||
              targetRect.top > pRect.bottom ||
              targetRect.right < pRect.left ||
              targetRect.left > pRect.right
            ) {
              inScrollContainers = false;
              break;
            }
          }
          parent = parent.parentElement;
        }

        // If target was html or body, fall back to recorded bounding_rect so it anchors precisely
        if (el === document.body || el === document.documentElement) {
          if (pin.bounding_rect && pin.bounding_rect.width > 0) {
            targetRect = new DOMRect(
              pin.bounding_rect.left,
              pin.bounding_rect.top,
              pin.bounding_rect.width,
              pin.bounding_rect.height
            );
          }
        }

        isElementVisible = hasSize && inVerticalView && inScrollContainers;
      } else {
        // Element not currently in DOM: hide pin to prevent misleading phantom placements
        targetRect = new DOMRect(0, 0, 0, 0);
        isElementVisible = false;
      }

      // Pin badge position anchored to top-left of element (clamped to screen bounds)
      const badgeX = Math.max(8, Math.min(windowWidth - 40, Math.round(targetRect.left - 12)));
      const badgeY = Math.max(headerThreshold, Math.min(windowHeight - 40, Math.round(targetRect.top - 12)));

      // Popover positioning calculations: Elongated ("not too fat, just little bit long")
      const popoverWidth = 350;
      const popoverHeight = 94;
      const gap = 12;

      let popLeft = targetRect.left;
      let popTop = targetRect.bottom + gap;
      let arrowSide: "left" | "right" | "top" | "bottom" = "top";

      // Evaluate available free space completely outside the target element's bounding rect
      const canFitBelow = targetRect.bottom + gap + popoverHeight <= windowHeight - 16;
      const canFitRight = targetRect.right + gap + popoverWidth <= windowWidth - 16;
      const canFitAbove = targetRect.top - gap - popoverHeight >= headerThreshold + 8;
      const canFitLeft = targetRect.left - gap - popoverWidth >= 16;

      // Smart Ejection: Check if element is in the left sidebar or narrow left column
      const isInLeftSidebarOrNarrow =
        targetRect.right <= 280 || (targetRect.left <= 240 && targetRect.width <= 260);
      const isInRightSidebar = targetRect.left >= windowWidth - 280;

      if (isInLeftSidebarOrNarrow && canFitRight) {
        // 1. Sidebar element: ALWAYS project to the RIGHT into the main canvas so sidebar is not covered!
        popLeft = Math.max(targetRect.right + gap, 240 + gap);
        popTop = Math.max(headerThreshold + 8, Math.min(windowHeight - popoverHeight - 16, targetRect.top));
        arrowSide = "left";
      } else if (isInRightSidebar && canFitLeft) {
        // 2. Far right element: Project to the LEFT
        popLeft = targetRect.left - gap - popoverWidth;
        popTop = Math.max(headerThreshold + 8, Math.min(windowHeight - popoverHeight - 16, targetRect.top));
        arrowSide = "right";
      } else if (canFitBelow) {
        // 3. Main content widgets: Place completely BELOW the element
        popTop = targetRect.bottom + gap;
        popLeft = Math.max(16, Math.min(windowWidth - popoverWidth - 16, targetRect.left));
        arrowSide = "top";
      } else if (canFitRight) {
        // 4. Place completely to the RIGHT
        popLeft = targetRect.right + gap;
        popTop = Math.max(headerThreshold + 8, Math.min(windowHeight - popoverHeight - 16, targetRect.top));
        arrowSide = "left";
      } else if (canFitAbove) {
        // 5. Place completely ABOVE
        popTop = targetRect.top - gap - popoverHeight;
        popLeft = Math.max(16, Math.min(windowWidth - popoverWidth - 16, targetRect.left));
        arrowSide = "bottom";
      } else if (canFitLeft) {
        // 6. Place completely to the LEFT
        popLeft = targetRect.left - gap - popoverWidth;
        popTop = Math.max(headerThreshold + 8, Math.min(windowHeight - popoverHeight - 16, targetRect.top));
        arrowSide = "right";
      } else {
        // Fallback: Viewport boundary clamped
        popTop = Math.max(headerThreshold + 8, Math.min(windowHeight - popoverHeight - 16, targetRect.bottom + gap));
        popLeft = Math.max(16, Math.min(windowWidth - popoverWidth - 16, targetRect.left));
        arrowSide = "top";
      }

      // 7. Multi-box Collision Avoidance when "Cards On" is active
      if (showDescriptionsAlways) {
        const currentBox = { top: popTop, left: popLeft, width: popoverWidth, height: popoverHeight };
        for (const placed of placedBoxes) {
          const isOverlap = !(
            currentBox.left >= placed.left + placed.width ||
            currentBox.left + currentBox.width <= placed.left ||
            currentBox.top >= placed.top + placed.height ||
            currentBox.top + currentBox.height <= placed.top
          );

          if (isOverlap) {
            const shiftedTop = placed.top + placed.height + 8;
            if (shiftedTop + popoverHeight <= windowHeight - 16) {
              popTop = shiftedTop;
              currentBox.top = shiftedTop;
            } else {
              const shiftedRight = placed.left + placed.width + 12;
              if (shiftedRight + popoverWidth <= windowWidth - 16) {
                popLeft = shiftedRight;
                currentBox.left = shiftedRight;
              } else {
                const shiftedLeft = placed.left - popoverWidth - 12;
                if (shiftedLeft >= 16) {
                  popLeft = shiftedLeft;
                  currentBox.left = shiftedLeft;
                }
              }
            }
          }
        }
        placedBoxes.push({ top: popTop, left: popLeft, width: popoverWidth, height: popoverHeight });
      }

      nextPositions[pin.id] = {
        pin,
        index: index + 1,
        badgeX,
        badgeY,
        targetRect,
        isVisible: isElementVisible,
        popoverPlacement: {
          top: popTop,
          left: popLeft,
          arrowSide,
        },
      };
    });

    setLivePositions(nextPositions);
  }, [sortedPins, showAllPins, showDescriptionsAlways]);

  // Trigger position updates on pins change or visibility toggle
  useEffect(() => {
    updatePositions();
  }, [updatePositions]);

  // Hook into scroll (capture on all nested containers), resize, sidebar transition, and mutations
  useEffect(() => {
    let animId: number | null = null;
    const scheduleUpdate = () => {
      if (animId) return;
      animId = requestAnimationFrame(() => {
        updatePositions();
        animId = null;
      });
    };

    window.addEventListener("scroll", scheduleUpdate, { capture: true, passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const handleSidebarChange = () => {
      const startTime = performance.now();
      const tick = () => {
        updatePositions();
        if (performance.now() - startTime < 350) {
          requestAnimationFrame(tick);
        }
      };
      requestAnimationFrame(tick);
    };
    window.addEventListener("sidebar-collapse", handleSidebarChange);
    window.addEventListener("sidebar-restore", handleSidebarChange);

    const observer = new MutationObserver(() => {
      scheduleUpdate();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("sidebar-collapse", handleSidebarChange);
      window.removeEventListener("sidebar-restore", handleSidebarChange);
      observer.disconnect();
    };
  }, [updatePositions]);

  // Create new pinned spec
  const handleCreatePin = async (finishMultiMarkAfter = false) => {
    if (!selectedElement || !formTitle || !formDesc || !formHowItWorks) {
      notify("error", "Please fill out what this is and how it should work.");
      return;
    }

    try {
      setIsSubmitting(true);
      const rect = selectedElement.getBoundingClientRect();
      let screenshotUrl: string | undefined = undefined;
      try {
        const { toPng } = await import("html-to-image");
        screenshotUrl = await toPng(selectedElement, {
          quality: 0.85,
          pixelRatio: 1.5,
          skipFonts: true,
          filter: (node: any) => {
            if (node instanceof HTMLElement && node.classList.contains("design-spec-ignore")) {
              return false;
            }
            return true;
          },
        });
      } catch (err) {
        console.warn("Screenshot capture error:", err);
      }

      const { moduleName, screenName } = getRouteContext(activeRoute);

      const computedSelector =
        getElementSelector(selectedElement) ||
        (selectedElement.tagName ? selectedElement.tagName.toLowerCase() : "body");

      const payload = {
        projectKey,
        routeKey: activeRoute || "/",
        moduleName,
        screenName,
        componentName: formTitle,
        screenshotUrl,
        selector: computedSelector,
        elementTag: (selectedElement.tagName ? selectedElement.tagName.toLowerCase() : "div"),
        elementText: selectedElement.innerText?.slice(0, 100) || "",
        boundingRect: {
          top: Math.round(rect.top + window.scrollY),
          left: Math.round(rect.left + window.scrollX),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        title: formTitle,
        description: formDesc,
        howItWorks: formHowItWorks,
        featureOwnerName: formOwnerName || currentUser?.name || "Feature Owner",
        featureOwnerRole: currentUser?.role || "Feature Owner",
      };

      const created = await adapter.createPin(payload);
      selectedElement.setAttribute("data-design-spec-id", created.id);
      setPins((prev) => [...prev, created]);
      setShowAllPins(true);
      saveShowAllPinsPreference(projectKey, true);
      requestAnimationFrame(() => updatePositions());

      if (finishMultiMarkAfter && isMultiMarkMode) {
        setIsMultiMarkMode(false);
        notify("success", `Multi-Mark complete! Pin "${formTitle}" saved.`);
      } else if (isMultiMarkMode) {
        notify("success", `Marked "${formTitle}"! Click the next element to mark, or click Done.`);
      } else {
        notify("success", "Design specification pinned to element!");
      }

      setShowCreateDialog(false);
      setFormTitle("");
      setFormDesc("");
      setFormHowItWorks("");
      setSelectedElement(null);
    } catch (err: any) {
      notify("error", err.message || "Failed to pin design spec");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Client Approval
  const handleApprove = async (pinId: string) => {
    try {
      setIsActionLoading(true);
      const updated = await adapter.approvePin(pinId, {
        approvedByName: clientName,
        approvalNotes: "Design agreement accepted and confirmed on UI.",
      });
      setPins((prev) => prev.map((p) => (p.id === pinId ? updated : p)));
      setActivePinForView(updated);
      notify("success", "Design specification approved! Proof of agreement logged.");
    } catch (err: any) {
      notify("error", err.message || "Failed to approve design spec");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Client Request Changes
  const handleRequestChange = async (pinId: string) => {
    if (!changeNotes) {
      notify("error", "Please enter the requested changes notes.");
      return;
    }

    try {
      setIsActionLoading(true);
      let screenshotUrl: string | undefined = undefined;
      try {
        const pinEl = document.querySelector(`[data-design-spec-id="${pinId}"]`) as HTMLElement;
        if (pinEl) {
          const { toPng } = await import("html-to-image");
          screenshotUrl = await toPng(pinEl, { quality: 0.85, pixelRatio: 1.5, skipFonts: true });
        }
      } catch (err) {
        console.warn("Screenshot capture error on change request:", err);
      }

      const updated = await adapter.requestChange(pinId, {
        requestedBy: clientName,
        requestNotes: changeNotes,
        screenshotUrl,
      });
      setPins((prev) => prev.map((p) => (p.id === pinId ? updated : p)));
      setActivePinForView(updated);
      setChangeNotes("");
      setShowChangeRequestInput(false);
      notify("success", "Change request logged and timestamped!");
    } catch (err: any) {
      notify("error", err.message || "Failed to record change request");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Start Editing Pin
  const startEditingPin = (pin: DesignSpecPin) => {
    setEditTitle(pin.title);
    setEditDescription(pin.description);
    setEditHowItWorks(pin.how_it_works);
    setIsEditingPin(true);
    setShowChangeRequestInput(false);
  };

  // Save Pin Edits
  const handleSaveEditPin = async (pinId: string) => {
    if (!editTitle.trim() || !editDescription.trim() || !editHowItWorks.trim()) {
      notify("error", "Please fill in all specification fields.");
      return;
    }
    if (!adapter.updatePin) {
      notify("error", "Updating pins is not supported by the current adapter.");
      return;
    }

    try {
      setIsActionLoading(true);
      const updated = await adapter.updatePin(pinId, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        howItWorks: editHowItWorks.trim(),
        featureOwnerName: currentUser?.name,
      });

      setPins((prev) => prev.map((p) => (p.id === pinId ? updated : p)));
      setActivePinForView(updated);
      setIsEditingPin(false);
      notify("success", "Specification updated and change recorded!");
    } catch (err: any) {
      notify("error", err.message || "Failed to update specification");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Delete Pin
  const handleDeletePin = async (pinId: string) => {
    try {
      await adapter.deletePin(pinId);
      const targetEl = document.querySelector(`[data-design-spec-id="${pinId}"]`);
      if (targetEl) {
        targetEl.removeAttribute("data-design-spec-id");
      }
      setPins((prev) => prev.filter((p) => p.id !== pinId));
      setActivePinForView(null);
      setHoveredPinId(null);
      notify("success", "Pin removed.");
    } catch (err: any) {
      notify("error", err.message || "Failed to delete pin");
    }
  };

  const openPinDetails = (pin: DesignSpecPin) => {
    setActivePinForView(pin);
    setShowChangeRequestInput(false);
    setIsEditingPin(false);
  };

  // Scroll to and highlight a pin's target element on the screen
  const scrollToPinElement = (pin: DesignSpecPin) => {
    const el = findElementForPin(pin);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setHoveredPinId(pin.id);
      el.classList.add("ring-4", "ring-indigo-500", "ring-offset-2", "transition-all");
      setTimeout(() => {
        el.classList.remove("ring-4", "ring-indigo-500", "ring-offset-2");
      }, 1800);
    } else {
      notify("info", "Element not currently rendered in the active viewport");
    }
  };

  if (!enabled) return null;

  // Currently hovered or active pin live information for highlighted outline
  const activeHoverId = hoveredPinId || activePinForView?.id;
  const highlightedLiveInfo = activeHoverId ? livePositions[activeHoverId] : null;

  return (
    <div className={`design-pin-overlay-root ${className}`}>
      {/* 1. Dotted Outline while hovering element in Select / Multi-Mark Mode */}
      {(isSelectMode || isMultiMarkMode) && hoveredRect && (
        <div
          style={{
            position: "fixed",
            top: hoveredRect.top,
            left: hoveredRect.left,
            width: hoveredRect.width,
            height: hoveredRect.height,
            border: "2.5px dashed #6366f1",
            backgroundColor: "transparent",
            pointerEvents: "none",
            zIndex: 999990,
            borderRadius: "6px",
            boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.2)",
            transition: "all 0.08s ease-out",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-26px",
              left: 0,
              background: isMultiMarkMode ? "#7c3aed" : "#4f46e5",
              color: "#fff",
              fontSize: "11px",
              padding: "2px 8px",
              borderRadius: "4px",
              fontWeight: 600,
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            {isMultiMarkMode ? "Multi-mark: Click element to pin spec" : "Click to pin element spec"}
          </div>
        </div>
      )}

      {/* 2. Dotted Outline around element WHEN HOVERING ON PIN NUMBER OR ACTIVE */}
      {showAllPins && highlightedLiveInfo && highlightedLiveInfo.isVisible && (
        <div
          style={{
            position: "fixed",
            top: highlightedLiveInfo.targetRect.top,
            left: highlightedLiveInfo.targetRect.left,
            width: highlightedLiveInfo.targetRect.width,
            height: highlightedLiveInfo.targetRect.height,
            border:
              highlightedLiveInfo.pin.status === "approved"
                ? "3px dashed #10b981"
                : highlightedLiveInfo.pin.status === "changes_requested"
                ? "3px dashed #ef4444"
                : "3px dashed #f59e0b",
            backgroundColor: "transparent",
            pointerEvents: "none",
            zIndex: 999980,
            borderRadius: "8px",
            boxShadow:
              highlightedLiveInfo.pin.status === "approved"
                ? "0 0 0 4px rgba(16, 185, 129, 0.15)"
                : highlightedLiveInfo.pin.status === "changes_requested"
                ? "0 0 0 4px rgba(239, 68, 68, 0.15)"
                : "0 0 0 4px rgba(245, 158, 11, 0.15)",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            transition: "all 0.08s ease-out",
          }}
        />
      )}

      {/* 3. Floating Pin Badges (Position Fixed, Real-Time Synchronized to Scrolling Element) */}
      {showAllPins &&
        sortedPins.map((pin) => {
          const info = livePositions[pin.id];
          if (!info) return null;

          const isApproved = pin.status === "approved";
          const hasChanges = pin.status === "changes_requested";
          const isHovered = hoveredPinId === pin.id;
          const isVisibleBadge = info.isVisible;

          return (
            <div
              key={pin.id}
              style={{
                position: "fixed",
                top: `${info.badgeY}px`,
                left: `${info.badgeX}px`,
                zIndex: isHovered ? 999999 : 999994,
                opacity: isVisibleBadge ? 1 : 0,
                pointerEvents: isVisibleBadge ? "auto" : "none",
                transform: isVisibleBadge ? "scale(1)" : "scale(0.8)",
                transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
              }}
              className="design-spec-ignore group"
              onMouseEnter={() => handlePinMouseEnter(pin.id)}
              onMouseLeave={handlePinMouseLeave}
            >
              {/* Number Pin Badge */}
              <button
                onClick={() => openPinDetails(pin)}
                aria-label={`Pin ${info.index}: ${pin.title}`}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xl transition-all duration-200 border-2 border-white cursor-pointer select-none ${
                  isApproved
                    ? "bg-emerald-600 ring-2 ring-emerald-400 group-hover:scale-110"
                    : hasChanges
                    ? "bg-rose-600 ring-2 ring-rose-400 group-hover:scale-110"
                    : "bg-amber-500 ring-2 ring-amber-300 group-hover:scale-110"
                } ${isHovered ? "scale-110 ring-4" : ""}`}
              >
                {info.index}
              </button>
            </div>
          );
        })}

      {/* 3.0. Dynamic SVG Leader Lines connecting Pins to their Floating Boxes */}
      {showAllPins && !activePinForView && (
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-[999985]">
          {sortedPins.map((pin) => {
            const info = livePositions[pin.id];
            if (!info || !info.isVisible) return null;

            const isHovered = hoveredPinId === pin.id;
            const isDraggingThis = draggingBoxId === pin.id;
            const showThisPopover = isHovered || isDraggingThis || showDescriptionsAlways;
            if (!showThisPopover) return null;

            const isDismissed = !!dismissedBoxIds[pin.id];
            if (isDismissed && !isHovered) return null;

            const isCollapsed = !!collapsedBoxIds[pin.id];
            const customPos = customBoxPositions[pin.id];
            const boxLeft = customPos ? customPos.left : info.popoverPlacement.left;
            const boxTop = customPos ? customPos.top : info.popoverPlacement.top;
            const boxWidth = isCollapsed ? 260 : 350;
            const boxHeight = isCollapsed ? 36 : 92;

            const pinCenterX = info.badgeX + 16;
            const pinCenterY = info.badgeY + 16;

            // Compute nearest anchor point on the box perimeter
            let anchorX = boxLeft + 16;
            let anchorY = boxTop + 14;

            if (pinCenterX < boxLeft) {
              anchorX = boxLeft;
              anchorY = Math.max(boxTop + 12, Math.min(boxTop + boxHeight - 12, pinCenterY));
            } else if (pinCenterX > boxLeft + boxWidth) {
              anchorX = boxLeft + boxWidth;
              anchorY = Math.max(boxTop + 12, Math.min(boxTop + boxHeight - 12, pinCenterY));
            } else if (pinCenterY < boxTop) {
              anchorX = Math.max(boxLeft + 16, Math.min(boxLeft + boxWidth - 16, pinCenterX));
              anchorY = boxTop;
            } else {
              anchorX = Math.max(boxLeft + 16, Math.min(boxLeft + boxWidth - 16, pinCenterX));
              anchorY = boxTop + boxHeight;
            }

            const isApproved = pin.status === "approved";
            const strokeColor = isApproved ? "#10b981" : pin.status === "changes_requested" ? "#f43f5e" : "#f59e0b";
            const midX = (pinCenterX + anchorX) / 2;

            return (
              <g key={`leader-line-${pin.id}`} className="transition-opacity duration-150">
                <path
                  d={`M ${pinCenterX} ${pinCenterY} C ${midX} ${pinCenterY}, ${midX} ${anchorY}, ${anchorX} ${anchorY}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isHovered || isDraggingThis ? 2 : 1.5}
                  strokeDasharray="4 3"
                  opacity={isHovered || isDraggingThis ? 0.9 : 0.6}
                />
                <circle cx={anchorX} cy={anchorY} r="3" fill={strokeColor} opacity={isHovered || isDraggingThis ? 1 : 0.7} />
              </g>
            );
          })}
        </svg>
      )}

      {/* 3.1. Floating Description Box Popovers (Elongated, Draggable, Smart Sidebar Ejection) */}
      {showAllPins &&
        !activePinForView &&
        sortedPins.map((pin) => {
          const info = livePositions[pin.id];
          if (!info || !info.isVisible) return null;

          const isHovered = hoveredPinId === pin.id;
          const isDraggingThis = draggingBoxId === pin.id;
          const showThisPopover = isHovered || isDraggingThis || showDescriptionsAlways;
          if (!showThisPopover) return null;

          const isDismissed = !!dismissedBoxIds[pin.id];
          if (isDismissed && !isHovered) return null;

          const isCollapsed = !!collapsedBoxIds[pin.id];
          const isApproved = pin.status === "approved";
          const hasChanges = pin.status === "changes_requested";

          const customPos = customBoxPositions[pin.id];
          const boxLeft = customPos ? customPos.left : info.popoverPlacement.left;
          const boxTop = customPos ? customPos.top : info.popoverPlacement.top;

          return (
            <div
              key={`popover-${pin.id}`}
              style={{
                position: "fixed",
                top: `${boxTop}px`,
                left: `${boxLeft}px`,
                width: isCollapsed ? "260px" : "350px",
                zIndex: isHovered || isDraggingThis ? 999998 : 999988,
              }}
              className="design-spec-ignore pointer-events-auto transition-all duration-150 animate-in fade-in zoom-in-95"
              onMouseEnter={() => handlePinMouseEnter(pin.id)}
              onMouseLeave={handlePinMouseLeave}
            >
              <div
                onClick={() => {
                  if (boxDragRef.current?.hasMoved) return;
                  openPinDetails(pin);
                }}
                className={`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border shadow-xl rounded-xl p-2.5 space-y-1.5 backdrop-blur-md transition-all select-none ${
                  isDraggingThis
                    ? "border-indigo-500 ring-2 ring-indigo-500/50 shadow-2xl scale-[1.01] cursor-grabbing"
                    : isHovered
                    ? "border-indigo-500/80 ring-2 ring-indigo-500/30 shadow-indigo-500/10 cursor-pointer"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-200 dark:border-slate-800 cursor-pointer"
                }`}
              >
                {/* Drag Handle & Top Header Row */}
                <div
                  onMouseDown={(e) => handleBoxMouseDown(e, pin.id, boxLeft, boxTop)}
                  className={`flex items-center justify-between gap-1.5 ${isCollapsed ? "" : "pb-1 border-b border-slate-200 dark:border-slate-800"} cursor-grab active:cursor-grabbing`}
                  title="Drag anywhere here to move this box freely on screen"
                >
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <GripVertical className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 shrink-0 cursor-grab" />
                    <span
                      className={`w-4 h-4 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs ${
                        isApproved ? "bg-emerald-600" : hasChanges ? "bg-rose-600" : "bg-amber-500"
                      }`}
                    >
                      {info.index}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-tight truncate">
                      {pin.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Status Pill */}
                    {isApproved ? (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20 shrink-0">
                        Approved
                      </span>
                    ) : hasChanges ? (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500/10 text-rose-600 font-semibold border border-rose-500/20 shrink-0">
                        Changes ({pin.change_request_count})
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold border border-amber-500/20 shrink-0">
                        Pending
                      </span>
                    )}

                    {/* Single Hide / Unhide Button on the box itself */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBoxCollapse(pin.id);
                      }}
                      className={`p-1 rounded-md transition-colors cursor-pointer ${
                        isCollapsed
                          ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/25"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                      title={isCollapsed ? "Unhide description" : "Hide description"}
                    >
                      {isCollapsed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>

                    {/* Reset Position Button (shown when custom dragged) */}
                    {customBoxPositions[pin.id] && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          resetBoxPosition(pin.id);
                        }}
                        className="p-0.5 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Reset to default position near element"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}

                    {/* Dismiss / Close Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        dismissBox(pin.id);
                      }}
                      className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Close box (hover pin to restore)"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Description Body (Hidden when collapsed/hidden by user) */}
                {!isCollapsed && (
                  <>
                    {/* 2-Column Elongated Content ("Not too fat, just little bit long") */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] pt-0.5">
                      <div className="min-w-0 pr-1 border-r border-slate-200 dark:border-slate-800">
                        <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[8px] tracking-wider block">
                          What it is:
                        </span>
                        <p className="line-clamp-2 text-slate-900 dark:text-slate-100/90 font-medium leading-tight mt-0.5">
                          {pin.description}
                        </p>
                      </div>
                      <div className="min-w-0 pl-1">
                        <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-[8px] tracking-wider block">
                          How it works:
                        </span>
                        <p className="line-clamp-2 text-slate-900 dark:text-slate-100/80 leading-tight mt-0.5">
                          {pin.how_it_works}
                        </p>
                      </div>
                    </div>

                    {/* Single-line Approved banner if approved */}
                    {isApproved && (
                      <div className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[9px] text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                        <span className="font-semibold flex items-center gap-1 truncate">
                          <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" /> Approved by {pin.approved_by_name}
                        </span>
                        <span className="text-[8px] text-emerald-700 dark:text-emerald-400 shrink-0">
                          {new Date(pin.approved_at || "").toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {/* Compact Footer Strip */}
                    <div className="flex items-center justify-between text-[9px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span className="truncate max-w-[200px]">
                        By <strong className="text-slate-900 dark:text-slate-100/80">{pin.feature_owner_name}</strong>
                      </span>
                      <span className="text-primary font-semibold hover:underline flex items-center gap-0.5 shrink-0">
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}

      {/* 3.2. PIN RAIL: FLOATING BOXES (Clean Normal View on Hover, Clears Bottom Toolbar) */}
      {showPinRail && showAllPins && (
        <div
          aria-label="Pin Specifications Floating Boxes"
          className="design-spec-ignore fixed top-20 right-4 bottom-24 z-[999990] flex flex-col items-end pointer-events-none select-none animate-in fade-in duration-150"
        >
          {/* Floating Pill Header */}
          <div className="pointer-events-auto mb-2 flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl bg-slate-900 text-white border border-slate-700/80 shadow-xl">
            <div className="flex items-center gap-1.5">
              <ListOrdered className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-bold text-[11px] tracking-wide">Pin Rail</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300 font-mono font-bold">
                {sortedPins.length}
              </span>
            </div>
            <button
              onClick={() => setShowPinRail(false)}
              className="p-0.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Pin Rail"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Floating Boxes Scrollable Stream */}
          <div className="pointer-events-auto flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1.5 pb-3 select-text">
            {sortedPins.length === 0 ? (
              <div className="w-[260px] p-4 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-[11px] text-slate-500 dark:text-slate-400 pointer-events-auto">
                <Pin className="w-5 h-5 mx-auto mb-1.5 opacity-40 rotate-45" />
                <p className="font-semibold text-slate-900 dark:text-slate-100">No pins on this screen</p>
                <p className="mt-0.5 text-[10px]">Click "Pin Element" to mark any UI element.</p>
              </div>
            ) : (
              sortedPins.map((pin, idx) => {
                const info = livePositions[pin.id];
                const pinNumber = info?.index || idx + 1;
                const isApproved = pin.status === "approved";
                const hasChanges = pin.status === "changes_requested";
                const isHovered = hoveredPinId === pin.id;

                return (
                  <div
                    key={`floating-box-${pin.id}`}
                    onMouseEnter={() => setHoveredPinId(pin.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                    onClick={() => openPinDetails(pin)}
                    className={`w-[265px] sm:w-[280px] rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3 space-y-2 transition-all duration-150 cursor-pointer shadow-md pointer-events-auto ${
                      isHovered
                        ? "border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-200 dark:border-slate-800 hover:shadow-lg"
                    }`}
                  >
                    {/* Header: Pin Number, Title, Status, Locate */}
                    <div className="flex items-start justify-between gap-1.5 border-b pb-1.5">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span
                          className={`w-5 h-5 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs ${
                            isApproved ? "bg-emerald-600" : hasChanges ? "bg-rose-600" : "bg-amber-500"
                          }`}
                        >
                          {pinNumber}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-tight truncate">
                            {pin.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                            By {pin.feature_owner_name}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {isApproved ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                            Approved
                          </span>
                        ) : hasChanges ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-semibold border border-rose-500/20">
                            Changes ({pin.change_request_count})
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold border border-amber-500/20">
                            Pending
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToPinElement(pin);
                          }}
                          className="p-1 rounded-md text-slate-500 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Locate element on screen"
                        >
                          <Locate className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="text-[11px] space-y-1">
                      <div>
                        <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase text-[9px] block">
                          What it is:
                        </span>
                        <p className="text-slate-900 dark:text-slate-100/90 line-clamp-2 leading-snug">
                          {pin.description}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase text-[9px] block">
                          How it works:
                        </span>
                        <p className="text-slate-900 dark:text-slate-100/80 line-clamp-1 leading-snug">
                          {pin.how_it_works}
                        </p>
                      </div>
                    </div>

                    {/* Footer Prompt */}
                    <div className="pt-1 border-t flex items-center justify-between text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      <span>Click to view details or edit</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 4. DRAGGABLE FLOATING TOOLBAR */}
      <div
        ref={toolbarContainerRef}
        style={
          toolbarPosition
            ? {
                position: "fixed",
                left: `${toolbarPosition.x}px`,
                top: `${toolbarPosition.y}px`,
                right: "auto",
                bottom: "auto",
                zIndex: 999995,
              }
            : {
                position: "fixed",
                bottom: "24px",
                right: "24px",
                zIndex: 999995,
              }
        }
        onMouseDown={handleMouseDownOnToolbar}
        className={`design-spec-ignore select-none transition-shadow ${
          isDragging ? "cursor-grabbing opacity-90 scale-95 shadow-3xl" : "cursor-grab"
        }`}
        title="Click and drag anywhere on this toolbar to move it around the screen"
      >
        <div className="bg-[#0F172A] text-white backdrop-blur-md rounded-xl shadow-2xl border border-slate-700 p-1.5 flex items-center gap-1.5">
          {/* Collapsed Mode: Clean Pin Icon */}
          {!isToolbarExpanded && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (!dragRef.current?.hasMoved) {
                  handleToggleToolbar(true);
                }
              }}
              className="p-1 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
              title="Click to expand, or drag anywhere to reposition"
            >
              <Pin className="w-3.5 h-3.5 rotate-45" />
              {pins.length > 0 && (
                <span className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded-full font-mono">
                  {pins.length}
                </span>
              )}
            </div>
          )}

          {/* Expanded Features Group */}
          {isToolbarExpanded && (
            <div className="flex items-center gap-1">
              {/* Collapse to Pin Icon */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleToolbar(false);
                }}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Collapse Toolbar"
              >
                <Pin className="w-3.5 h-3.5 rotate-45 text-indigo-400" />
              </button>

              <div className="w-[1px] h-4 bg-slate-700/80 mx-0.5" />

              {/* Single Pin Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMultiMarkMode(false);
                  setIsSelectMode(!isSelectMode);
                  if (!isSelectMode) {
                    notify("info", "Single Pin Mode: Click any element to pin its spec!");
                  }
                }}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  isSelectMode
                    ? "bg-indigo-600 text-white shadow-md animate-pulse"
                    : "hover:bg-slate-800 text-slate-200"
                }`}
                title="Select a single element to pin"
              >
                <Pin className="w-3.5 h-3.5 rotate-45" />
                <span>{isSelectMode ? "Cancel" : "Pin Element"}</span>
              </button>

              {/* Multi-Mark Continuous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSelectMode(false);
                  const nextMode = !isMultiMarkMode;
                  setIsMultiMarkMode(nextMode);
                  if (nextMode) {
                    notify("info", "Multi-Mark Mode ON: Click any element to enter its spec, then Submit & Next!");
                  } else {
                    setShowAllPins(true);
                    saveShowAllPinsPreference(projectKey, true);
                    notify("success", `Multi-Mark finished (${pins.length} pins active).`);
                    setTimeout(() => updatePositions(), 50);
                  }
                }}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  isMultiMarkMode
                    ? "bg-purple-600 text-white shadow-md ring-2 ring-purple-400 animate-pulse"
                    : "hover:bg-slate-800 text-slate-200"
                }`}
                title="Mark multiple elements one after another"
              >
                <PlusSquare className="w-3.5 h-3.5" />
                <span>{isMultiMarkMode ? "Done" : "Multi-Mark"}</span>
              </button>

              <div className="w-[1px] h-4 bg-slate-700/80 mx-0.5" />

              {/* Pin Rail Side Feed Toggle Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPinRail(!showPinRail);
                }}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  showPinRail
                    ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400"
                    : "hover:bg-slate-800 text-slate-200"
                }`}
                title="Toggle floating boxes of all pinned element specifications"
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Pin Rail</span>
                {pins.length > 0 && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/20 font-bold">
                    {pins.length}
                  </span>
                )}
              </button>

              {/* Eye Button: Visibility toggle (Hide all / Show all) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllPins((prev) => {
                    const next = !prev;
                    saveShowAllPinsPreference(projectKey, next);
                    notify("info", next ? "Showing all pins" : "Hiding all pins");
                    return next;
                  });
                }}
                className={`p-1 rounded-lg transition-colors cursor-pointer ${
                  showAllPins
                    ? "hover:bg-slate-800 text-slate-200"
                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
                title={showAllPins ? "Hide all pins on screen" : "Show all pins on screen"}
              >
                {showAllPins ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>

              {/* Always Show Descriptions Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDescriptionsAlways((prev) => {
                    const next = !prev;
                    saveShowCardsPreference(projectKey, next);
                    return next;
                  });
                }}
                className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  showDescriptionsAlways
                    ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                    : "hover:bg-slate-800 text-slate-400"
                }`}
                title="Toggle sticky visibility of all descriptions without hovering"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {showDescriptionsAlways ? "Cards On" : "Cards Off"}
                </span>
              </button>

              {/* Seed / Sync Specs to Database Button */}
              {typeof (adapter as any).seedDefaultSpecs === "function" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSeedToDatabase();
                  }}
                  disabled={isSeeding}
                  className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer hover:bg-slate-800 text-blue-400 border border-blue-500/20 disabled:opacity-50"
                  title="Push pre-defined design specifications for this page directly to the backend database"
                >
                  <CloudUpload className={`w-3.5 h-3.5 ${isSeeding ? "animate-spin" : ""}`} />
                  <span>{isSeeding ? "Syncing..." : "Sync DB"}</span>
                </button>
              )}

              {/* Pinned Count Indicator */}
              {pins.length > 0 && (
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-md font-mono font-bold ml-0.5">
                  {pins.length}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 5. CREATE PIN DIALOG (Feature Owner fills description & How it works) */}
      {showCreateDialog && selectedElement && (
        <div className="design-spec-ignore fixed inset-0 z-[999999] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl max-w-xl w-full p-6 sm:p-7 space-y-4 my-auto max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
                  <Pin className="w-5 h-5 rotate-45" />
                </div>
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                    Pin Feature Specification
                    {isMultiMarkMode && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">
                        Multi-Mark Active (Pin #{pins.length + 1})
                      </span>
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    {isMultiMarkMode
                      ? "Enter specification for this element. Click 'Submit & Next' to continue marking, or 'Save & Done' when finished."
                      : "Define what this element is and how it functions for team & client review."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowCreateDialog(false);
                  setSelectedElement(null);
                }}
                className="p-1.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs font-mono bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl text-slate-500 dark:text-slate-400 truncate border border-slate-200 dark:border-slate-800">
              Element: {getElementSelector(selectedElement) || selectedElement?.tagName?.toLowerCase() || "Selected Element"}
            </div>

            {/* Logged-in User Attribution Card */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                {(formOwnerName || "AD").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">Logged-in User (Author)</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200">
                    {currentUser?.role || "Admin"}
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate block mt-0.5">{formOwnerName}</span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-sm font-semibold block mb-1 text-slate-900 dark:text-slate-100">Element Title</label>
                <input
                  type="text"
                  placeholder="e.g., Ticket Priority Escalation Badge"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1 text-slate-900 dark:text-slate-100">Description (What is this?)</label>
                <textarea
                  rows={2}
                  placeholder="Describe the UI element, purpose, and visual design intention..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 resize-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1 text-slate-900 dark:text-slate-100">Functionality (How it works)</label>
                <textarea
                  rows={3}
                  placeholder="Explain user clicks, state transitions, API calls, or approval rules..."
                  value={formHowItWorks}
                  onChange={(e) => setFormHowItWorks(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 resize-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold block mb-1 text-slate-900 dark:text-slate-100">Author / Feature Owner</label>
                <input
                  type="text"
                  value={formOwnerName}
                  onChange={(e) => setFormOwnerName(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t gap-2 flex-wrap">
              {isMultiMarkMode ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsMultiMarkMode(false);
                    setShowCreateDialog(false);
                    setSelectedElement(null);
                    setShowAllPins(true);
                    saveShowAllPinsPreference(projectKey, true);
                    notify("info", `Multi-Mark finished (${pins.length} pins active).`);
                    requestAnimationFrame(() => updatePositions());
                  }}
                  className="h-10 px-3.5 rounded-xl border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-semibold hover:bg-purple-500/10 cursor-pointer transition-colors"
                >
                  Done (Exit Multi-Mark)
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateDialog(false);
                    setSelectedElement(null);
                  }}
                  className="h-10 px-4 rounded-xl border text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  {isMultiMarkMode ? "Skip Element" : "Cancel"}
                </button>
                {isMultiMarkMode && (
                  <button
                    type="button"
                    onClick={() => handleCreatePin(true)}
                    disabled={isSubmitting}
                    className="h-10 px-4 rounded-xl bg-purple-600 text-white text-xs sm:text-sm font-semibold hover:bg-purple-700 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save & Done"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleCreatePin(false)}
                  disabled={isSubmitting}
                  className="h-10 px-5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : isMultiMarkMode ? "Submit & Next" : "Save Pin"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. PIN FULL DETAILS & CLIENT AGREEMENT DIALOG BOX */}
      {activePinForView && (
        <div className="design-spec-ignore fixed inset-0 z-[999999] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl max-w-xl sm:max-w-2xl w-full p-6 sm:p-7 space-y-4 my-auto max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-start justify-between border-b pb-3.5 gap-2">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {activePinForView.title}
                  </h3>
                  {activePinForView.status === "approved" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4" /> Approved
                    </span>
                  ) : activePinForView.status === "changes_requested" ? (
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 font-semibold border border-rose-500/20">
                      <AlertTriangle className="w-4 h-4" /> Changes Requested
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold border border-amber-500/20">
                      Pending Approval
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Pinned by <strong className="text-slate-900 dark:text-slate-100">{activePinForView.feature_owner_name}</strong> on{" "}
                  {new Date(activePinForView.created_at).toLocaleDateString()} at{" "}
                  {new Date(activePinForView.created_at).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (isEditingPin) {
                      setIsEditingPin(false);
                    } else {
                      startEditingPin(activePinForView);
                    }
                  }}
                  title={isEditingPin ? "Cancel Edit" : "Edit Specification"}
                  className={`p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
                    isEditingPin ? "text-blue-600 bg-blue-500/10 hover:bg-blue-500/20" : ""
                  }`}
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeletePin(activePinForView.id)}
                  title="Delete Pin"
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActivePinForView(null)}
                  className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content: What it is & How it works (or Edit Mode) */}
            {isEditingPin ? (
              <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800 border border-blue-500/30 rounded-2xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-100">Element / Feature Title:</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Feature title..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-100">UI Specification (What this is):</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe what this component is..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900 dark:text-slate-100">How it should work:</label>
                  <textarea
                    rows={3}
                    value={editHowItWorks}
                    onChange={(e) => setEditHowItWorks(e.target.value)}
                    className="w-full p-2.5 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Explain workflow or behavior..."
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => setIsEditingPin(false)}
                    className="h-8 px-3 rounded-lg border text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isActionLoading}
                    onClick={() => handleSaveEditPin(activePinForView.id)}
                    className="h-8 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    {isActionLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    What this is:
                  </span>
                  <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 font-normal leading-relaxed whitespace-pre-wrap">
                    {activePinForView.description}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    How it should work:
                  </span>
                  <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 font-normal leading-relaxed whitespace-pre-wrap">
                    {activePinForView.how_it_works}
                  </p>
                </div>

                {/* Proof of Agreement Stamp if Approved */}
                {activePinForView.status === "approved" && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-emerald-900 dark:text-emerald-200">
                    <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-800 dark:text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Proof of Client Agreement & Sign-off
                    </div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-semibold text-emerald-800 dark:text-emerald-300">Approved By:</span>{" "}
                      {activePinForView.approved_by_name}
                    </div>
                    <div>
                      <span className="font-semibold text-emerald-800 dark:text-emerald-300">Date & Time:</span>{" "}
                      {new Date(activePinForView.approved_at || "").toLocaleDateString()} at{" "}
                      {new Date(activePinForView.approved_at || "").toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Changes History Log */}
              {activePinForView.change_request_count > 0 && (
                <div className="space-y-2 border-t pt-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <History className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      Feedback & Change History ({activePinForView.change_request_count})
                    </span>
                    {activePinForView.last_change_requested_at && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Last:{" "}
                        {new Date(activePinForView.last_change_requested_at).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    )}
                  </div>

                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {activePinForView.changeRequests?.map((cr) => (
                      <div key={cr.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs sm:text-sm space-y-1.5 border">
                        <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-slate-100">
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold inline-flex items-center justify-center border border-indigo-200">
                              {(cr.requested_by || "U").slice(0, 1).toUpperCase()}
                            </span>
                            <span className="text-sm font-bold">{cr.requested_by}</span>
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {new Date(cr.created_at).toLocaleDateString()} at{" "}
                            {new Date(cr.created_at).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </span>
                        </div>
                        <p className="text-slate-900 dark:text-slate-100/90 pl-7 whitespace-pre-wrap leading-relaxed text-sm">
                          {cr.request_notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Request Change Section */}
              {showChangeRequestInput && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 mt-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
                      Add Feedback or Change
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                        {(clientName || "U").slice(0, 1).toUpperCase()}
                      </div>
                      <span>Posting as: <strong className="text-slate-900 dark:text-slate-100">{clientName}</strong></span>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Describe requested changes or feedback..."
                    value={changeNotes}
                    onChange={(e) => setChangeNotes(e.target.value)}
                    className="w-full text-sm p-3 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 resize-none focus:ring-2 focus:ring-rose-500"
                  />
                  <div className="flex justify-end gap-2.5">
                    <button
                      onClick={() => setShowChangeRequestInput(false)}
                      className="h-10 px-4 text-sm font-medium border rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRequestChange(activePinForView.id)}
                      disabled={isActionLoading}
                      className="h-10 px-5 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 cursor-pointer shadow-sm transition-colors disabled:opacity-50"
                    >
                      {isActionLoading ? "Submitting..." : "Submit Request"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Client Agreement Action Bar */}
            <div className="border-t pt-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="h-10 text-sm px-3.5 py-2 border rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700 w-full sm:w-48 font-medium focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowChangeRequestInput(!showChangeRequestInput)}
                  className={`h-10 px-4 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                    showChangeRequestInput
                      ? "bg-slate-100 text-slate-700 border-slate-300"
                      : "border-rose-500/30 text-rose-600 hover:bg-rose-500/10"
                  }`}
                >
                  {showChangeRequestInput ? "Cancel Request" : "Request Change"}
                </button>

                <button
                  type="button"
                  onClick={() => handleApprove(activePinForView.id)}
                  disabled={isActionLoading || activePinForView.status === "approved"}
                  className={`h-10 px-5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all ${
                    activePinForView.status === "approved"
                      ? "bg-emerald-600/60 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-sm cursor-pointer"
                  }`}
                >
                  <FileCheck className="w-4 h-4" />
                  {activePinForView.status === "approved" ? "Signed Off" : "Approve Design"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPinOverlay;
