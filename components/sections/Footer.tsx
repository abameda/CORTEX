import { NeuralMark } from "@/components/ui/NeuralMark";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-cortex-surface border-t border-cortex-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <NeuralMark variant="full" size={28} />

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-cortex-text-secondary hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {["X", "LinkedIn", "Instagram"].map((platform) => (
              <a
                key={platform}
                href="#!"
                aria-label={platform}
                className="text-cortex-text-secondary hover:text-cortex-accent transition-colors text-sm"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cortex-border text-center">
          <p className="text-cortex-text-muted text-xs">
            &copy; 2026 Cortex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
