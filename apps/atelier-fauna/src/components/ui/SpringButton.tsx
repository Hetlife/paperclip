"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type SpringButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const SpringButton = forwardRef<HTMLButtonElement, SpringButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
      secondary:
        "bg-white/70 text-neutral-900 border border-black/[0.08] dark:bg-white/5 dark:text-white dark:border-white/[0.12]",
      ghost: "bg-transparent text-neutral-700 dark:text-neutral-300",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors",
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

SpringButton.displayName = "SpringButton";
