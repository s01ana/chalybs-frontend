import { ChainId } from 'config/chains'

export default {
  masterChef: {
    [ChainId.MAINNET]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  multiCall: {
    [ChainId.MAINNET]: '0x8E92A01668A326e45ffaD7857877D592e28d76d7',
  },
  multisender: {
    [ChainId.MAINNET]: '0xfba3E8396DDc92FD199ac7230a34c08Cb98149f2'
  },
  locker: {
    [ChainId.MAINNET]: '0xe0c103df6e032AA5bBc303a5ABE30801F434927e',
  },
  launchpadFactory: {
    [ChainId.MAINNET]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  contribution: {
    [ChainId.MAINNET]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  smartRouter: {
    [ChainId.MAINNET]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  treasury: {
    [ChainId.MAINNET]: '0x1e7F25Af19DD9c3229d43041867c2924af6dd304',
  },
  presale: {
    [ChainId.MAINNET]: '0x3f62bF60F03aaef7Be417A67e1463cf4e5db1d07',
  },
} as const satisfies Record<string, Record<number, `0x${string}`>>
