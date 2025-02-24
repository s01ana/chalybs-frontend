import { ChainId } from 'config/chains'
import { ERC20Token, WETH9 } from 'libraries/swap-sdk'
import { USDC, USDT, DAI_ARB, WBTC_ARB, GTOKEN } from './common'

export const mainnetTokens = { 
  wbtf: WETH9[ChainId.MAINNET],
  gtoken: GTOKEN[ChainId.MAINNET],
  test: new ERC20Token(
    ChainId.MAINNET,
    '0xE412222441D636a1CBfEd0eE52f0ce9Aa3f4AEd5',
    18,
    'TEST',
    'TEST',
  ),
}
