"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { homeContent } from "@/components/home/_data"

type SubmitState = "idle" | "submitting" | "success" | "error"

export default function NewsletterSection() {
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
        throw new Error(data?.error ?? "Something went wrong. Please try again.")
      }

      setSubmitState("success")
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."

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
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h2 className="mb-3 text-3xl font-light text-stone-800 lg:text-4xl">
                    {newsletter.success.heading}
                  </h2>
                  <p className="mb-3 text-stone-600">
                    {newsletter.success.description}
                  </p>
                  <p className="text-xs text-stone-500">
                    {newsletter.success.note}
                  </p>
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
                  <h2 className="mb-4 text-3xl font-light text-stone-800 lg:text-4xl">
                    {newsletter.heading}
                  </h2>
                  <p className="mb-8 text-stone-600">
                    {newsletter.description}
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mx-auto flex w-full max-w-lg flex-col gap-4 sm:flex-row"
                  >
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder={newsletter.placeholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={submitState === "submitting"}
                      className="flex-1 border-stone-300 focus:border-stone-500"
                      aria-label="Email address"
                    />
                    <Button
                      type="submit"
                      disabled={submitState === "submitting"}
                      className="max-w-xs"
                    >
                      {submitState === "submitting"
                        ? newsletter.submittingLabel
                        : newsletter.ctaLabel}
                    </Button>
                  </form>

                  {submitState === "error" && (
                    <p className="mt-4 text-sm text-red-600">{errorMessage}</p>
                  )}

                  <p className="mt-4 text-xs text-stone-500">
                    {newsletter.privacy}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}