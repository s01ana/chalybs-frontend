import { ChainId } from 'config/chains'

import { kaiTokens } from './constants/kai'

export const allTokens = {
  [ChainId.KAI]: kaiTokens,
  [ChainId.BSC]: kaiTokens,
}
