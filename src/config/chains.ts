import memoize from 'lodash/memoize'
import { Address, defineChain } from 'viem'

import { Chain } from 'wagmi/chains'

export const kaichain = defineChain({
  id: 61406,
  name: "KaiChain",
  nativeCurrency: {
    name: "KEC",
    symbol: "KEC",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.kaichain.net"]},
  },
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
  }
})

export const bsc = defineChain({
  id: 56,
  name: 'BNB Smart Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: { http: ['https://bsc-rpc.publicnode.com'] },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://bscscan.com',
      apiUrl: 'https://api.bscscan.com/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 15921452,
    },
  },
})

export enum ChainId {
  KAI = 61406,
  BSC = 56,
}

export const CHAIN_QUERY_NAME: Record<ChainId, string> = {
  [ChainId.KAI]: 'kaichain',
  [ChainId.BSC]: 'bsc',
}

export const CHAIN_NAME: Record<ChainId, string> = {
  [ChainId.KAI]: 'Kai Chain',
  [ChainId.BSC]: 'BNB Smart Chain',
}

const CHAIN_QUERY_NAME_TO_ID = Object.entries(CHAIN_QUERY_NAME).reduce((acc, [chainId, chainName]) => {
  return {
    [chainName.toLowerCase()]: chainId as unknown as ChainId,
    ...acc,
  }
}, {} as Record<string, ChainId>)

export const CHAINS: [Chain, ...Chain[]] = [
  kaichain,
  bsc
]

export const PUBLIC_NODES: Record<ChainId, string[] | readonly string[]> = {
  [ChainId.KAI]: [
    ...kaichain.rpcUrls.default.http,
  ],
  [ChainId.BSC]: [
    ...bsc.rpcUrls.default.http,
  ],
}

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] ? +CHAIN_QUERY_NAME_TO_ID[chainName.toLowerCase()] : undefined
})