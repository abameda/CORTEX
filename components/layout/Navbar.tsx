"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NeuralMark } from "@/components/ui/NeuralMark";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape key close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-cortex-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — sits above the mobile overlay */}
        <a href="#" className="relative z-[60]">
          <NeuralMark variant="full" size={32} />
        </a>

        {/* Desktop nav — unchanged */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-cortex-accent"
                    : "text-cortex-text-secondary hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Button
            variant="primary"
            size="sm"
            href="https://cal.com/cortexai/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Call
          </Button>
        </div>

        {/* Hamburger — always above overlay */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden relative z-[60] p-1 text-white"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <X size={24} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="block"
              >
                <Menu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

    </nav>

    {/* Mobile full-screen overlay — rendered via portal to escape nav's backdrop-filter stacking context */}
    {mounted && createPortal(
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-2 bg-black/95 backdrop-blur-xl md:hidden"
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="absolute top-5 right-6 p-1 text-white hover:text-cortex-accent transition-colors duration-200"
            >
              <X size={24} />
            </button>

            {/* Nav links */}
            <div className="flex flex-col items-center gap-7 mb-10">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`text-[19px] font-medium font-body transition-colors duration-200 ${
                      isActive
                        ? "text-cortex-accent"
                        : "text-white hover:text-cortex-accent"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href="https://cal.com/cortexai/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-cortex-accent text-black text-base font-medium font-body transition-opacity duration-200 hover:opacity-90"
            >
              Book a Discovery Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
