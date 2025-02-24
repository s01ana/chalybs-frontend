import { useCallback } from 'react'
import { unlock, transferOwnership, renounceOwnership, editLock, editLockDescription } from 'utils/calls/lock'
import { useLocker } from 'hooks/useContracts'

const useLock = () => {
  const locker = useLocker()

  const handleUnlock = useCallback(
    async (id) => {
      return unlock(locker, id)
    },
    [locker],
  )

  const handleTransferOwnership = useCallback(
    async (id, owner) => {
      return transferOwnership(locker, id, owner)
    },
    [locker],
  )

  const handleRenounceOwnership = useCallback(
    async (id) => {
      return renounceOwnership(locker, id)
    },
    [locker],
  )

  const handleEditLock = useCallback(
    async (id, amount, date) => {
      return editLock(locker, id, amount, date)
    },
    [locker],
  )

  const handleEditLockDescription = useCallback(
    async (id, description) => {
      return editLockDescription(locker, id, description)
    },
    [locker],
  )

  return { 
    onUnlock: handleUnlock, 
    onTransferOwnership: handleTransferOwnership,
    onRenounceOwnership: handleRenounceOwnership,
    onEditLock: handleEditLock,
    onEditLockDescription: handleEditLockDescription,
  }
}

export default useLock
