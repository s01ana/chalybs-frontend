export enum LockFormView {
  Create,
  Finish,
}

export interface LockData {
  token: string
  isLP: boolean
  name?: string
  symbol: string
  decimals: number
  balance?: string
  factory?: string
  token0?: string
  token1?: string
  owner: string
  title: string
  amount: number
  tgeTime: number
  tgeRate: number
  cycle: number
  cycleRate: number
}

export interface FinishData {
  id: string
  token: string
  hash: string
  chainId: number
}