# Master Animation Catalog & Design System

This document serves as the single source of truth for all animation standards, motion curves, and interaction behaviors across the **J Pan Tubular Components Limited** web platform.

---

## Part 1: Benchmark Core Signature Animations (From Home, About & Products)

| ID | Name | Core Tech / Component | Description & Parameters |
|:---|:---|:---|:---|
| **SIG-01** | **Scroll-Wiped Text Clip Reveal** | `ScrollWipeHeading.tsx` | Continuous linear-gradient text-clip sweep (`duration: 1.5s, ease: "easeOut"`). Unveils from muted slate to `#0D2440` (light) / `white` (dark) with `#2E5E99` leading wiping front. |
| **SIG-02** | **Masked Editorial Headline Rise** | `AboutHero.tsx`, `Hero.tsx` | Line-by-line container `overflow-hidden` mask with inner `motion.span` translating from `y: "120%"` to `0%` (`duration: 0.95s, ease: [0.16, 1, 0.3, 1]`). |
| **SIG-03** | **Interactive Cursor Spotlight Glow** | `Hero.tsx` | Real-time pointer tracking updating CSS custom properties `--hero-x` and `--hero-y` with dynamic radial light cone `radial-gradient(circle 520px at X Y, rgba(46,94,153,0.20), transparent 75%)`. |
| **SIG-04** | **Cinematic Parallax Zoom & Drift** | `AboutHero.tsx`, `Hero.tsx`, `ProductsHero.tsx` | Background asset scales down from `scale: 1.15` to `1.0` on load (`duration: 3.2s`) and binds to scroll progress using Framer Motion `useScroll()` and `useTransform()`. |
| **SIG-05** | **3D Perspective Fanned Arc (Coverflow)** | `ProductsHero.tsx` | True 3D perspective (`perspective: 1200px, transformStyle: preserve-3d`). Cards fan out along an elliptical arc with rotational `rotateY` tilt and dynamic Z-plane depth. |
| **SIG-06** | **Frosted Bento Spring Lift & Specular Glow**| `AboutSnapshot.tsx`, `WhyChooseUs.tsx`, `ProductsGrid.tsx` | Micro-lift on hover (`hover:-translate-y-2`) with cubic-bezier spring physics (`duration: 0.4s, ease: [0.16, 1, 0.3, 1]`) paired with subtle specular border light. |
| **SIG-07** | **Inner Image Sub-Frame Expansion** | `ProductShowcase.tsx`, `Industries.tsx`, `Leadership.tsx` | Smooth image scale (`scale-105, duration: 700ms`) within constrained `rounded-3xl` container while outer card lifts. |
| **SIG-08** | **Staggered Bento Grid Cascade** | `WhyChooseUs.tsx`, `VisionMission.tsx`, `ProductsGrid.tsx` | Container variant with `staggerChildren: 0.08` and `delayChildren: 0.15`. Individual cards fade and translate upward from `y: 30` to `y: 0`. |
| **SIG-09** | **Architectural Background Motion** | `GridMotion.tsx`, `Scanner.tsx` | Fixed subtle canvas/SVG grid drift or OGL scanline with low opacity (`opacity-20` to `40%`) behind page content. |
| **SIG-10** | **3D Interactive Cobe Globe** | `ContactMap.tsx`, `CobeInteractiveGlobe.tsx` | WebGL canvas rotating interactive globe with marker pins, drag rotation, and dark/light atmospheric shading. |

---

## Part 2: 60 Curated Minimal UI Animations

### Category 1: Card Reveal Animations
1. **Fade-Up Reveal:** Card fades in while translating upward (`opacity: 0 -> 1, y: 20 -> 0`).
2. **Fade-In Reveal:** Pure opacity crossfade (`opacity: 0 -> 1`).
3. **Staggered Card Reveal:** Multiple cards reveal in sequence with an incremental child delay (e.g. `0.08s` per card).
4. **Cascade Reveal:** Directional diagonal or wave stagger through a multi-column grid layout.
5. **Fade-Down Reveal:** Card enters gently from above (`opacity: 0 -> 1, y: -20 -> 0`).
6. **Slide-Up Reveal:** Fast, crisp vertical translation from below into locked viewport position.
7. **Slide-In Left:** Horizontal entrance from the left margin (`opacity: 0 -> 1, x: -30 -> 0`).
8. **Slide-In Right:** Horizontal entrance from the right margin (`opacity: 0 -> 1, x: 30 -> 0`).
9. **Scale-In Reveal:** Card subtly scales up from slightly smaller scale (`scale: 0.95 -> 1.0, opacity: 0 -> 1`).
10. **Blur-to-Clear Reveal:** Card transitions from blurred state to sharp focus (`filter: blur(10px) -> blur(0px), opacity: 0 -> 1`).
11. **Grid Cascade Reveal:** Two-dimensional stagger based on column and row coordinates.
12. **Viewport Entry Reveal:** Triggered strictly when card reaches `0.2` or `0.3` threshold of the viewport.

---

