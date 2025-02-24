import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'

export const deposit = async (treasuryContract, id, amount, gasPrice, gasLimit?: number) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (id === "0")
    return treasuryContract.depositBNB({
      value,
      gasLimit: gasLimit || DEFAULT_GAS_LIMIT,
      // gasPrice,
    })
  return treasuryContract.depositToken(id, value, {
    gasLimit: gasLimit || DEFAULT_GAS_LIMIT,
    // gasPrice,
  })
}

export const withdraw = async (treasuryContract, id, amount, gasPrice, gasLimit?: number) => {
  const value = new BigNumber(amount).toString()
  return treasuryContract.withdraw(id, value, {
    gasLimit: gasLimit || DEFAULT_GAS_LIMIT,
    // gasPrice,
  })
}
