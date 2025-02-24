import { ChainId } from 'config/chains'
import { ERC20Token } from 'libraries/swap-sdk'

export const GTOKEN_ARB = new ERC20Token(
  ChainId.MAINNET,
  '0x2673C91f6a8DcDe1E242AB51850e5352d558BEF6',
  18,
  'CHL',
  'Chalybs Token',
  'https://chalybs.finance/',
)

export const USDC_ARB = new ERC20Token(
  ChainId.MAINNET,
  '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  6,
  'USDC',
  'USD Coin',
)

export const USDT_ARB = new ERC20Token(
  ChainId.MAINNET,
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  6,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const DAI_ARB = new ERC20Token(
  ChainId.MAINNET,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai Stablecoin',
  'https://makerdao.com/',
)

export const WBTC_ARB = new ERC20Token(
  ChainId.MAINNET,
  '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  8,
  'WBTC',
  'Wrapped BTC',
)

export const GTOKEN = {
  [ChainId.MAINNET]: GTOKEN_ARB,
}

export const USDC = {
  [ChainId.MAINNET]: USDC_ARB,
}

export const USDT = {
  [ChainId.MAINNET]: USDT_ARB,
}

export const DAI = {
  [ChainId.MAINNET]: DAI_ARB,
}
