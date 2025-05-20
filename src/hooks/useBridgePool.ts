import { useMemo } from 'react'
import { useReadContracts } from 'libraries/wagmi'
import { bridgeABI } from 'config/abi/bridge'
import { getBridgeAddress } from 'utils/addressHelpers'

function useBridgePool(chainId: number, pid?: number) {

  const bridgeAddress = getBridgeAddress(chainId)

  const { data: results } = useReadContracts({
    query: {
      enabled: Boolean(bridgeAddress),
    },
    contracts: [
      {
        chainId,
        abi: bridgeABI,
        address: bridgeAddress ?? undefined,
        functionName: 'poolInfo',
        args: [BigInt(pid ?? 0)]
      },
      {
        chainId,
        abi: bridgeABI,
        address: bridgeAddress ?? undefined,
        functionName: 'fee'
      }
    ]
  })

  return useMemo(
    () => { 
      return {
        poolInfo: results?.[0].result,
        fee: results?.[1].result,
      }
    },
    [results],
  )
}

export default useBridgePool
