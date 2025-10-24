import { useReducedMotion } from "framer-motion";

// Centralized motion variants and helpers
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delayChildren ?? 0.2,
      staggerChildren: custom.staggerChildren ?? 0.12,
    },
  }),
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 100 },
  },
};

export const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export const hoverLift = { whileHover: { y: -8 }, transition: { duration: 0.25 } };

// Hook to respect reduced motion preference
export function useRespectReducedMotion() {
  return useReducedMotion();
}

export default {
  containerVariants,
  itemVariants,
  ctaVariants,
  hoverLift,
};
