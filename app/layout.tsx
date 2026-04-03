import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cortex | AI Solutions Agency",
  description:
    "Egypt's first autonomous AI agency. We design, build, and manage complete brand ecosystems.",
  openGraph: {
    title: "Cortex | AI Solutions Agency",
    description:
      "Egypt's first autonomous AI agency. We design, build, and manage complete brand ecosystems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Cortex",
              description:
                "Egypt's first autonomous AI agency. We design, build, and manage complete brand ecosystems.",
              url: "https://cortex.agency",
            }),
          }}
        />
      </head>
      <body className="bg-cortex-base text-cortex-text-primary font-body antialiased selection:bg-cortex-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}
