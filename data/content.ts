export const siteContent = {
    brand: {
      name: "ANNA HORA",
      tagline: "Silk That Whispers Luxury",
      description:
        "Crafting moments of quiet luxury through the finest silk loungewear, designed for those who understand that true elegance is found in simplicity.",
    },
  
    homepage: {
      hero: {
        title: "For the moments you keep to yourself",
        subtitle:
          "Discover our collection of premium silk loungewear, crafted for those who understand that true luxury lies in the quiet moments of self-care.",
        cta: "Explore Collection",
      },
  
      curated: {
        title: "Curated for Comfort",
        subtitle:
          "Each piece is thoughtfully designed to elevate your most intimate moments, crafted from the finest mulberry silk.",
      },
  
      about: {
        title: "The ANNA HORA Story",
        paragraphs: [
          "Founded on the belief that luxury should be accessible and sustainable, ANNA HORA creates timeless silk pieces that celebrate the modern woman's lifestyle. Our commitment to quality craftsmanship and ethical production ensures that every piece tells a story of elegance and responsibility.",
          "From our atelier to your wardrobe, each garment is a testament to the artistry of silk and the beauty of mindful design.",
        ],
        cta: "Learn More About Us",
      },
  
      newsletter: {
        title: "Stay Connected",
        subtitle:
          "Be the first to know about new collections, exclusive offers, and styling tips from the ANNA HORA team.",
        placeholder: "Enter your email",
        cta: "Subscribe",
      },
    },

    account: {
        tabs: [
          { id: "profile", label: "Profile", icon: "User" },
          { id: "orders", label: "Orders", icon: "Package" },
          { id: "wishlist", label: "Wishlist", icon: "Heart" },
          { id: "addresses", label: "Addresses", icon: "MapPin" },
          { id: "preferences", label: "Settings", icon: "Bell" },
        ],
    
        profile: {
          title: "Personal Information",
          passwordSection: "Password & Security",
          sizeOptions: ["XS", "S", "M", "L", "XL"],
          birthdayNote: "We'll send you a special birthday surprise",
        },
    
        orders: {
          title: "Order History",
          emptyState: {
            title: "No orders yet",
            description: "Your order history will appear here",
            cta: "Start Shopping",
          },
          actions: ["View Details", "Track Order", "Reorder"],
        },
    
        wishlist: {
          title: "My Wishlist",
          shareButton: "Share Wishlist",
          emptyState: {
            title: "Your wishlist is empty",
            description: "Save items you love for later",
            cta: "Continue Shopping",
          },
          actions: {
            addToBag: "Add to Bag",
            notifyWhenAvailable: "Notify When Available",
          },
        },
    
        addresses: {
          title: "Saved Addresses",
          addButton: "Add New Address",
          defaultBadge: "Default",
          actions: ["Edit", "Set as Default"],
        },
    
        preferences: {
          title: "Email Preferences",
          sizePreferences: "Size Preferences",
          notifications: [
            {
              id: "orderUpdates",
              label: "Order Updates",
              description: "Receive notifications about your orders",
            },
            {
              id: "smsNotifications",
              label: "SMS Notifications",
              description: "Get text updates for shipping and delivery",
            },
            {
              id: "newsletter",
              label: "Me-Time Letters",
              description: "Our thoughtful newsletter with styling tips and new arrivals",
            },
          ],
        },
    
        welcome: {
          greeting: "Welcome back",
          subtitle: "Manage your account and track your orders",
          signOutButton: "Sign Out",
        },
      },

  }
  