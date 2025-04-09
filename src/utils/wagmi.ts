import { CHAINS } from 'config/chains'
import memoize from 'lodash/memoize'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import { publicClient } from './viem'

export const chains = CHAINS

export const noopStorage = {
  getItem: (_key: any) => '',
  setItem: (_key: any, _value: any) => {},
  removeItem: (_key: any) => {},
}

const metadata = {
  name: 'Chalybs Finance',
  description: 'Chalybs Finance offers Swap, Liquidity, Farms, Pools on KaiChain.',
  url: 'https://chalybs.finance', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId: "14ac4d4db47ac7791cfea9a4562822b8",
  networks: chains
})

export const config = wagmiAdapter.wagmiConfig

createAppKit({
  adapters: [wagmiAdapter],
  projectId: "14ac4d4db47ac7791cfea9a4562822b8",
  allowUnsupportedChain: false,
  networks: CHAINS,
  metadata,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    onramp: false,
    email: false, // default to true
    socials: false,
    emailShowWallets: false, // default to true
    swaps: false,
    send: false,
    history: false
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-color-mix': '#1a202c',
    '--w3m-color-mix-strength': 10,
    '--w3m-accent': '#03FEFF',
    '--w3m-border-radius-master': '1.5px'
  },
  chainImages: {
    61406: "/images/chains/61406.png"
  }
})

export const CHAIN_IDS = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => (CHAIN_IDS as number[]).includes(chainId))
export const isChainTestnet = memoize((chainId: number) => {
  const found = chains.find((c) => c.id === chainId)
  return found ? 'testnet' in found : false
})

export { publicClient }
