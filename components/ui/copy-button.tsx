"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CONTACT_COPY } from "@/lib/config/contact"

type CopyState = "idle" | "copied" | "failed"

const RESET_AFTER_MS = 2000

type Props = {
    value: string
    /** What's being copied, for screen readers, e.g. "email address" */
    label: string
    className?: string
}

/** Small "Copy" text action beside a value. Confirms success or failure in place. */
export function CopyButton({ value, label, className }: Props) {
    const [state, setState] = useState<CopyState>("idle")

    async function handleCopy(): Promise<void> {
        try {
            await navigator.clipboard.writeText(value)
            setState("copied")
        } catch (err: unknown) {
            // Clipboard is blocked in some browsers/contexts — tell the user rather than failing silently
            console.error("Copy failed:", err instanceof Error ? err.message : err)
            setState("failed")
        }
        setTimeout(() => setState("idle"), RESET_AFTER_MS)
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={`${CONTACT_COPY.copy} ${label}`}
            className={cn(
                "text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground",
                className
            )}
        >
            <span aria-live="polite">
                {state === "copied" ? CONTACT_COPY.copied : state === "failed" ? CONTACT_COPY.copyFailed : CONTACT_COPY.copy}
            </span>
        </button>
    )
}
