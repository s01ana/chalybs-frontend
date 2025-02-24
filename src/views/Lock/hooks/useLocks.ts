import { useMemo } from 'react'
import { Address, erc20Abi, zeroAddress } from 'viem'
import { lpTokenABI } from 'config/abi/lpTokenAbi'
import { useMultipleContractSingleData, useSingleCallResult } from 'state/multicall/hooks'
import { useLocker } from 'hooks/useContracts'

// returns undefined if fails to get contract,
// or contract service fee cannot be fetched
export function useLPLockedCount(): string | undefined {
  const contract = useLocker()

  const count: string | undefined = useSingleCallResult({contract, functionName: 'allLpTokenLockedCount'})?.result?.toString()

  return useMemo(
    () => count,
    [count],
  )
}

export function useTokenLockedCount(): string | undefined {
  const contract = useLocker()

  const count: string | undefined = useSingleCallResult({contract, functionName: 'allNormalTokenLockedCount'})?.result?.toString()

  return useMemo(
    () => count,
    [count],
  )
}

export function useLPLockedCountForUser(user?: Address): string | undefined {
  const contract = useLocker()

  const inputs = useMemo(() => [user ?? zeroAddress] as const, [user])

  const count: string | undefined = useSingleCallResult({contract, functionName: 'lpLockCountForUser', args: inputs})?.result?.toString()

  return useMemo(
    () => count,
    [count],
  )
}

export function useTokenLockedCountForUser(user?: Address): string | undefined {
  const contract = useLocker()

  const inputs = useMemo(() => [user ?? zeroAddress] as const, [user])

  const count = useSingleCallResult({contract, functionName: 'normalLockCountForUser', args: inputs})?.result?.toString()

  return useMemo(
    () => count,
    [count],
  )
}

export function useTokenLocks(start: bigint, end: bigint, chainId: number): any[] {
  const contract = useLocker()
  const inputs = useMemo(() => [start, end] as const, [start, end])
  const results = useSingleCallResult({
    contract,
    functionName: 'getCumulativeNormalTokenLockInfo',
    args: inputs
  })?.result

  const names = useMultipleContractSingleData({
    addresses: results?.map((r) => r.token),
    abi: erc20Abi,
    functionName: 'name'
  })?.map((t) => t?.result)

  const symbols = useMultipleContractSingleData({
    addresses: results?.map((r) => r.token),
    abi: erc20Abi,
    functionName: 'symbol',
  })?.map((t) => t?.result)

  const decimals = useMultipleContractSingleData({
    addresses: results?.map((r) => r.token),
    abi: erc20Abi,
    functionName: 'decimals',
  })?.map((t) => t?.result)

  const result : any[] = []

  if (decimals) {
    for (let index = 0; index < results?.length; index++) {
      const lock = results[index];
  
      result.push({
        chainId,
        address: lock.token,
        factory: lock.factory,
        name: names[index],
        symbol: symbols[index],
        decimals: Number(decimals[index]),
        token0Name: "",
        token1Name: "",
        token0Symbol: "",
        token1Symbol: "",
        token0Decimals: 0,
        token1Decimals: 0,
        amount: lock.amount.toString(),
      })
    }
  }

  return result
}

export function useLPLocks(start: bigint, end: bigint, chainId: number): any[] {
  const contract = useLocker()
  const inputs = useMemo(() => [start, end] as const, [start, end])
  const results = useSingleCallResult({
    contract,
    functionName: 'getCumulativeLpTokenLockInfo',
    args: inputs
  })?.result

  const token0s = useMultipleContractSingleData({
    addresses: results?.map((r) => r.token),
    abi: lpTokenABI,
    functionName: 'token0',
  })?.map((t) => t?.result)

  const token1s = useMultipleContractSingleData({
    addresses: results?.map((r) => r.token),
    abi: lpTokenABI,
    functionName: 'token1',
  })?.map((t) => t?.result)

  const name0s = useMultipleContractSingleData({
    addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',
  })?.map((t) => t?.result)

  const name1s = useMultipleContractSingleData({
    addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',
  })?.map((t) => t?.result)

  const symbol0s = useMultipleContractSingleData({
    addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',
  })?.map((t) => t?.result)

  const symbol1s = useMultipleContractSingleData({
    addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',
  })?.map((t) => t?.result)

  const decimals0s = useMultipleContractSingleData({
    addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',
  })?.map((t) => t?.result)

  const decimals1s = useMultipleContractSingleData({
    addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',
  })?.map((t) => t?.result)

  const result : any[] = []

  if (decimals1s) {
    for (let index = 0; index < results?.length; index++) {
      const lock = results[index];
  
      result.push({
        chainId,
        address: lock.token,
        factory: lock.factory,
        name: "",
        symbol: "",
        decimals: 0,
        token0Name: name0s[index],
        token1Name: name1s[index],
        token0Symbol: symbol0s[index],
        token1Symbol: symbol1s[index],
        token0Decimals: Number(decimals0s[index]),
        token1Decimals: Number(decimals1s[index]),
        amount: lock.amount.toString(),
      })
    }
  }

  return result
}

