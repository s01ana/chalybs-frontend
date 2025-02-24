import { useCallback } from 'react'
import { MaxUint256 } from 'libraries/swap-sdk-core'
import { useERC20 } from 'hooks/useContracts'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useApprovePool = (token: ReturnType<typeof useERC20>, pool: string) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    return callWithGasPrice(token, 'approve', [pool as `0x${string}`, MaxUint256])
  }, [token, pool, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApprovePool
