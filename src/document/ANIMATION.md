# ANIMATION.md

## J PAN TUBULAR COMPONENTS LIMITED

---

# 01 — MOTION PRINCIPLE

Motion must feel:

**Precise.**

**Controlled.**

**Mechanical.**

**Smooth.**

**Intentional.**

The website should feel engineered rather than animated for decoration.

---

# 02 — QUALITY TARGET

Target:

**60 FPS**

Animations must remain smooth on:

* Desktop
* Laptop
* Tablet
* Mobile

---

# 03 — APPLE-LEVEL MOTION

Use:

* smooth easing
* subtle scale changes
* controlled opacity
* carefully timed transitions
* scroll-driven storytelling

Avoid excessive movement.

---

# 04 — STRIPE-LEVEL MOTION

Use motion to explain relationships.

Examples:

```text
INPUT
 ↓
PROCESS
 ↓
RESULT
```

or:

```text
MATERIAL
 ↓
COMPONENT
 ↓
APPLICATION
```

---

# 05 — RIVE-LEVEL INTERACTION

Where Rive is appropriate, use it for:

* interactive diagrams
* state transitions
* product/process explanation
* responsive technical illustrations
* interactive icons
* lightweight visual systems

Rive animations must remain performant and purposeful.

Do not use Rive merely because it is available.

---

# 06 — SCROLL ANIMATION

Preferred:

* fade + translate
* masked reveals
* image cropping
* product reveal
* controlled scale
* horizontal storytelling

Avoid:

* excessive parallax
* spinning pages
* unpredictable movement

---

# 07 — PRODUCT ANIMATION

For 3D products:

Possible sequence:

```text
PRODUCT ENTERS
      ↓
ROTATES TO HERO ANGLE
      ↓
HOTSPOTS APPEAR
      ↓
SPECIFICATION REVEALS
      ↓
USER INTERACTS
```

Rotation must stop or reduce when the user wants to inspect the product.

---

# 08 — ENGINEERING PROCESS ANIMATION

Process animation should communicate manufacturing stages.

Example:

```text
RAW MATERIAL
      ↓
FORMING
      ↓
PRECISION
      ↓
TESTING
      ↓
QUALITY
```

Each stage can activate as the user scrolls.

---

# 09 — MICROINTERACTIONS

Buttons:

* subtle movement
* background transition
* icon movement

Links:

* underline/indicator transition

Cards:

* subtle image movement
* controlled elevation

Never overdo hover effects.

---

# 10 — PAGE TRANSITIONS

Page transitions should be:

* short
* smooth
* non-blocking

Never create a long loading screen simply for visual effect.

---

# 11 — LOADING

Avoid fake loading experiences.

If a heavy 3D model needs loading:

Show an honest, minimal state:

```text
Loading 3D Model
```

Then reveal the model.

---

# 12 — REDUCED MOTION

Respect:

`prefers-reduced-motion`

When enabled:

* disable unnecessary motion
* reduce transitions
* simplify 3D
* preserve usability

---

# 13 — PERFORMANCE

Do not allow animation to cause:

* frame drops
* layout shifts
* excessive CPU usage
* memory issues
* mobile overheating

Prefer GPU-friendly properties.

Avoid unnecessary continuous animation.

---

# 14 — NO AI GIMMICKS

Never use:

* fake AI scanning
* glowing neural networks
* endless particles
* random data streams
* fake processing animations

AI should be experienced through intelligent functionality.
