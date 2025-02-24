import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { addWhiteList, cancel, contributeForETH, contributeForToken, disableWhitelist, enableWhitelist, finalize, removeWhiteList, updateInfo, claim, withdraw, emergencyWithdraw } from 'utils/calls/launchpad'
import { useLaunchpad } from 'hooks/useContracts'

const usePool = (launchpad: `0x${string}`, isNative: boolean) => {
  const launchpadContract = useLaunchpad(launchpad)

  const handleDeposit = useCallback(async (amount: string, decimals: number) => {
    return isNative ? contributeForETH(launchpadContract, amount) : contributeForToken(launchpadContract, new BigNumber(amount).times(10**decimals).toJSON())
  }, [launchpadContract, isNative])

  const handleDisableWhitelist = useCallback(async () => {
    return disableWhitelist(launchpadContract)
  }, [launchpadContract])

  const handleEnableWhitelist = useCallback(async (value: string) => {
    return enableWhitelist(launchpadContract, value)
  }, [launchpadContract])

  const handleAddWhiteList = useCallback(async (value: string[]) => {
    return addWhiteList(launchpadContract, value)
  }, [launchpadContract])

  const handleRemoveWhiteList = useCallback(async (value: string[]) => {
    return removeWhiteList(launchpadContract, value)
  }, [launchpadContract])

  const handleCancel = useCallback(async () => {
    return cancel(launchpadContract)
  }, [launchpadContract])

  const handleFinalize = useCallback(async () => {
    return finalize(launchpadContract)
  }, [launchpadContract])

  const handleUpdateInfo = useCallback(async (value: string[]) => {
    return updateInfo(launchpadContract, value)
  }, [launchpadContract])

  const handleClaim = useCallback(async () => {
    return claim(launchpadContract)
  }, [launchpadContract])

  const handleWithdraw = useCallback(async () => {
    return withdraw(launchpadContract)
  }, [launchpadContract])

  const handleEmergencyWithdraw = useCallback(async () => {
    return emergencyWithdraw(launchpadContract)
  }, [launchpadContract])

  return { 
    onDeposit: handleDeposit,
    onDisableWhitelist: handleDisableWhitelist,
    onEnableWhitelist: handleEnableWhitelist,
    onAddWhitelist: handleAddWhiteList,
    onRemoveWhitelist: handleRemoveWhiteList,
    onCancel: handleCancel,
    onFinalize: handleFinalize,
    onUpdateInfo: handleUpdateInfo,
    onClaim: handleClaim,
    onWithdraw: handleWithdraw,
    onEmergencyWithdraw: handleEmergencyWithdraw,
  }
}

export default usePool
