import { useCallback } from 'react'
import { deposit, claim } from 'utils/calls/presale'
import { usePresaleContract } from 'hooks/useContracts'

const usePresale = () => {
  const presale = usePresaleContract()

  const handleDeposit = useCallback(async (amount: string) => {
    return deposit(presale, amount)
  }, [presale])

  const handleClaim = useCallback(async () => {
    return claim(presale)
  }, [presale])

  return { 
    onDeposit: handleDeposit,
    onClaim: handleClaim,
  }
}

export default usePresale
