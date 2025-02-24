import { CHAIN_IDS } from "utils/wagmi"

export interface SerializedLaunchpadPublicData {
  chainId: number
  presaleType: string
  token: string
  buyToken: string
  presaleStartTimestamp: number
  presaleEndTimestamp: number
  softCap: number
  hardCap?: number
  minBuy?: number
  maxBuy: number
  total?: number
  rate?: number
  listingRate: number
  lockPeriod: number
  isAutoListing?: boolean
  // vestingFirst: number
  // vestingPeriod: number
  // vestingEach: number
  mainFee: number
  tokenFee: number
  liquidity: number
  router: string
  locker: string
  feeAddress: string
  tokenBackAddress?: string
  whiteListEnableTime?: number
  totalDepositedBalance: number
  totalClaimedAmount: number
  investors: number
  refundable: boolean
  claimable: boolean
  initialized: boolean
  info: string
  logoUrl: string
  website: string
  twitter: string
  facebook: string
  github: string
  telegram: string
  instagram: string
  discord: string
  reddit: string
  youtube: string
  whitelist: string
  whitelistLength: number
}
  
export interface SerializedLaunchpadUserData {
  allowance: number
  balance: number
  deposit: number
  claimed: number
  vested: number
  owner: boolean
  whitelisted: boolean
}

export interface SerializedLaunchpad extends SerializedLaunchpadPublicData {
  userData?: SerializedLaunchpadUserData
}

export interface SerializedLaunchpadState {
  address: string
  data: SerializedLaunchpad
  chainId: number
  userDataLoaded: boolean
  loadingKeys: Record<string, boolean>
}

export const supportedChainId = CHAIN_IDS