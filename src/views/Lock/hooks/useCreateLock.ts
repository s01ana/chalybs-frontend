import { useCallback } from 'react'
import { lock, vestingLock } from 'utils/calls/lock'
import { useLocker } from 'hooks/useContracts'

const useCreateLock = () => {
  const locker = useLocker()

  const handleCreateLock = useCallback(
    async (token, owner, isLP, amount, unlockDate, title) => {
      return lock(locker, token, owner, isLP, amount, unlockDate, title)
    },
    [locker],
  )

  const handleCreateVestingLock = useCallback(
    async (token, owner, isLP, amount, unlockDate, tgeBps, cycle, cycleBps, title) => {
      return vestingLock(locker, token, owner, isLP, amount, unlockDate, tgeBps, cycle, cycleBps, title)
    },
    [locker],
  )

  return { onCreateLock: handleCreateLock, onCreateVestingLock: handleCreateVestingLock }
}

export default useCreateLock
