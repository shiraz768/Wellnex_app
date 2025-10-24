import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { containerVariants } from "../animations/motionVariants";

export default function AnimatedSection({
  id,
  className = "",
  children,
  variants = containerVariants,
  custom = {},
  once = true,
  rootMargin = "-50px",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: rootMargin });
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isInView) setForceVisible(true);
    }, 1000);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <motion.div
      id={id}
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView || forceVisible ? "visible" : "hidden"}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}
