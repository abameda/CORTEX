"use client"

import { useCallback, useEffect, useState, useRef } from "react"
import { ConversationProvider, useConversation } from "@elevenlabs/react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import Link from "next/link"
import { NeuralMark } from "@/components/ui/NeuralMark"
import type { AgentState } from "@/components/ui/orb"

const Orb = dynamic(
  () => import("@/components/ui/orb").then((mod) => mod.Orb),
  { ssr: false }
)

type CallPhase = "idle" | "connecting" | "active" | "ended" | "invalid"

// The call link carries a single-use token in the URL fragment (#t=...).
// Fragments are never sent to servers or in Referer headers. The token is
// exchanged by Cortex Ops for a short-lived conversation token for the private
// ElevenLabs agent, so calls can only be started from a link issued by staff.
const OPS_URL = (process.env.NEXT_PUBLIC_OPS_URL ?? "").replace(/\/+$/, "")
const BOOKING_URL = "https://cal.com/cortexai/discovery-call"

function readTokenFromHash() {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.hash.slice(1))
  const token = params.get("t")
  return token && /^[A-Za-z0-9_-]{43}$/.test(token) ? token : null
}

export default function CallPage() {
  return (
    <ConversationProvider>
      <CallUI />
    </ConversationProvider>
  )
}

