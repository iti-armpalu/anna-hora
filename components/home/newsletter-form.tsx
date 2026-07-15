"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { homeContent } from "@/components/home/_data"

type SubmitState = "idle" | "submitting" | "success" | "error"

const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again."

export default function NewsletterForm() {
    const { newsletter } = homeContent

    const [email, setEmail] = useState("")
    const [submitState, setSubmitState] = useState<SubmitState>("idle")
    const [errorMessage, setErrorMessage] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const trimmedEmail = email.trim()
        if (!trimmedEmail) return

        setSubmitState("submitting")
        setErrorMessage("")

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: trimmedEmail }),
            })

            const data = (await res.json().catch(() => null)) as
                | { ok?: boolean; error?: string }
                | null

            if (!res.ok || !data?.ok) {
                throw new Error(data?.error ?? GENERIC_ERROR_MESSAGE)
            }

            setSubmitState("success")
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : GENERIC_ERROR_MESSAGE

            setSubmitState("error")
            setErrorMessage(message)
        }
    }

    useEffect(() => {
        if (submitState !== "success") return

        const timer = setTimeout(() => {
            setSubmitState("idle")
            setEmail("")
        }, 4000)

        return () => clearTimeout(timer)
    }, [submitState])

    return (
        <div className="mx-auto max-w-2xl text-center">
            {/*
        Sized to fit the tallest state (form + inline error line).
        Children are absolutely positioned and won't grow this box —
        if the error copy or privacy line ever gets meaningfully
        longer, bump this rather than letting it silently overflow.
      */}
            <div className="relative min-h-[360px]">
                <AnimatePresence mode="wait">
                    {submitState === "success" ? (
                        <motion.div
                            key="success"
                            role="status"
                            aria-live="polite"
                            className="absolute inset-0 flex flex-col justify-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <h2 className="mb-3">{newsletter.success.heading}</h2>
                            <p className="mb-3">{newsletter.success.description}</p>
                            <p className="text-fine">{newsletter.success.note}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            className="absolute inset-0 flex flex-col justify-center"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <h2 className="mb-4">{newsletter.heading}</h2>
                            <p className="mb-8">{newsletter.description}</p>

                            <form
                                onSubmit={handleSubmit}
                                className="mx-auto flex w-full max-w-xs sm:max-w-lg flex-col gap-4 sm:flex-row"
                            >
                                <Input
                                    type="email"
                                    name="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    placeholder={newsletter.placeholder}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={submitState === "submitting"}
                                    className="flex-1"
                                    aria-label="Email address"
                                />
                                <Button type="submit" disabled={submitState === "submitting"}>
                                    {submitState === "submitting"
                                        ? newsletter.submittingLabel
                                        : newsletter.ctaLabel}
                                </Button>
                            </form>

                            {submitState === "error" && (
                                <p role="alert" className="mt-4 text-sm text-destructive">
                                    {errorMessage}
                                </p>
                            )}

                            <p className="mt-4 text-fine">{newsletter.privacy}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}