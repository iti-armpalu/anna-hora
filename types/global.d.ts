export { }

declare global {
    interface Window {
        __klaroGTMCallback?: () => void
        klaro?: unknown
        klaroConfig?: unknown
        dataLayer?: Record<string, unknown>[]
    }
}