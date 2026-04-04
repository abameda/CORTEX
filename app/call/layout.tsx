import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Discovery Call | Cortex",
  description:
    "Join your AI-powered discovery call with Cortex. Let our AI consultant understand your brand needs.",
  robots: { index: false, follow: false },
}

export default function CallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
