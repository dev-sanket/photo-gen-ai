export interface IPayAsYouGo {
  packageName: string
  // priceINR: number
  // priceUSD: number
  // priceEUR: number
  coinAllowance: number
  bonusCoins: number
  isActive: boolean
  prices: IPaugPrice[]
}

export interface IPaugPrice {
  countryCode: string
  price: number
  currency: string
}
