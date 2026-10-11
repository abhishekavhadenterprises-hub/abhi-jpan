import { Variants } from "framer-motion";

/**
 * Standard Motion Easing Curves & Durations
 * Matches Home, About & Products signature feel
 */
export const EASINGS = {
  signature: [0.16, 1, 0.3, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  linear: "linear" as const,
};

export const DURATIONS = {
  instant: 0.15,
  fast: 0.3,
  medium: 0.5,
  smooth: 0.7,
  cinematic: 0.95,
  ambient: 3.2,
};

/* =========================================================================
   CATEGORY 1: CARD REVEAL ANIMATIONS (1-12)
   ========================================================================= */

// 1. Fade-Up Reveal
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.smooth, ease: EASINGS.signature },
  },
};

// 2. Fade-In Reveal
export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.medium, ease: EASINGS.smooth },
  },
};

// 3. Staggered Card Reveal (Container variant)
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
};

// 5. Fade-Down Reveal
export const fadeDownVariant: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.smooth, ease: EASINGS.signature },
  },
};

// 7. Slide-In Left
export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.smooth, ease: EASINGS.signature },
  },
};

// 8. Slide-In Right
export const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATIONS.smooth, ease: EASINGS.signature },
  },
};

// 9. Scale-In Reveal
export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATIONS.smooth, ease: EASINGS.signature },
  },
};

// 10. Blur-to-Clear Reveal
export const blurToClearVariant: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", scale: 0.96 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: DURATIONS.cinematic, ease: EASINGS.signature },
  },
};

/* =========================================================================
   CATEGORY 2: CARD HOVER PROPS (13-24)
   ========================================================================= */

// 13. Subtle Lift Hover Props (pass directly to motion.div)
export const subtleLiftHover = {
  whileHover: { y: -6, transition: { duration: 0.3, ease: EASINGS.signature } },
  whileTap: { scale: 0.98 },
};

// Bento Card Lift Hover
export const bentoCardLiftHover = {
  whileHover: { 
    y: -8, 
    scale: 1.01,
    transition: { duration: 0.35, ease: EASINGS.signature } 
  },
  whileTap: { scale: 0.98 },
};

/* =========================================================================
   CATEGORY 3: TEXT & HEADING ANIMATIONS (25-34)
   ========================================================================= */

// 28. Masked Text Inner Item (for line-by-line reveal inside overflow-hidden)
export const maskedLineRiseVariant: Variants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: DURATIONS.cinematic, ease: EASINGS.signature },
  },
};

// 30. Paragraph Fade-In
export const paragraphFadeVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.smooth, delay: 0.2, ease: EASINGS.signature },
  },
};

/* =========================================================================
   CATEGORY 5: UI & MODAL ANIMATIONS (45-54)
   ========================================================================= */

// 51. Modal Fade + Scale
export const modalDialogVariant: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATIONS.fast, ease: EASINGS.signature },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 12,
    transition: { duration: DURATIONS.instant, ease: "easeIn" },
  },
};

// 53. Dropdown Menu Variant
export const dropdownMenuVariant: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATIONS.instant, ease: EASINGS.signature },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.98,
    transition: { duration: DURATIONS.instant },
  },
};

/* =========================================================================
   CATEGORY 6: SECTION SCROLL WRAPPERS (55-60)
   ========================================================================= */

// 55. Section Fade-Up
export const sectionFadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.cinematic, ease: EASINGS.signature },
  },
};
