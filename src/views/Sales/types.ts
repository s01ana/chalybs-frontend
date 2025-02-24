import { Currency } from "libraries/swap-sdk-core"

export enum LaunchpadFormView {
  VerifyToken,
  DeFiInfo,
  Socials,
  Review,
  Finish,
}

export interface TokenData {
  tokenAddress: string
  tokenName: string
  tokenDecimals: number
  tokenSymbol: string
  currency: Currency
  mainFee: string
  tokenFee: string
  listingOption: boolean
}

export interface Socials {
  website: string
  logoUrl: string
  facebook: string
  twitter: string
  github: string
  telegram: string
  instagram: string
  discord: string
  reddit: string
  youtube: string
  whitelist: string
  description: string
}

export interface Vesting {
  vestingFirst: string
  vestingPeriod: string
  vestingEach: string
}

export interface Presale {
  presaleRate: string
  whitelist: boolean
  softCap: string
  hardCap: string
  minimumBuy: string
  maximumBuy: string
  refundType: boolean
  router: string
  liquidity: string
  listingRate: string
  startTime: string
  endTime: string
  lockTime: string
  totalAmount: string
  // isVesting: boolean
  // vestingData?: Vesting
}

export interface FairLaunch {
  total: string
  whitelist: boolean
  softCap: string
  isMax: boolean
  maximumBuy: string
  router: string
  liquidity: string
  startTime: string
  endTime: string
  lockTime: string
  totalAmount: string
  // isVesting: boolean
  // vestingData?: Vesting
}

export interface FinishData {
  address: string
}

export interface SerializedLaunchpadData {
  chainId: number
  presaleType: string
  address: string
  logoUrl: string
  token: string
  buyToken: string
  tokenName: string
  tokenSymbol: string
  tokenDecimals: bigint
  total: bigint
  rate: bigint
  hardCap: bigint
  softCap: bigint
  maxBuy: bigint
  amount: bigint
  liquidity: bigint
  lockTime: bigint
  startTime: bigint
  endTime: bigint
  refundable: boolean
  claimable: boolean
  whitelist: string
  whiteListEnableTime: bigint
  owner: string
  status: string
}