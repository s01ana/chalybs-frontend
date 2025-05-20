import { ChainId } from 'config/chains'
import { Percent } from 'libraries/swap-sdk-core'
import { ERC20Token } from './entities/token'

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const FACTORY_ADDRESS = '0x8Ea017AFeE6F617475cfB376b3fB5c02C157Be4e'

export const FACTORY_ADDRESS_MAP: Record<number, `0x${string}`> = {
  [ChainId.KAI]: FACTORY_ADDRESS,
  [ChainId.BSC]: FACTORY_ADDRESS,
}
export const INIT_CODE_HASH = '0x43c7edaa21399368126fbe2db43620d35e5a1d4c1e323c224af6c0a81c167212'

export const INIT_CODE_HASH_MAP: Record<number, `0x${string}`> = {
  [ChainId.KAI]: INIT_CODE_HASH,
  [ChainId.BSC]: INIT_CODE_HASH,
}

export const WETH9 = {
  [ChainId.KAI]: new ERC20Token(
    ChainId.KAI,
    '0xA62AA87A764F1e300721e80DB1a3B1BC71271b51',
    18,
    'WKEC',
    'Wrapped KEC',
    'https://kaichain.net'
  ),
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://bnbchain.org'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.KAI]: WETH9[ChainId.KAI],
  [ChainId.BSC]: WETH9[ChainId.BSC],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.KAI]: { name: 'KEC', symbol: 'KEC', decimals: 18 },
  [ChainId.BSC]: { name: 'BNB', symbol: 'BNB', decimals: 18 },
}
