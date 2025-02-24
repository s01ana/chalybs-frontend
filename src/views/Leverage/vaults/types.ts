import { SerializedWrappedToken } from "libraries/token-lists"

export interface VaultConfigBaseProps {
  id: number
  name: string
  token: SerializedWrappedToken
}

export interface VaultPublicData extends VaultConfigBaseProps{
  dailyAPR?: number
  totalLocked?: string
  totalUsers?: number
  totalRewarded?: string
  maxDeposit?: string
  lockLimit?: string
}

export interface VaultUserData {
  allowance: string
  balance: string
  amount: string
  pendingReward: string
  lastLockTime: number
  lastRewardTime: number
  totalEarned: string
}

export interface Vault extends VaultPublicData {
  userData?: VaultUserData
}

export interface VaultState {
  vaults: Vault[]
  chainId?: number
  userDataLoaded: boolean
  loadingKeys?: Record<string, boolean>
}