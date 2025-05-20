import { ChainId } from 'config/chains'

export const DEFAULT_BLOCK_CONFLICT_TOLERANCE = 0

export const BLOCK_CONFLICT_TOLERANCE: { [key in ChainId]?: number } = {
  [ChainId.KAI]: 5,
  [ChainId.BSC]: 5,
}
