import { ChainId } from 'config/chains'
import { Native, NativeCurrency } from 'libraries/swap-sdk'
import { useMemo } from 'react'
import { useActiveChainId } from './useActiveChainId'

export default function useNativeCurrency(overrideChainId?: ChainId): NativeCurrency {
  const { chainId } = useActiveChainId()
  return useMemo(() => {
    try {
      return Native.onChain(overrideChainId ?? chainId ?? ChainId.MAINNET)
    } catch (e) {
      return Native.onChain(ChainId.MAINNET)
    }
  }, [overrideChainId, chainId])
}
