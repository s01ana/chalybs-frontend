export const unlockLiquidity = async (contributorContract, id, amount) => {
  return contributorContract.write.unlockLiquidity([id, amount], {})
}

export const unlockLiquidityETH = async (contributorContract, id, amount) => {
  return contributorContract.write.unlockLiquidityETH([id, amount], {})
}