### Category 2: Card Hover Animations
13. **Subtle Lift Hover:** Gentle vertical float (`translate-y: -4px` to `-8px`) on mouse enter.
14. **Border Color Transition:** Card border smoothly shifts from default opacity to `#2E5E99` or `#7BA4D0`.
15. **Shadow Elevation:** Box shadow blooms from subtle ambient shadow to deep floating drop-shadow.
16. **Image Zoom Hover:** Inner image scales to `1.05` or `1.08` with `duration: 500ms` while clipped inside card.
17. **Image Pan Hover:** Slight directional pan of the background image toward cursor movement.
18. **Arrow Nudge:** CTA link arrow translates right by `4px` (`group-hover:translate-x-1`).
19. **Underline Draw:** Sleek bottom line expands from `width: 0%` to `100%` on hover.
20. **Icon Shift:** Feature icon lifts or rotates subtly (`-translate-y-1` or `rotate-3`).
21. **Background Tint Transition:** Card surface background subtly shifts from white/navy to a tinted translucent tone.
22. **Content Reveal on Hover:** Secondary information or action button slides in or unmasks on hover.
23. **Image Overlay Fade:** Dark or brand-colored gradient scrim fades from `opacity: 0` to `opacity: 0.3`.
24. **Corner Accent Reveal:** Minimal corner indicator (or architectural crosshair) highlights upon hover.

---

### Category 3: Text & Heading Animations
25. **Heading Fade-Up:** Standard heading entrance translating upward into position.
26. **Word-by-Word Reveal:** Each word splits and reveals sequentially.
27. **Line-by-Line Reveal:** Multi-line headlines animate line by line.
28. **Masked Text Reveal:** Typography masked within an overflow container, rising cleanly without clipping descenders.
29. **Character Stagger Reveal:** Individual letters stagger-fade with subtle 3D rotational tilt.
30. **Paragraph Fade-In:** Subtitles and descriptive body copy fade in with gentle delay following heading.
31. **Text and Image Sequence:** Coordinated sequence where text rises first, immediately followed by the adjacent visual.
32. **Heading + Card Stagger:** Section title reveals first, then triggers the child card grid cascade.
33. **Number Count-Up:** Metric statistics dynamically count up from 0 to final target value.
34. **Text Highlight Reveal:** Key phrases or keywords animate with a gradient pill or colored highlight sweep.

---

### Category 4: Image & Product Animations
35. **Image Fade Reveal:** Smooth image crossfade upon entering the viewport.
36. **Image Slide Reveal:** Image slides smoothly from an adjacent coordinate into its frame.
37. **Clip-Path Image Reveal:** Diagonal, circular, or rectangular clip-path expands to unveil the visual.
38. **Image Wipe Reveal:** Horizontal or vertical wipe unveiling product details.
39. **Subtle Image Scale-In:** Imagery settles into view starting from a soft `1.08` scale down to `1.0`.
40. **Image Crossfade:** Smooth blending between different image states, technical angles, or tabs.
41. **Product Detail Reveal:** Specification chips and metallurgical callouts stagger in over the product canvas.
42. **Gallery Fade Transition:** Smooth crossfade when switching active gallery items or media tabs.
43. **Thumbnail Selection Transition:** Active thumbnail shifts border and elevation smoothly when selected.
44. **Image Parallax Lite:** Gentle scroll-linked movement differential (`useTransform`) between image and page flow.

---

### Category 5: Navigation & UI Animations
45. **Navigation Underline:** Active and hovered menu link underline slides smoothly horizontally.
46. **Navbar Background Transition:** Navbar transitions from transparent to floating glass capsule on scroll (`scrollY > 25`).
47. **Button Color Transition:** Primary buttons smoothly shift background and border on hover.
48. **Button Arrow Slide:** Trailing icon smoothly animates outward upon button hover.
49. **Accordion Expand-Collapse:** Smooth height animation (`auto` height with Framer Motion `AnimatePresence`).
50. **Tab Content Fade:** Tabbed panels crossfade smoothly with directional slide.
51. **Modal Fade + Scale:** Dialog backdrop fades while modal window scales in from `0.95` to `1.0`.
52. **Form Focus Transition:** Form inputs glow with `#2E5E99` border and ring elevation when focused.
53. **Dropdown Fade + Slide:** Dropdown navigation menus fade in and drop `8px` downward into view.
54. **Page Transition Fade:** Clean route transition fade ensuring flicker-free navigation.

---

### Category 6: Section & Scroll Animations
55. **Section Fade-Up:** Full section wrapper reveals gently as the user scrolls into its threshold.
56. **Alternating Content Reveal:** Alternating 2-column sections (Text-Left/Image-Right vs Image-Left/Text-Right) entering from opposite sides.
57. **Timeline Draw:** Central vertical or horizontal timeline path draws progress line as user scrolls down.
58. **Progressive Statistics Reveal:** Milestone KPIs reveal in sequential sequence with animated counters.
59. **Sticky Card Stack:** Cards pin and stack with smooth scale reductions as successive sections scroll over.
60. **Scroll Progress Indicator:** Sleek minimal progress bar tracking page reading completion along the viewport edge.

---

## Part 3: Standard Motion Tokens (Timing & Easing)

```ts
export const EASINGS = {
  // Signature Brand Spring & Ease (Home/About standard)
  signature: [0.16, 1, 0.3, 1],
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  linear: "linear"
};

export const DURATIONS = {
  instant: 0.15,
  fast: 0.3,
  medium: 0.5,
  smooth: 0.7,
  cinematic: 0.95,
  ambient: 3.2
};
```
