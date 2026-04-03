"use client";

import { motion } from "framer-motion";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href = "#",
  target,
  rel,
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 cursor-pointer";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-cortex-accent text-black hover:shadow-[0_0_20px_rgba(200,255,0,0.3)]",
    ghost:
      "border border-cortex-text-subtle text-white hover:border-cortex-accent hover:text-cortex-accent",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
