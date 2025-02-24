import { ChainId } from 'config/chains'

export const DEFAULT_BLOCK_CONFLICT_TOLERANCE = 0

export const BLOCK_CONFLICT_TOLERANCE: { [key in ChainId]?: number } = {
  [ChainId.MAINNET]: 5,
  [ChainId.TESTNET]: 5,
}
