# UI-RULES.md

## J PAN TUBULAR COMPONENTS LIMITED

---

# 01 — CORE RULE

Every interface must feel engineered.

The UI should communicate precision through:

* Alignment
* Spacing
* Typography
* Proportion
* Motion
* Consistency

---

# 02 — DO NOT CHANGE THE APPROVED BRAND SYSTEM

Do not randomly modify:

* Colors
* Typography
* Font hierarchy
* Core spacing
* Existing visual identity

All new components must inherit the established design system.

---

# 03 — 60 / 30 / 10 RULE

Maintain visual balance:

```text
60% — Primary surfaces/backgrounds
30% — Secondary surfaces/content
10% — Accent / interaction
```

Accent usage must remain controlled.

---

# 04 — FLUID UI & DEVICE-AWARE SETTLING (CRITICAL RULE)

### Never design or build a fixed, rigid UI.

The interface must be conceived and implemented as a **fluid, living layout** that gracefully settles into every device and viewport size without friction:

* **No Fixed-Dimension Traps**: Avoid hardcoded widths and rigid pixel heights that cause elements to break, stack unnaturally, or collide.
* **Device-Aware Spacing**: Every element, card, container, and text block must intuitively know its spacing, dynamic margins, and inner padding relative to the device (ultrawide, desktop, laptop, tablet, mobile, small mobile).
* **Zero Overlapping**: No text, badge, graphic, button, or container may ever clip, collide, or awkwardly overlap another element as the viewport resizes or dynamic content loads.
* **Fluid Scaling**: Use proportional sizing, fluid typography (`clamp()`), and flexible responsive containers (`minmax`, auto-fit, percent/rem tokens) so layouts stretch and contract with organic, engineered precision.
* **Natural Flow & Breathing Room**: Content must wrap and settle comfortably with calculated optical hierarchy regardless of aspect ratio or orientation.

---

# 05 — LAYOUT & GRID ARCHITECTURE

Use a consistent, responsive grid.

Desktop:

* Wide container
* Strong horizontal alignment
* Controlled content width
* Disciplined column distribution

Tablet:

* Adaptive grid
* Proportional spacing reduction
* Preserved visual hierarchy
* Natural multi-column wrapping

Mobile:

* Single-column-first
* Touch-calibrated spacing
* Zero horizontal overflow (`overflow-x: hidden`)
* Predictable linear reading flow

---

# 06 — CARDS

Cards should not become the default solution for every piece of content.

Use cards only when grouping information improves comprehension.

Avoid:

* excessive rounded cards
* excessive shadows
* card grids everywhere
* identical visual blocks

---

# 07 — BUTTONS

Primary buttons must be visually obvious.

Examples:

**Request a Quote**

**Explore Products**

**Talk to an Engineer**

Button interactions:

* subtle movement
* controlled hover
* clear active state
* keyboard focus
* mobile-friendly touch area (minimum 44x44px touch target)

---

# 08 — IMAGES

Images should be large, intentional and high quality.

Prefer real:

* products
* factories
* machinery
* engineers
* infrastructure

Avoid obvious AI-generated imagery.

---

# 09 — PRODUCT UI

Product interfaces should prioritize:

```text
PRODUCT
MATERIAL
APPLICATION
SPECIFICATION
ACTION
```

Technical information should remain readable and structured across all screen sizes.

---

# 10 — TECHNICAL CALLOUTS

Callouts should use:

* thin connector lines
* small technical labels
* restrained accent usage
* accurate anchor points

Do not make callouts decorative. Ensure callouts collapse gracefully or switch to inline badges on smaller viewports.

---

# 11 — 3D UI

3D viewers must provide:

* Rotate
* Inspect
* Controlled camera framing
* Reset view
* Specification hotspots when appropriate

Interaction discipline:

* Never hijack vertical page scrolling with wheel events.
* On mobile: prioritize touch interaction, prevent viewport lockup, reduce unnecessary shader complexity, and maintain smooth 60 FPS performance.

---

# 12 — AI UI

AI components must look native to J Pan.

Never introduce a separate "AI visual identity".

No:

* neon AI glow
* robot graphics
* purple AI gradients
* sci-fi dashboards

AI should appear as intelligent engineering functionality inside the engineering experience.

---

# 13 — FORMS

Forms should be:

* short
* clear
* trustworthy
* accessible

Use progressive disclosure for complex requirements.

---

# 14 — ACCESSIBILITY

All UI must support:

* keyboard navigation
* focus states
* semantic markup
* accessible labels
* readable contrast
* reduced motion

---

# 15 — RESPONSIVENESS & STABILITY

Nothing may:

* overflow horizontally
* overlap or collide
* become unreadable
* require hover to understand or interact
* break on small mobile devices

---

# 16 — PREMIUM RULE

Premium does not mean more decoration.

Premium means:

> **Better decisions.**
