import { SerializedFarmsState } from 'libraries/farms'
import { parseEther } from 'viem'
import { VaultState } from 'libraries/vaults'
import { SerializedLaunchpadState } from './launchpad/types'

export enum GAS_PRICE {
  default = '1',
  fast = '4',
  instant = '5',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  rpcDefault: 'rpcDefault',
  default: parseEther(GAS_PRICE.default, 'gwei').toString(),
  fast: parseEther(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseEther(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseEther(GAS_PRICE.testnet, 'gwei').toString(),
}

export interface BigNumberToJson {
  type: 'BigNumber'
  hex: string
}

export type SerializedBigNumber = string

// Global state

export interface State {
  farms: SerializedFarmsState
  vaults: VaultState
  launchpad: SerializedLaunchpadState
}
