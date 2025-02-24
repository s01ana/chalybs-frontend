export const lock = async (lockerContract, token, owner, isLP, amount, unlockDate, title) => {
  return lockerContract.write.lock([owner, token, isLP, amount, unlockDate, title], {})
}

export const vestingLock = async (lockerContract, token, owner, isLP, amount, unlockDate, tgeBps, cycle, cycleBps, title) => {
  return lockerContract.write.vestingLock([owner, token, isLP, amount, unlockDate, tgeBps, cycle, cycleBps, title], {})
}

export const transferOwnership = async (lockerContract, id, owner) => {
  return lockerContract.write.transferLockOwnership([id, owner], {})
}

export const renounceOwnership = async (lockerContract, id) => {
  return lockerContract.write.renounceLockOwnership([id], {})
}

export const editLockDescription = async (lockerContract, id, description) => {
  return lockerContract.write.editLockDescription([id, description], {})
}

export const editLock = async (lockerContract, id, amount, date) => {
  return lockerContract.write.editLock([id, amount, date], {})
}

export const unlock = async (lockerContract, id) => {
  return lockerContract.write.unlock([id], {})
}
