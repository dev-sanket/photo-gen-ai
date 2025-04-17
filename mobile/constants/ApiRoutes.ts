// Base API URL from environment variable
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api'

// API Routes configuration
export const API_ROUTES = {
  // User routes
  USER: {
    GET_USER_BY_ID: (id: string) => `${BASE_URL}/user/${id}`
  },

  // Photo generation routes
  PHOTO: {
    GENERATE: `${BASE_URL}/photo/generate`,
    HISTORY: `${BASE_URL}/photo/history`,
    DETAILS: (id: string) => `${BASE_URL}/photo/${id}`,
    DELETE: (id: string) => `${BASE_URL}/photo/${id}`
  },

  // Payment routes
  PAYMENT: {
    CREATE_ORDER: `${BASE_URL}/payment/create-order`
    // VERIFY_PAYMENT: `${BASE_URL}/payment/verify`,
    // SUBSCRIPTION: {
    //   PLANS: `${BASE_URL}/payment/subscription/plans`,
    //   SUBSCRIBE: `${BASE_URL}/payment/subscription/subscribe`,
    //   CANCEL: `${BASE_URL}/payment/subscription/cancel`
    // }
  },

  // Subscription routes
  SUBSCRIPTION: {
    GET_PAUG_PACKAGES: (countryCode: string = 'US', currency: string = 'USD') =>
      `${BASE_URL}/subscription?country=${countryCode}&currency=${currency}`
  }
} as const

// Type for API routes
export type ApiRoutes = typeof API_ROUTES

// Helper function to get full URL
export const getApiUrl = (path: string) => `${BASE_URL}${path}`
