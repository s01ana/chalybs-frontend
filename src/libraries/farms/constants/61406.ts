import { kaiTokens } from 'libraries/tokens'
import { SerializedFarmConfig } from '..'

const farms: SerializedFarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'CHL',
    lpAddress: '0x93610c31D03384dD001Ef62c096866d97Fec3aB2',
    quoteToken: kaiTokens.wkec,
    token: kaiTokens.gtoken,
    isTokenOnly: true,
  },
  {
    pid: 1,
    lpSymbol: 'CHL-KEC LP',
    lpAddress: '0xA99f447C4f7b41ea2262A183351a9Ee28C0CCD96',
    quoteToken: kaiTokens.wkec,
    token: kaiTokens.gtoken,
  },
  {
    pid: 2,
    lpSymbol: 'CHL-USDT LP',
    lpAddress: '0x300fA31c95Ba213aD997C42Cb663f9C66fDb26fC',
    quoteToken: kaiTokens.usdt,
    token: kaiTokens.gtoken,
  },
  {
    pid: 3,
    lpSymbol: 'KEC-USDT LP',
    lpAddress: '0x92fCe3C6A8289F5c57eD813B541FcF18ADFaB458',
    quoteToken: kaiTokens.usdt,
    token: kaiTokens.wkec,
  },
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
  ].map((p) => ({ ...p, lpAddress: p.lpAddress as `0x${string}`, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
