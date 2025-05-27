import { ChainId } from 'config/chains'
import { ERC20Token } from 'libraries/swap-sdk'

export const GTOKEN_KAI = new ERC20Token(
  ChainId.KAI,
  '0x93610c31D03384dD001Ef62c096866d97Fec3aB2',
  18,
  'CHL',
  'Chalybs Token',
  'https://chalybs.finance/',
)

export const USDT_KAI = new ERC20Token(
  ChainId.KAI,
  '0xDdC7b191BDa1815e9884209E16bEBf92aF27C75b',
  18,
  'USDT',
  'KRC20 USD',
  'https://tether.to/',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const GTOKEN = {
  [ChainId.KAI]: GTOKEN_KAI,
}

export const USDT = {
  [ChainId.KAI]: USDT_KAI,
  [ChainId.BSC]: USDT_BSC,
}
