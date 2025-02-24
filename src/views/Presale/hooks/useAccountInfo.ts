import { useMemo } from 'react'
import { erc20Abi, zeroAddress } from 'viem'
// import { shimmer2Tokens } from 'libraries/tokens'
import { useMultipleContractSingleData, useSingleCallResult } from 'state/multicall/hooks'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { usePresaleContract } from 'hooks/useContracts'
import { multicallABI } from 'config/abi/Multicall'
import { getMulticallAddress } from 'utils/addressHelpers'

export function useAccountInfo() {
    const { chainId, account } = useAccountActiveChain()
    const presale = usePresaleContract()
  
    const inputsAccount = useMemo(() => [account ?? zeroAddress] as const, [account])

    const userAmounts = useMultipleContractSingleData({
        abi: erc20Abi, 
        addresses: ["0xE412222441D636a1CBfEd0eE52f0ce9Aa3f4AEd5"],
        functionName: 'balanceOf',
        args: inputsAccount
    })?.map((t) => t?.result)

    const ethAmounts = useMultipleContractSingleData({
        abi: multicallABI, 
        addresses: [getMulticallAddress(chainId)],
        functionName: 'getEthBalance',
        args: inputsAccount
    })?.map((t) => t?.result)

    const deposit = useSingleCallResult({
        contract: presale, 
        functionName: 'deposits', 
        args: inputsAccount
    })?.result

    // const deposit = presale.read.deposits(inputsAccount);

    const claim = useSingleCallResult({
        contract: presale, 
        functionName: 'claims', 
        args: inputsAccount
    })?.result

    return {
        btfBalance: ethAmounts[0],
        defBalance: userAmounts[0],
        deposit,
        claim
    }
  }