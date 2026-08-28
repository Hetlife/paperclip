import type { Transition } from "framer-motion";

export const APPLE_SPRING: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

export const GENTLE_EASE: Transition = {
  duration: 0.7,
  ease: [0.16, 1, 0.3, 1],
};

export const SMOOTH_MORPH: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 32,
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
