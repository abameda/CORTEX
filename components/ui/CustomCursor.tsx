"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "hover" | "text";

interface NeuralNode {
  x: number;
  y: number;
  createdAt: number;
}

const NODE_LIFETIME = 1600;   // ms a node lives
const NODE_INTERVAL = 75;     // ms between node spawns
const MAX_NODES = 22;
const CONNECTION_DIST = 120;  // px — max distance for a synapse line

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const nodesRef = useRef<NeuralNode[]>([]);
  const lastNodeTimeRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);

    if (!isTouch) {
      document.documentElement.classList.add("custom-cursor");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Spawn a neural node at intervals
      const now = Date.now();
      if (now - lastNodeTimeRef.current > NODE_INTERVAL) {
        nodesRef.current.push({ x: e.clientX, y: e.clientY, createdAt: now });
        if (nodesRef.current.length > MAX_NODES) {
          nodesRef.current.shift();
        }
        lastNodeTimeRef.current = now;
      }
    },
    [cursorX, cursorY]
  );

  const handleMouseDown = useCallback((e: MouseEvent) => {
    rippleIdRef.current += 1;
    setClickRipple({ x: e.clientX, y: e.clientY, id: rippleIdRef.current });
  }, []);

  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='pointer']"
      );
      const textBlock = target.closest(
        "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, label, [data-cursor='text']"
      );

      if (interactive) setVariant("hover");
      else if (textBlock) setVariant("text");
      else setVariant("default");
    };

    document.addEventListener("mouseover", handleOver);
    return () => document.removeEventListener("mouseover", handleOver);
  }, [isTouchDevice]);

  // Neural network canvas
  useEffect(() => {
    if (isTouchDevice) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Evict expired nodes
      nodesRef.current = nodesRef.current.filter(
        (n) => now - n.createdAt < NODE_LIFETIME
      );

      const nodes = nodesRef.current;

      // Draw synapse connections between close nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const tI = 1 - (now - nodes[i].createdAt) / NODE_LIFETIME;
            const tJ = 1 - (now - nodes[j].createdAt) / NODE_LIFETIME;
            const alpha = Math.min(tI, tJ) * (1 - dist / CONNECTION_DIST) * 0.35;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(200, 255, 0, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const t = 1 - (now - node.createdAt) / NODE_LIFETIME;
        // Pulse in then fade out
        const alpha = t < 0.15 ? t / 0.15 : t;

        // Outer glow
        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 10);
        grd.addColorStop(0, `rgba(200, 255, 0, ${alpha * 0.4})`);
        grd.addColorStop(1, `rgba(200, 255, 0, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(200, 255, 0, ${alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseDown, handleMouseLeave, handleMouseEnter]);

  if (isTouchDevice) return null;

  const dotWidth = variant === "text" ? 2 : variant === "hover" ? 0 : 5;
  const dotHeight = variant === "text" ? 18 : variant === "hover" ? 0 : 5;
  const dotBorderRadius = variant === "text" ? 2 : 9999;

  const ringSize = variant === "hover" ? 50 : variant === "text" ? 8 : 32;
  const ringBorderWidth = variant === "hover" ? 1.5 : variant === "text" ? 0 : 1.5;
  const ringBorderColor =
    variant === "hover" ? "rgba(200, 255, 0, 0.65)" : "rgba(200, 255, 0, 0.45)";
  const ringBg = variant === "hover" ? "rgba(200, 255, 0, 0.07)" : "transparent";

  return (
    <>
      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9996 }}
      />

      {/* Outer ring — spring-follows */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9998,
          borderStyle: "solid",
          borderColor: ringBorderColor,
          backgroundColor: ringBg,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          borderWidth: ringBorderWidth,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", damping: 22, stiffness: 280 },
          height: { type: "spring", damping: 22, stiffness: 280 },
          borderWidth: { duration: 0.15 },
          opacity: { duration: 0.12 },
        }}
      />

      {/* Inner dot — exact position, morphs for text mode */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          backgroundColor: "#C8FF00",
        }}
        animate={{
          width: dotWidth,
          height: dotHeight,
          borderRadius: dotBorderRadius,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", damping: 28, stiffness: 420 },
          height: { type: "spring", damping: 28, stiffness: 420 },
          borderRadius: { duration: 0 },
          opacity: { duration: 0.12 },
        }}
      />

      {/* Ambient glow */}
      <motion.div
        className="fixed pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9997,
          background: "radial-gradient(circle, rgba(200,255,0,0.25) 0%, transparent 65%)",
          filter: "blur(10px)",
        }}
        animate={{
          width: variant === "hover" ? 100 : 56,
          height: variant === "hover" ? 100 : 56,
          opacity: isVisible ? (variant === "hover" ? 0.18 : 0.08) : 0,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 180,
          opacity: { duration: 0.15 },
        }}
      />

      {/* Click ripple */}
      <AnimatePresence>
        {clickRipple && (
          <motion.div
            key={clickRipple.id}
            className="fixed pointer-events-none rounded-full"
            style={{
              left: clickRipple.x,
              top: clickRipple.y,
              translateX: "-50%",
              translateY: "-50%",
              zIndex: 9995,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgba(200, 255, 0, 0.5)",
            }}
            initial={{ width: 0, height: 0, opacity: 0.7 }}
            animate={{ width: 72, height: 72, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onAnimationComplete={() => setClickRipple(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
