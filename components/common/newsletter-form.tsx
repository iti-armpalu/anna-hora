"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NEWSLETTER_COPY } from "@/lib/config/newsletter"

type SubmitState = "idle" | "submitting" | "success" | "error"
type ApiResponse = { ok: boolean; error?: "invalid_email" | "server_error" }

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<SubmitState>("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const isSubmitting = state === "submitting"
  const isSuccess = state === "success"

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setState("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: form.get("website") }),
      })
      const result = (await response.json().catch(() => null)) as ApiResponse | null

      if (response.ok && result?.ok) {
        setState("success")
        return
      }
      setErrorMessage(
        result?.error === "invalid_email" ? NEWSLETTER_COPY.errors.invalidEmail : NEWSLETTER_COPY.errors.generic
      )
      setState("error")
    } catch (err: unknown) {
      console.error("Newsletter submit failed:", err instanceof Error ? err.message : err)
      setErrorMessage(NEWSLETTER_COPY.errors.generic)
      setState("error")
    }
  }

  return (
    // Both states share one grid cell, so the box is always as tall as the taller one — no magic height, no jump
    <div className="mx-auto grid max-w-2xl text-center">
      <div
        aria-hidden={isSuccess}
        inert={isSuccess}
        className={cn("col-start-1 row-start-1 flex flex-col items-center gap-field transition-opacity duration-300", isSuccess && "opacity-0")}
      >
        <h2 className="text-balance mb-0">{NEWSLETTER_COPY.heading}</h2>
        <p>{NEWSLETTER_COPY.description}</p>

        <form onSubmit={handleSubmit} className="mt-tight flex w-full max-w-lg flex-col gap-3 sm:flex-row">
          {/* Honeypot — off-screen and skipped by keyboard and screen readers */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
          <Input
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={NEWSLETTER_COPY.placeholder}
            aria-label={NEWSLETTER_COPY.emailLabel}
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? "newsletter-error" : undefined}
            disabled={isSubmitting}
            className="flex-1"
          />
          <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? NEWSLETTER_COPY.submitting : NEWSLETTER_COPY.cta}
          </Button>
        </form>

        {state === "error" && (
          <p id="newsletter-error" role="alert" className="text-small text-destructive">
            {errorMessage}
          </p>
        )}

        <p className="text-fine">
          {NEWSLETTER_COPY.privacy.text}{" "}
          <Link href={NEWSLETTER_COPY.privacy.href} className="underline underline-offset-4 hover:text-foreground">
            {NEWSLETTER_COPY.privacy.linkLabel}
          </Link>
          .
        </p>
      </div>

      {/* Stays visible — the confirmation shouldn't vanish before it's read */}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "col-start-1 row-start-1 flex flex-col items-center justify-center gap-field transition-opacity duration-300",
          !isSuccess && "pointer-events-none opacity-0"
        )}
      >
        {isSuccess && (
          <>
            <h2 className="mb-0">{NEWSLETTER_COPY.success.heading}</h2>
            <p>{NEWSLETTER_COPY.success.description}</p>
            <p className="text-fine">{NEWSLETTER_COPY.success.note}</p>
          </>
        )}
      </div>
    </div>
  )
}
