import { ChainId } from 'config/chains'
import { Address } from 'viem'

export const MULTICALL_ADDRESS: { [key in ChainId]?: Address } = {
  [ChainId.MAINNET]: '0xbFfE39cDD04f0183e0493c1Deb6E275c5cf84AdF',
  [ChainId.TESTNET]: '0xbFfE39cDD04f0183e0493c1Deb6E275c5cf84AdF',
}

export const MULTICALL3_ADDRESS = '0x8E92A01668A326e45ffaD7857877D592e28d76d7'

export const MULTICALL3_ADDRESSES: {
  [key in ChainId]?: Address
} = {
  [ChainId.MAINNET]: MULTICALL3_ADDRESS,
  [ChainId.TESTNET]: MULTICALL3_ADDRESS,
}
