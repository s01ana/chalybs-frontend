import { BLOCKS_CLIENT, INFO_CLIENT } from 'config/constants/endpoints'
import { infoClient } from 'utils/graphql'

import { ChainId } from 'config/chains'
import {
  PCS_V2_START,
} from 'config/constants/info'

export type MultiChainName = 'ARB'

export const multiChainQueryMainToken = {
  ARB: 'ARB',
}

export const multiChainBlocksClient = {
  ARB: BLOCKS_CLIENT
}

export const multiChainStartTime = {
  ARB: PCS_V2_START
}

export const multiChainId = {
  ARB: ChainId.MAINNET
}

export const multiChainPaths = {
  [ChainId.MAINNET]: '',
}

export const multiChainQueryClient = {
  ARB: infoClient
}

export const multiChainQueryEndPoint = {
  ARB: INFO_CLIENT
}

export const multiChainScan = {
  ARB: 'ArbiScan',
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  return multiChainQueryClient[chainName]
}