export function useTokenInfo(query: Address, chainId: number): any {
  const contract = useLocker()
  const inputs = useMemo(() => [query] as const, [query])
  const results: any | undefined = useSingleCallResult(
    {contract,
    functionName: 'cumulativeLockInfo',
    args: inputs}
  )?.result

  const token0s = useMultipleContractSingleData(
    {addresses: [results?.[0]],
    abi: lpTokenABI,
    functionName: 'token0',}
  )?.map((t) => t?.result)

  const token1s = useMultipleContractSingleData(
    {addresses: [results?.[0]],
    abi: lpTokenABI,
    functionName: 'token1',}
  )?.map((t) => t?.result)

  const name0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: lpTokenABI,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const name1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const symbol0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const symbol1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const decimals0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',}
  )?.map((t) => t?.result)

  const decimals1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',}
  )?.map((t) => t?.result)

  const names = useMultipleContractSingleData(
    {addresses: [results?.[0]],
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const symbols = useMultipleContractSingleData(
    {addresses: [results?.[0]],
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const decimals = useMultipleContractSingleData(
    {addresses: [results?.[0]],
    abi: erc20Abi,
    functionName: 'decimals'}
  )?.map((t) => t?.result)

  return {
    chainId,
    address: results?.[0],
    factory: results?.[1],
    name: names,
    symbol: symbols,
    decimals: Number(decimals),
    token0Name: name0s,
    token1Name: name1s,
    token0Symbol: symbol0s,
    token1Symbol: symbol1s,
    token0Decimals: Number(decimals0s),
    token1Decimals: Number(decimals1s),
    amount: results?.[2]?.toString(),
  }
}

export function useTokenLocksForUser(account: Address | undefined, chainId: number): any[] {
  const contract = useLocker()
  const inputs = useMemo(() => [account ?? zeroAddress] as const, [account])
  const results = useSingleCallResult(
    {contract,
    functionName: 'normalLocksForUser',
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

  if (decimals) {
    for (let index = 0; index < results?.length; index++) {
      const lock = results[index];
  
      result.push({
        chainId,
        id: lock.id,
        address: lock.token,
        owner: account,
        name: names[index],
        symbol: symbols[index],
        decimals: Number(decimals[index]),
        amount: lock.amount.toString(),
        lockDate: lock.lockDate,
        description: lock.description
      })
    }
  }

  return result
}

export function useLPLocksForUser(account: Address | undefined, chainId: number): any[] {
  const contract = useLocker()
  const inputs = useMemo(() => [account ?? zeroAddress] as const, [account])
  const results = useSingleCallResult(
    {contract,
    functionName: 'lpLocksForUser',
    args: inputs}
  )?.result

  const token0s = useMultipleContractSingleData(
    {addresses: results?.map((r) => r.token),
    abi: lpTokenABI,
    functionName: 'token0',}
  )?.map((t) => t?.result)

  const token1s = useMultipleContractSingleData(
    {addresses: results?.map((r) => r.token),
    abi: lpTokenABI,
    functionName: 'token1',}
  )?.map((t) => t?.result)

  const name0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const name1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const symbol0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const symbol1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const result : any[] = []

  if (symbol1s) {
    for (let index = 0; index < results?.length; index++) {
      const lock = results[index];
  
      result.push({
        chainId,
        id: lock.id,
        address: lock.token,
        owner: account,
        name: `${name0s[index]} / ${name1s[index]}`,
        symbol: `${symbol0s[index]} / ${symbol1s[index]}`,
        decimals: 18,
        amount: lock.amount.toString(),
        lockDate: lock.lockDate,
        description: lock.description
      })
    }
  }

  return result
}

export function useLockedCountForToken(token: Address): string | undefined {
  const contract = useLocker()

  const inputs = useMemo(() => [token] as const, [token])

  const count = useSingleCallResult({contract, functionName: 'totalLockCountForToken', args: inputs})?.result?.toString()

  return useMemo(
    () => count,
    [count],
  )
}

export function useLocksForToken(token: Address, start: bigint, end: bigint, chainId: number): any[] {
  const contract = useLocker()
  const inputs = useMemo(() => [token, start, end] as const, [token, start, end])
  const results = useSingleCallResult(
    {contract,
    functionName: 'getLocksForToken',
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

  if (decimals) {
    for (let index = 0; index < results?.length; index++) {
      const lock = results[index];
  
      result.push({
        chainId,
        id: lock.id.toString(),
        address: lock.token,
        owner: lock.owner,
        name: names[index],
        symbol: symbols[index],
        decimals: Number(decimals[index]),
        amount: lock.amount.toString(),
        lockDate: lock.lockDate.toString(),
        tgeDate: lock.tgeDate.toString(),
        tgeBps: lock.tgeBps.toString(),
        cycle: lock.cycle.toString(),
        cycleBps: lock.cycleBps.toString(),
        unlockedAmount: lock.unlockedAmount.toString(),
        description: lock.description,
      })
    }
  }

  return result
}

export function useLockById(id: bigint, chainId: number): any {
  const contract = useLocker()
  const inputs = useMemo(() => [id] as const, [id])
  const results = useSingleCallResult(
    {contract,
    functionName: 'getLockById',
    args: inputs}
  )?.result

  const factory = useMultipleContractSingleData(
    {addresses: [results?.token],
    abi: lpTokenABI,
    functionName: 'factory',}
  )?.map((t) => t?.result)

  const token0s = useMultipleContractSingleData(
    {addresses: [results?.token],
    abi: lpTokenABI,
    functionName: 'token0',}
  )?.map((t) => t?.result)

  const token1s = useMultipleContractSingleData(
    {addresses: [results?.token],
    abi: lpTokenABI,
    functionName: 'token1',}
  )?.map((t) => t?.result)

  const name0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const name1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const symbol0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const symbol1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const decimals0s = useMultipleContractSingleData(
    {addresses: token0s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',}
  )?.map((t) => t?.result)

  const decimals1s = useMultipleContractSingleData(
    {addresses: token1s?.map((r) => r),
    abi: erc20Abi,
    functionName: 'decimals',}
  )?.map((t) => t?.result)

  const names = useMultipleContractSingleData(
    {addresses: [results?.token],
    abi: erc20Abi,
    functionName: 'name',}
  )?.map((t) => t?.result)

  const symbols = useMultipleContractSingleData(
    {addresses: [results?.token],
    abi: erc20Abi,
    functionName: 'symbol',}
  )?.map((t) => t?.result)

  const decimals = useMultipleContractSingleData(
    {addresses: [results?.token],
    abi: erc20Abi,
    functionName: 'decimals',}
  )?.map((t) => t?.result)

  return {
    chainId,
    address: results?.token,
    factory: factory[0],
    owner: results?.owner,
    name: names,
    symbol: symbols,
    decimals: Number(decimals),
    token0Name: name0s,
    token1Name: name1s,
    token0Symbol: symbol0s,
    token1Symbol: symbol1s,
    token0Decimals: Number(decimals0s),
    token1Decimals: Number(decimals1s),
    amount: results?.amount.toString(),
    lockDate: results?.lockDate.toString(),
    tgeDate: results?.tgeDate.toString(),
    tgeBps: results?.tgeBps.toString(),
    cycle: results?.cycle.toString(),
    cycleBps: results?.cycleBps.toString(),
    unlockedAmount: results?.unlockedAmount.toString(),
    description: results?.description,
  }
}
