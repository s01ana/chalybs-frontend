import { ChainId } from 'config/chains'
import { ERC20Token } from 'libraries/swap-sdk'

export const GTOKEN_KAI = new ERC20Token(
  ChainId.KAI,
  '0x2673C91f6a8DcDe1E242AB51850e5352d558BEF6',
  18,
  'CHL',
  'Chalybs Token',
  'https://chalybs.finance/',
)

export const USDT_KAI = new ERC20Token(
  ChainId.KAI,
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
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
