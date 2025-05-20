import { ChainId } from 'config/chains'
import { ERC20Token, WETH9 } from 'libraries/swap-sdk'
import { USDT, GTOKEN } from './common'

export const kaiTokens = { 
  wkec: WETH9[ChainId.KAI],
  gtoken: GTOKEN[ChainId.KAI],
  usdt: USDT[ChainId.KAI],
  test: new ERC20Token(
    ChainId.KAI,
    '0xE412222441D636a1CBfEd0eE52f0ce9Aa3f4AEd5',
    18,
    'TEST',
    'TEST',
  ),
}
