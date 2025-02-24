export enum TokenFormView {
  Create,
  Finish,
}

export interface TokenData {
  name: string
  symbol: string
  decimals: string
  totalSupply: string
  type: string
  liquidityGen?: LiquidityGen
}

export interface LiquidityGen {
  taxFee1: string
  liquidityFee1: string
  charityAddr1: string
  charityFee1: string
}

export interface FinishData {
  address?: `0x${string}` | null
  hash: string
  chainId: number
}