import { mainnetTokens } from 'libraries/tokens'
import { SerializedFarmConfig } from '..'

const farms: SerializedFarmConfig[] = [
  // {
  //   pid: 0,
  //   lpSymbol: 'DEF',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.usdt,
  //   token: mainnetTokens.gtoken,
  //   isTokenOnly: true,
  // },
  // {
  //   pid: 1,
  //   lpSymbol: 'DEF-ETH LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.weth,
  //   token: mainnetTokens.gtoken,
  // },
  // {
  //   pid: 2,
  //   lpSymbol: 'DEF-USDT LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.usdt,
  //   token: mainnetTokens.gtoken,
  // },
  // {
  //   pid: 3,
  //   lpSymbol: 'DEF-USDC LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.usdc,
  //   token: mainnetTokens.gtoken,
  // },
  // {
  //   pid: 4,
  //   lpSymbol: 'DEF-DAI LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.dai,
  //   token: mainnetTokens.gtoken,
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'ETH-USDT LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.weth,
  //   token: mainnetTokens.usdt,
  // },
  // {
  //   pid: 6,
  //   lpSymbol: 'ETH-USDC LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.weth,
  //   token: mainnetTokens.usdc,
  // },
  // {
  //   pid: 7,
  //   lpSymbol: 'USDT-USDC LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.usdt,
  //   token: mainnetTokens.usdc,
  // },
  // {
  //   pid: 8,
  //   lpSymbol: 'USDC-DAI LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.usdc,
  //   token: mainnetTokens.dai,
  // },
  // {
  //   pid: 9,
  //   lpSymbol: 'ETH-ARB LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.weth,
  //   token: mainnetTokens.arb,
  // },
  // {
  //   pid: 10,
  //   lpSymbol: 'USDC-ARB LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.usdc,
  //   token: mainnetTokens.arb,
  // },
  // {
  //   pid: 11,
  //   lpSymbol: 'USDT-ARB LP',
  //   lpAddress: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  //   quoteToken: mainnetTokens.usdt,
  //   token: mainnetTokens.arb,
  // },
// ].map((p) => ({ ...p, lpAddress: p.lpAddress as `0x${string}`, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))
]

export default farms
