import { parseEther } from "viem"

export const deposit = async (contract, amount) => {
    return contract.write.deposit({
        value: parseEther(amount)
    })
  }
  
export const claim = async (contract) => {
    return contract.write.claim()
}
  