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

type CallPhase = "idle" | "connecting" | "active" | "ended"

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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const conversation = useConversation({
    onConnect: () => {
      setPhase("active")
      setAgentState("listening")
    },
    onDisconnect: () => {
      setPhase("ended")
      setAgentState(null)
      if (timerRef.current) clearInterval(timerRef.current)
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
    setMicError(false)
    setPhase("connecting")
    setAgentState("thinking")
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000)
      conversation.startSession({
        agentId: "agent_6901kn9bk199e2gb9ygpjtgt7kv1",
      })
    } catch {
      console.error("Failed to start call")
      setMicError(true)
      setPhase("idle")
      setAgentState(null)
    }
  }, [conversation])

  const endCall = useCallback(async () => {
    conversation.endSession()
    setPhase("ended")
    setAgentState(null)
    if (timerRef.current) clearInterval(timerRef.current)
  }, [conversation])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
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
