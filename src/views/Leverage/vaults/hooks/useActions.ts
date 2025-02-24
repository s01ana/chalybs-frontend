import { useCallback } from 'react'
import { deposit, withdraw } from 'utils/calls/treasury'
import { useTreasury } from 'hooks/useContracts'
import { useGasPrice } from 'state/user/hooks'

const useActions = () => {
  const treasuryContract = useTreasury()
  const gasPrice = useGasPrice()

  const handleDeposit = useCallback(async (id: string, amount: string) => {
    return deposit(treasuryContract, id, amount, gasPrice)
  }, [treasuryContract, gasPrice])

  const handleWithdraw = useCallback(async (id: string, amount: string) => {
    return withdraw(treasuryContract, id, amount, gasPrice)
  }, [treasuryContract, gasPrice])

  return { onDeposit: handleDeposit, onWithdraw: handleWithdraw }
}

export default useActions
