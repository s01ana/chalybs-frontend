import { useCallback } from 'react'
import { burn, burnETH } from 'utils/calls/bridge'
import { useBridge } from 'hooks/useContracts'

const useBurnToken = (pid: number, isNative = false) => {
  const bridgeContract = useBridge()

  const handleStake = useCallback(
    async (amount: string, decimals: number, fee?: bigint) => {
      if (isNative) {
        return burnETH(bridgeContract, pid, amount, fee ?? 0n)
      }
      return burn(bridgeContract, pid, amount, decimals, fee ?? 0n)
    },
    [bridgeContract, pid, isNative],
  )

  return { onStake: handleStake }
}

export default useBurnToken
