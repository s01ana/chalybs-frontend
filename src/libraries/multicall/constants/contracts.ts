import { ChainId } from 'config/chains'
import { Address } from 'viem'

export const MULTICALL_ADDRESS: { [key in ChainId]?: Address } = {
  [ChainId.KAI]: '0xbFfE39cDD04f0183e0493c1Deb6E275c5cf84AdF',
  [ChainId.BSC]: '0xbFfE39cDD04f0183e0493c1Deb6E275c5cf84AdF',
}

export const MULTICALL3_ADDRESS = '0x8E92A01668A326e45ffaD7857877D592e28d76d7'

export const MULTICALL3_ADDRESSES: {
  [key in ChainId]?: Address
} = {
  [ChainId.KAI]: MULTICALL3_ADDRESS,
  [ChainId.BSC]: '0xcA11bde05977b3631167028862bE2a173976CA11',
}
