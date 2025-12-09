export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    avatar?: string
    createdAt: string
  }
  
  export interface AuthCredentials {
    email: string
    password: string
  }
  
  export interface SignUpData extends AuthCredentials {
    firstName: string
    lastName: string
    confirmPassword: string
  }
  
  export interface SocialProvider {
    id: string
    name: string
    icon: string
    color: string
  }
  
  // Demo credentials for testing
  export const demoCredentials = {
    email: "demo@silkloungewear.com",
    password: "demo123",
    user: {
      id: "demo-user-1",
      email: "demo@silkloungewear.com",
      firstName: "Anna",
      lastName: "Demo",
      avatar: "/elegant-woman-profile.png",
      createdAt: "2024-01-01T00:00:00Z",
    },
  }
  
  // Social login providers
  export const socialProviders: SocialProvider[] = [
    {
      id: "google",
      name: "Google",
      icon: "🔍",
      color: "#4285f4",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "📘",
      color: "#1877f2",
    },
    {
      id: "apple",
      name: "Apple",
      icon: "🍎",
      color: "#000000",
    },
  ]
  
  // Auth utility functions
  export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }
  
  export const authenticateUser = async (credentials: AuthCredentials): Promise<User | null> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Check demo credentials
    if (credentials.email === demoCredentials.email && credentials.password === demoCredentials.password) {
      return demoCredentials.user
    }
  
    return null
  }
  
  export const registerUser = async (signUpData: SignUpData): Promise<User | null> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
  
    // Simulate successful registration
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: signUpData.email,
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      createdAt: new Date().toISOString(),
    }
  
    return newUser
  }
  
  export const socialLogin = async (provider: string): Promise<User | null> => {
    // Simulate social login delay
    await new Promise((resolve) => setTimeout(resolve, 800))
  
    // Simulate successful social login
    const socialUser: User = {
      id: `${provider}-user-${Date.now()}`,
      email: `user@${provider}.com`,
      firstName: "Social",
      lastName: "User",
      avatar: ``,
      createdAt: new Date().toISOString(),
    }
  
    return socialUser
  }
  