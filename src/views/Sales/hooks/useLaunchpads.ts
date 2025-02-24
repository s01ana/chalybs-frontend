import { useMemo } from 'react'
import { erc20Abi } from 'viem'
import { useMultipleContractSingleData, useSingleCallResult } from 'state/multicall/hooks'
import { useLaunchpadFactory } from 'hooks/useContracts'

export function useLaunchpads(chainId: number, size: bigint, cursor: bigint): any[] {
    const contract = useLaunchpadFactory()
    const inputs = useMemo(() => [size, cursor] as const, [size, cursor])
    const results = useSingleCallResult(
      {contract,
      functionName: 'getLaunchpads',
      args: inputs}
    )?.result
  
    const names = useMultipleContractSingleData(
      {addresses: results?.map((r) => r.token),
      abi: erc20Abi,
      functionName: 'name',}
    )?.map((t) => t?.result)
  
    const symbols = useMultipleContractSingleData(
      {addresses: results?.map((r) => r.token),
      abi: erc20Abi,
      functionName: 'symbol',}
    )?.map((t) => t?.result)
  
    const decimals = useMultipleContractSingleData(
      {addresses: results?.map((r) => r.token),
      abi: erc20Abi,
      functionName: 'decimals',}
    )?.map((t) => t?.result)
  
    const result : any[] = []

    const now = Date.now() / 1000
  
    if (decimals?.[0]) {
      for (let index = 0; index < results?.length; index++) {
        const launchpad = results[index];

        let status = ""

        if (launchpad.refundable)
            status = "canceled"
        else if (launchpad.claimable)
            status = "success"
        else if (launchpad.startTime > now)
            status = "upcoming"
        else if (launchpad.startTime < now && launchpad.endTime > now)
            status = "live"
        else if (launchpad.endTime < now)
            status = "ended"
        else
            status = ""
    
        result.push({
            chainId,
            presaleType: launchpad.presaleType,
            address: launchpad.addr,
            logoUrl: launchpad.logoUrl,
            token: launchpad.token,
            buyToken: launchpad.buyToken,
            tokenName: names[index],
            tokenSymbol: symbols[index],
            tokenDecimals: Number(decimals[index]),
            total: launchpad.total,
            rate: launchpad.rate,
            hardCap: launchpad.hardCap,
            softCap: launchpad.softCap,
            maxBuy: launchpad.maxBuy,
            amount: launchpad.amount,
            liquidity: launchpad.liquidity,
            lockTime: launchpad.lockTime,
            startTime: launchpad.startTime,
            endTime: launchpad.endTime,
            refundable: launchpad.refundable,
            claimable: launchpad.claimable,
            whitelist: launchpad.whitelist,
            whiteListEnableTime: launchpad.whiteListEnableTime,
            status,
        })
      }
    }
  
    return result
  }