import { ChainId } from 'config/chains'

import { mainnetTokens } from './constants/bitfinity'

export const allTokens = {
  [ChainId.MAINNET]: mainnetTokens,
  [ChainId.TESTNET]: mainnetTokens,
}
