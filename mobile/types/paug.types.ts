export interface IPayAsYouGo {
  id: number
  packageName: string
  // priceINR: number
  // priceUSD: number
  // priceEUR: number
  coinAllowance: number
  bonusCoins: number
  isActive: boolean
  isPopular: boolean
  description: string
  prices: IPaugPrice[]
}

export interface IPaugPrice {
  countryCode: string
  price: number
  actualPrice: number
  currency: string
}

export interface IPaugPackageResponse {
  paugs: IPayAsYouGo[]
}
