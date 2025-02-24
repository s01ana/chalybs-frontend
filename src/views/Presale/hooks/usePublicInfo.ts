import { useSingleCallResult } from 'state/multicall/hooks'
import { usePresaleContract } from 'hooks/useContracts'

export function usePublicInfo() {
    const presale = usePresaleContract()

    const totalInvestors = useSingleCallResult({
        contract: presale, 
        functionName: 'totalInvestors', 
    })?.result

    const totalDeposit = useSingleCallResult({
        contract: presale, 
        functionName: 'totalDeposit', 
    })?.result

    const start = useSingleCallResult({
        contract: presale, 
        functionName: 'sTime', 
    })?.result

    const end = useSingleCallResult({
        contract: presale, 
        functionName: 'eTime', 
    })?.result

    const finalized = useSingleCallResult({
        contract: presale, 
        functionName: 'finalized', 
    })?.result

    return {
        totalInvestors,
        totalDeposit,
        start,
        end,
        finalized
    }
  }