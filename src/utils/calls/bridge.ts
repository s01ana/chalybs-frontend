import BigNumber from 'bignumber.js'
import { parseEther } from 'viem'

export const burn = async (bridgeContract, pid, amount, decimals, fee) => {
  const value = new BigNumber(amount).times(10**decimals).toString()
  return bridgeContract.write.burn([pid, value], {
    value: fee,
  })
}

export const burnETH = async (bridgeContract, pid, amount, fee) => {
  return bridgeContract.write.burnETH([pid], {
    value: parseEther(new BigNumber(amount).toString()) + fee
  })
}
