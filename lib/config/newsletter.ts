// Newsletter copy — shared by every page that shows the signup (home, journal)
export const NEWSLETTER_COPY = {
    heading: "Me-time letters",
    description:
        "Join our community and receive thoughtful notes about self-care, styling tips, and exclusive access to new collections. Sent occasionally, always with intention.",
    emailLabel: "Email address",
    placeholder: "Your email address",
    cta: "Subscribe",
    submitting: "Subscribing…",
    privacy: {
        text: "We respect your privacy. Unsubscribe at any time. Read our",
        linkLabel: "privacy policy",
        href: "/privacy",
    },
    success: {
        heading: "You're in!",
        description:
            "Thank you for subscribing. We'll send thoughtful notes, styling inspiration, and early access to new collections.",
        note: "Check your inbox for a note from us.",
    },
    errors: {
        invalidEmail: "Please enter a valid email address.",
        generic: "Something went wrong. Please try again.",
    },
} as const
