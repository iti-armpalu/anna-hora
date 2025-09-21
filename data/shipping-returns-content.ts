export interface ShippingOption {
    name: string
    cost: string
    deliveryTime: string
    description?: string
  }
  
  export interface ReturnStep {
    step: number
    title: string
    description: string
  }
  
  export interface ContactInfo {
    type: string
    value: string
    label: string
    href?: string
  }
  
  export interface ShippingReturnsContent {
    hero: {
      title: string
      subtitle: string
      description: string
    }
    shipping: {
      title: string
      description: string
      options: ShippingOption[]
      dispatch: {
        title: string
        cutoffTime: string
        trackingInfo: string
      }
      reassurance: string
    }
    returns: {
      title: string
      description: string
      policy: {
        window: string
        condition: string[]
        refundTimeline: string
        exceptions: string[]
      }
      steps: ReturnStep[]
      buttons: {
        loggedIn: string
        guest: string
      }
    }
    complaints: {
      title: string
      description: string
      resolution: string
      contacts: ContactInfo[]
    }
    support: {
      description: string
      links: {
        faq: string
        careInstructions: string
      }
    }
  }
  
  export const shippingReturnsContent: ShippingReturnsContent = {
    hero: {
      title: "Shipping, Returns & Care",
      subtitle: "Because your experience matters as much as your purchase.",
      description:
        "Explore our seamless shipping, returns, and support options designed with the same attention to detail as our silk pieces.",
    },
    shipping: {
      title: "Delivery Options",
      description: "Every order is carefully wrapped in our signature packaging and dispatched with care.",
      options: [
        {
          name: "Standard Shipping",
          cost: "£4.95",
          deliveryTime: "2-3 business days",
          description: "UK mainland delivery",
        },
        {
          name: "Express Shipping",
          cost: "£9.95",
          deliveryTime: "Next business day",
          description: "Order by 2pm for next day delivery",
        },
        {
          name: "Free Shipping",
          cost: "Complimentary",
          deliveryTime: "2-3 business days",
          description: "On orders over £150",
        },
        {
          name: "International Shipping",
          cost: "From £15",
          deliveryTime: "5-14 business days",
          description: "Available to EU, US, Canada & Australia",
        },
      ],
      dispatch: {
        title: "Dispatch Information",
        cutoffTime: "Orders placed before 2pm are dispatched the same day (Monday-Friday)",
        trackingInfo: "You'll receive tracking information via email once your order ships",
      },
      reassurance: "Every order is carefully wrapped in our signature packaging and dispatched with care.",
    },
    returns: {
      title: "Effortless Returns",
      description: "We want you to love your ANNA HORA piece. If it isn't perfect, returns are simple.",
      policy: {
        window: "30 days from delivery",
        condition: [
          "Items must be unworn and unwashed",
          "Original tags must be attached",
          "Items must be in original packaging",
        ],
        refundTimeline: "Refunds processed within 3-5 business days of receipt",
        exceptions: ["Final sale items cannot be returned", "Items damaged by customer misuse"],
      },
      steps: [
        {
          step: 1,
          title: "Request",
          description: "Initiate your return through your account or our guest form",
        },
        {
          step: 2,
          title: "Pack",
          description: "Carefully pack your item in the original packaging",
        },
        {
          step: 3,
          title: "Send Back",
          description: "Use the prepaid return label we provide",
        },
      ],
      buttons: {
        loggedIn: "Start a Return",
        guest: "Guest Return",
      },
    },
    complaints: {
      title: "We're Here to Make It Right",
      description:
        "If something isn't as expected, we want to hear from you. Our customer care team will work with you to resolve any issue promptly.",
      resolution: "Our aim is to resolve all concerns within 48 hours.",
      contacts: [
        {
          type: "phone",
          label: "Call us",
          value: "+420773583533",
          href: "tel:+420773583533",
        },
        {
          type: "email",
          label: "Email us",
          value: "customerservice@annahora.com",
          href: "mailto:customerservice@annahora.com",
        },
      ],
    },
    support: {
      description: "Looking for product care tips?",
      links: {
        faq: "FAQ",
        careInstructions: "Care Instructions",
      },
    },
  }
  