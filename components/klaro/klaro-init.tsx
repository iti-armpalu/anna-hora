"use client"

import { useEffect } from "react"
import klaroConfig from "@/lib/klaro/config"

interface KlaroInitProps {
    gtmId: string
}

function injectGTM(gtmId: string): void {
    if (document.getElementById("gtm-script")) return

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
        event: "consent_update",
        analytics_storage: "granted",
        ad_storage: "granted",
    })

    const script = document.createElement("script")
    script.id = "gtm-script"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    document.head.appendChild(script)
}

export function KlaroInit({ gtmId }: KlaroInitProps) {
    useEffect(() => {
        // If user already consented in a previous session, fire GTM immediately
        const stored = localStorage.getItem("anna-hora-consent")
        if (stored) {
            try {
                const consent = JSON.parse(stored) as Record<string, boolean>
                if (consent.googleTagManager === true) {
                    injectGTM(gtmId)
                }
            } catch {
                // Corrupt storage — Klaro will re-prompt
            }
        }

        const Klaro = require("klaro/dist/klaro-no-css") as {
            setup: (config: unknown) => void
            getManager: () => {
                watch: (handler: {
                    update: (manager: { consents: Record<string, boolean> }) => void
                }) => void
            }
        }

        window.klaroConfig = klaroConfig
        Klaro.setup(klaroConfig)

        // Watch for consent changes via Klaro's manager API
        const manager = Klaro.getManager()
        manager.watch({
            update(manager) {
                const consents = manager.consents
                if (consents.googleTagManager === true) {
                    injectGTM(gtmId)
                } else {
                    // User declined — ensure denied signals are set
                    window.dataLayer = window.dataLayer || []
                    window.dataLayer.push({
                        event: "consent_update",
                        analytics_storage: "denied",
                        ad_storage: "denied",
                    })
                }
            },
        })
    }, [gtmId])

    return null
}