function CallUI() {
  const [phase, setPhase] = useState<CallPhase>("idle")
  const [agentState, setAgentState] = useState<AgentState>(null)
  const [micError, setMicError] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [linkError, setLinkError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const limitRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tokenRef = useRef<string | null>(null)

  useEffect(() => {
    tokenRef.current = readTokenFromHash()
    if (!tokenRef.current) {
      setPhase("invalid")
      return
    }
    // Keep the token in memory only, out of the address bar and history.
    window.history.replaceState(null, "", window.location.pathname)
  }, [])

  const conversation = useConversation({
    onConnect: () => {
      setPhase("active")
      setAgentState("listening")
    },
    onDisconnect: () => {
      setPhase("ended")
      setAgentState(null)
      if (timerRef.current) clearInterval(timerRef.current)
      if (limitRef.current) clearTimeout(limitRef.current)
    },
    onError: (error) => {
      console.error("Conversation error:", error)
      setPhase("idle")
      setAgentState(null)
      if (timerRef.current) clearInterval(timerRef.current)
    },
    onModeChange: (mode) => {
      setAgentState(mode.mode === "speaking" ? "talking" : "listening")
    },
  })

  const startCall = useCallback(async () => {
    const token = tokenRef.current
    if (!token || !OPS_URL) {
      setPhase("invalid")
      return
    }

    setMicError(false)
    setLinkError(null)
    setPhase("connecting")
    setAgentState("thinking")
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setMicError(true)
      setPhase("idle")
      setAgentState(null)
      return
    }

    try {
      const response = await fetch(`${OPS_URL}/api/call/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        conversationToken?: string
        callSessionId?: string
        maxDurationSeconds?: number
        error?: string
      }

      if (response.status === 404) {
        tokenRef.current = null
        setLinkError(data.error ?? null)
        setPhase("invalid")
        setAgentState(null)
        return
      }

      if (!response.ok || !data.conversationToken || !data.callSessionId) {
        throw new Error(data.error || "Could not start the call.")
      }

      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)
      // Server-side limits are configured on the agent; this is a client-side backstop.
      const maxSeconds = Math.max(60, Math.min(data.maxDurationSeconds ?? 2100, 3600))
      limitRef.current = setTimeout(() => conversation.endSession(), maxSeconds * 1000)

      conversation.startSession({
        conversationToken: data.conversationToken,
        connectionType: "webrtc",
        dynamicVariables: { call_session_id: data.callSessionId },
      })
    } catch (error) {
      console.error("Failed to start call", error)
      setLinkError(error instanceof Error ? error.message : "Could not start the call.")
      setPhase("idle")
      setAgentState(null)
    }
  }, [conversation])

  const endCall = useCallback(async () => {
    conversation.endSession()
    setPhase("ended")
    setAgentState(null)
    if (timerRef.current) clearInterval(timerRef.current)
    if (limitRef.current) clearTimeout(limitRef.current)
  }, [conversation])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (limitRef.current) clearTimeout(limitRef.current)
    }
  }, [])

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0a0a0a_0%,#000000_70%)]" />

      {/* Subtle animated ambient glow behind orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)",
        }}
        animate={{
          scale: phase === "active" ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: phase === "active" ? 3 : 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo — top center */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <Link href="/">
          <NeuralMark variant="full" size={32} />
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-lg">
        {/* Orb container */}
        <motion.div
          className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-full"
          style={{
            boxShadow:
              phase === "active"
                ? "0 0 80px rgba(200,255,0,0.12), 0 0 30px rgba(200,255,0,0.06)"
                : "0 0 60px rgba(200,255,0,0.08)",
          }}
          animate={{
            boxShadow:
              phase === "active"
                ? [
                    "0 0 80px rgba(200,255,0,0.12), 0 0 30px rgba(200,255,0,0.06)",
                    "0 0 100px rgba(200,255,0,0.18), 0 0 40px rgba(200,255,0,0.1)",
                    "0 0 80px rgba(200,255,0,0.12), 0 0 30px rgba(200,255,0,0.06)",
                  ]
                : undefined,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full ring-1 ring-cortex-accent/10" />
          <Orb
            colors={["#C8FF00", "#7A9900"]}
            agentState={agentState}
            className="w-full h-full rounded-full overflow-hidden"
          />
        </motion.div>

        {/* Status text */}
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Your discovery call is ready
              </h1>
              <p className="text-cortex-text-secondary text-sm sm:text-base max-w-sm">
                Tap to begin your conversation with Cortex&apos;s AI consultant
              </p>
              {linkError && (
                <p className="text-red-400 text-sm mt-3">{linkError}</p>
              )}
              {micError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-3"
                >
                  Please allow microphone access to begin your call
                </motion.p>
              )}
            </motion.div>
          )}

          {phase === "invalid" && (
            <motion.div
              key="invalid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                This call link isn&apos;t valid
              </h1>
              <p className="text-cortex-text-secondary text-sm sm:text-base max-w-sm">
                {linkError ??
                  "Discovery calls start from the private link we send after you book. It may have expired or already been used."}
              </p>
            </motion.div>
          )}

          {phase === "connecting" && (
            <motion.div
              key="connecting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Connecting
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </h1>
              <p className="text-cortex-text-secondary text-sm">
                Preparing your AI consultant
              </p>
            </motion.div>
          )}

          {phase === "active" && (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                {agentState === "talking"
                  ? "Cortex is speaking"
                  : "Listening"}
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </h1>
              <p className="text-cortex-text-muted text-sm font-mono tabular-nums">
                {formatTime(elapsed)}
              </p>
            </motion.div>
          )}

          {phase === "ended" && (
            <motion.div
              key="ended"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Thank you for your time
              </h1>
              <p className="text-cortex-text-secondary text-sm sm:text-base max-w-sm">
                We&apos;ll prepare your brand package and reach out within 24
                hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startCall}
              className="px-8 py-3.5 bg-cortex-accent text-black font-display font-bold text-base rounded-lg transition-shadow hover:shadow-[0_0_24px_rgba(200,255,0,0.3)] cursor-pointer"
            >
              Start Call
            </motion.button>
          )}

          {phase === "connecting" && (
            <motion.button
              key="connecting-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              disabled
              className="px-8 py-3.5 bg-cortex-accent/50 text-black/50 font-display font-bold text-base rounded-lg cursor-not-allowed"
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Connecting...
              </motion.span>
            </motion.button>
          )}

          {phase === "active" && (
            <motion.button
              key="end"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={endCall}
              className="px-8 py-3.5 bg-cortex-elevated text-cortex-text-secondary font-display font-bold text-base rounded-lg border border-cortex-border hover:border-red-500/50 hover:text-red-400 transition-colors cursor-pointer"
            >
              End Call
            </motion.button>
          )}

          {phase === "invalid" && (
            <motion.div
              key="invalid-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-3.5 bg-cortex-accent text-black font-display font-bold text-base rounded-lg transition-shadow hover:shadow-[0_0_24px_rgba(200,255,0,0.3)]"
              >
                Book a discovery call
              </a>
            </motion.div>
          )}

          {phase === "ended" && (
            <motion.div
              key="ended-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Link
                href="/"
                className="inline-flex px-8 py-3.5 bg-cortex-accent text-black font-display font-bold text-base rounded-lg transition-shadow hover:shadow-[0_0_24px_rgba(200,255,0,0.3)]"
              >
                Return to Cortex
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cortex-text-muted text-xs z-10">
        Powered by Cortex AI
      </p>
    </div>
  )
}
