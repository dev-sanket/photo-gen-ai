export interface IPaymentGatewayConfig {
  apiKey: string
  secretKey: string
  isLive: boolean
  [key: string]: any // For additional provider-specific config
}

export interface IPaymentRequest {
  amount: number
  currency: string
  customerEmail?: string
  customerName?: string
  notes?: Record<string, string>
  returnUrl?: string
  [key: string]: any // For additional provider-specific parameters
}

export interface IPaymentResponse {
  success: boolean
  transactionId?: string
  gatewayReference?: string
  redirectUrl?: string
  message?: string
  error?: any
  rawResponse?: any
}
