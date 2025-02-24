import { useMemo } from 'react'
import { useLaunchpadFactory } from './useContracts'
import { useSingleCallResult } from '../state/multicall/hooks'

// returns undefined if fails to get contract,
// or contract service fee cannot be fetched
export function useLaunchpadFee(): string | undefined {
  const contract = useLaunchpadFactory()

  const serviceFee: string | undefined = useSingleCallResult({contract, functionName: 'serviceFee'})?.result?.toString()

  return useMemo(
    () => serviceFee,
    [serviceFee],
  )
}

export default useLaunchpadFee
