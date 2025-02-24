import { useCallback } from 'react'
import { MaxUint256 } from 'libraries/swap-sdk-core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useApprove = (token: any, treasury: string) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const handleApprove = useCallback(async () => {
    return callWithGasPrice(token, 'approve', [treasury, MaxUint256])
  }, [token, treasury, callWithGasPrice])

  return { onApprove: handleApprove }
}

export default useApprove
