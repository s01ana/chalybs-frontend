import { ChainId } from 'config/chains'

export default {
  masterChef: {
    [ChainId.KAI]: '0x3e8b72AF958Ebfb3fbC0063E39C6fe2D79bC2b02',
  },
  multiCall: {
    [ChainId.KAI]: '0x8E92A01668A326e45ffaD7857877D592e28d76d7',
    [ChainId.BSC]: '0xcA11bde05977b3631167028862bE2a173976CA11',
  },
  multisender: {
    [ChainId.KAI]: '0xfba3E8396DDc92FD199ac7230a34c08Cb98149f2'
  },
  locker: {
    [ChainId.KAI]: '0xe0c103df6e032AA5bBc303a5ABE30801F434927e',
  },
  launchpadFactory: {
    [ChainId.KAI]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  contribution: {
    [ChainId.KAI]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  smartRouter: {
    [ChainId.KAI]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  treasury: {
    [ChainId.KAI]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  presale: {
    [ChainId.KAI]: '0x3f62bF60F03aaef7Be417A67e1463cf4e5db1d07',
  },
  bridge: {
    [ChainId.KAI]: '0xD6aDeA2C763eB15667E7A883b70465bDB3DF7d96',
    [ChainId.BSC]: '0x3cFb96404EdC58ea328F59B92D62f5b1d38e95a6',
  },
} as const satisfies Record<string, Record<number, `0x${string}`>>
