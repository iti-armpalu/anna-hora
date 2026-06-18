const klaroConfig = {
    version: 1,
    storageMethod: "localStorage" as const,
    storageName: "anna-hora-consent",
    cookieDomain: ".annahora.com",
    privacyPolicy: "/privacy",
    poweredBy: undefined,
    acceptAll: true,
    hideDeclineAll: false,
    mustConsent: false,

    translations: {
        en: {
            consentNotice: {
                description:
                    "We use cookies to understand how you shop and to personalise your experience. You're always in control.",
            },
            acceptAll: "Accept",
            declineAll: "Decline",
            close: "Close",
            learnMore: "Let me choose",
            consentModal: {
                title: "Your privacy",
                description:
                    "We use cookies to analyse how you use our site and to personalise your experience. You can choose what you're comfortable with below.",
            },
            purposes: {
                analytics: "Analytics & Marketing",
            },
            googleTagManager: {
                description:
                    "Enables site analytics and personalised marketing, including Google Analytics and Klaviyo.",
            },
        },
    },

    apps: [
        {
            name: "googleTagManager",
            title: "Google Tag Manager",
            purposes: ["analytics"],
            default: false, // off by default — user must explicitly accept
        },
    ],
}

export default klaroConfig