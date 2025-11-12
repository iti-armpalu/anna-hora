export interface WishlistContent {
    hero: {
      title: string
      subtitle: string
    }
    emptyState: {
      title: string
      subtitle: string
      ctaText: string
      ctaLink: string
    }
    accountPrompt: {
      title: string
      ctaButtons: {
        createAccount: string
        login: string
      }
      benefits: string[]
    }
    toastMessage: string
    stockMessages: {
      lowStock: (count: number) => string
      outOfStock: string
    }
    buttons: {
      addToBag: string
      remove: string
      shopCollection: string
    }
  }
  
  export const wishlistContent: WishlistContent = {
    hero: {
      title: "Your Wishlist",
      subtitle: "Save your favorite ANNA HORA pieces — create an account to keep them safe across all devices.",
    },
    emptyState: {
      title: "Your wishlist is waiting",
      subtitle: "Start browsing and add pieces you love by clicking the heart icon on any product.",
      ctaText: "Shop the Collection",
      ctaLink: "/shop",
    },
    accountPrompt: {
      title: "Create an account to save your wishlist permanently and get notified when items are back in stock.",
      ctaButtons: {
        createAccount: "Create Account",
        login: "Log In",
      },
      benefits: ["Access your wishlist from any device", "Receive restock alerts", "Early access to new collections"],
    },
    toastMessage: "Love these pieces? Create a free account to save them forever.",
    stockMessages: {
      lowStock: (count: number) => `Only ${count} left!`,
      outOfStock: "Currently sold out",
    },
    buttons: {
      addToBag: "Add to Bag",
      remove: "Remove",
      shopCollection: "Shop the Collection",
    },
  }
  