import { parseEther } from "viem"

export const createLaunchpad = async (launchpad, values, addresses, strings, options, value) => {
  return launchpad.write.createNewLaunchpad([values, addresses, strings, options], {
    value
  })
}

export const createFairLaunchpad = async (launchpad, values, addresses, strings, options, value) => {
  return launchpad.write.createNewFairLaunch([values, addresses, strings, options], {
    value
  })
}

export const contributeForETH = async (launchpad, value) => {
  return launchpad.write.contributeETH({
    value: parseEther(value),
  })
}

export const contributeForToken = async (launchpad, value) => {
  return launchpad.write.contribute([value])
}

export const disableWhitelist = async (launchpad) => {
  return launchpad.write.disableWhiteList()
}

export const enableWhitelist = async (launchpad, value) => {
  return launchpad.write.enableWhiteList([value])
}

export const addWhiteList = async (launchpad, value) => {
  return launchpad.write.addWhiteList([value])
}

export const removeWhiteList = async (launchpad, value) => {
  return launchpad.write.removeWhiteList([value])
}

export const cancel = async (launchpad) => {
  return launchpad.write.cancel()
}

export const finalize = async (launchpad) => {
  return launchpad.write.finalize()
}

export const updateInfo = async (launchpad, value) => {
  return launchpad.write.updateInfo([value])
}

export const claim = async (launchpad) => {
  return launchpad.write.claim()
}

export const withdraw = async (launchpad) => {
  return launchpad.write.withdrawContribute()
}

export const emergencyWithdraw = async (launchpad) => {
  return launchpad.write.emergencyWithdraw()
}