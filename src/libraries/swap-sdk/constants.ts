import { ChainId } from 'config/chains'
import { Percent } from 'libraries/swap-sdk-core'
import { ERC20Token } from './entities/token'

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const FACTORY_ADDRESS = '0x8Ea017AFeE6F617475cfB376b3fB5c02C157Be4e'

export const FACTORY_ADDRESS_MAP: Record<number, `0x${string}`> = {
  [ChainId.MAINNET]: FACTORY_ADDRESS,
  [ChainId.TESTNET]: FACTORY_ADDRESS,
}
export const INIT_CODE_HASH = '0x43c7edaa21399368126fbe2db43620d35e5a1d4c1e323c224af6c0a81c167212'

export const INIT_CODE_HASH_MAP: Record<number, `0x${string}`> = {
  [ChainId.MAINNET]: INIT_CODE_HASH,
  [ChainId.TESTNET]: INIT_CODE_HASH,
}

export const WETH9 = {
  [ChainId.MAINNET]: new ERC20Token(
    ChainId.MAINNET,
    '0xA62AA87A764F1e300721e80DB1a3B1BC71271b51',
    18,
    'WKEC',
    'Wrapped KEC',
    'https://kaichain.net'
  ),
  [ChainId.TESTNET]: new ERC20Token(
    ChainId.TESTNET,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.MAINNET]: WETH9[ChainId.MAINNET],
  [ChainId.TESTNET]: WETH9[ChainId.TESTNET],
}

export const NATIVE: Record<
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.MAINNET]: { name: 'KEC', symbol: 'KEC', decimals: 18 },
  [ChainId.TESTNET]: { name: 'BTF', symbol: 'BTF', decimals: 18 },
}
