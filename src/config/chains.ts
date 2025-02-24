import memoize from 'lodash/memoize'
import { Address } from 'viem'

import { Chain } from 'wagmi/chains'

export const kaichain = {
  blockExplorers: {
    default: {
      apiUrl: "https://explorer.kaichain.net/api",
      name: "KaiChain Explorer",
      url: "https://explorer.kaichain.net/",
    },
  },
  contracts: {
    multicall3: {
      address: "0x8E92A01668A326e45ffaD7857877D592e28d76d7" as Address,
      blockCreated: 27800021,
    },
  },
  fees: undefined,
  formatters: undefined,
  id: 61406,
  name: "KaiChain",
  nativeCurrency: {
    name: "KEC",
    symbol: "KEC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://mainnet-rpc.kaichain.net",
      ]
    }
  },
  serializers: undefined,
}

export enum ChainId {
  MAINNET = 61406,
  TESTNET = 355113,
}

export const CHAIN_QUERY_NAME: Record<ChainId, string> = {
  [ChainId.MAINNET]: 'mainnet',
  [ChainId.TESTNET]: 'testnet',
}

const CHAIN_QUERY_NAME_TO_ID = Object.entries(CHAIN_QUERY_NAME).reduce((acc, [chainId, chainName]) => {
  return {
    [chainName.toLowerCase()]: chainId as unknown as ChainId,
    ...acc,
  }
}, {} as Record<string, ChainId>)

export const CHAINS: [Chain, ...Chain[]] = [
  kaichain,
  // bitfinity_testnet
]

export const PUBLIC_NODES: Record<ChainId, string[] | readonly string[]> = {
  [ChainId.MAINNET]: [
    ...kaichain.rpcUrls.default.http,
  ],
  [ChainId.TESTNET]: [
    // ...bitfinityTestnet.rpcUrls.default.http,
  ],
}

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] ? +CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] : undefined
})