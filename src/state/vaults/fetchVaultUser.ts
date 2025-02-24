import BigNumber from 'bignumber.js'
import { VaultConfigBaseProps } from 'libraries/vaults'
import { Address, erc20Abi } from 'viem'
import { treasuryABI } from 'config/abi/treasury'
import { multicallABI } from 'config/abi/Multicall'
import { getMulticallAddress, getTreasuryAddress } from 'utils/addressHelpers'
import { publicClient } from 'utils/viem'

export const fetchVaultUserAllowances = async (
	account: Address,
	vaultsToFetch: VaultConfigBaseProps[],
	chainId: number,
) => {
	const calls = vaultsToFetch.map((v) => {
		return { address: v.token.address, functionName: 'allowance', abi: erc20Abi, args: [account, getTreasuryAddress(chainId)] }
	})

  const client = publicClient({chainId})

	const rawAllowances = await client.multicall({ contracts: calls, allowFailure: false })
	const parsedAllowances = rawAllowances.map((balance) => {
		return new BigNumber(balance.toString()).toJSON()
	})

	return parsedAllowances
}

export const fetchVaultUserTokenBalances = async (
  account: Address,
  vaultsToFetch: VaultConfigBaseProps[],
  chainId: number,
) => {
	const call = [{
		address: getMulticallAddress(chainId),
		functionName: 'getEthBalance',
    abi: multicallABI,
		args: [account]
	}] as const
  const calls = vaultsToFetch.map((v) => {
    return {
      address: v.token.address,
      functionName: 'balanceOf',
      abi: erc20Abi,
      args: [account],
    } as const
  })

  const client = publicClient({chainId})

	const rawETHBalances = await client.multicall({ contracts: call, allowFailure: false })
  const rawTokenBalances = await client.multicall({ contracts: calls, allowFailure: false })
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance.toString()).toJSON()
  }).slice(1)
  return [new BigNumber(rawETHBalances[0].toString()).toJSON(), ...parsedTokenBalances]
}

export const fetchVaultUserPendingRewards = async (
  account: string,
  vaultsToFetch: VaultConfigBaseProps[],
  chainId: number,
) => {
  const calls = vaultsToFetch.map((v) => {
    return {
      address: getTreasuryAddress(chainId),
      functionName: 'getPooledPendingReward',
      abi: treasuryABI,
      args: [v.id, account],
    } as const
  })

  const client = publicClient({chainId})

  const rawPendingRewards = await client.multicall({ contracts: calls, allowFailure: false })
  const parsedPendingRewards = rawPendingRewards.map((pendingReward) => {
    return new BigNumber(pendingReward.toString()).toJSON()
  })
  return parsedPendingRewards
}

export const fetchVaultUserInfos = async (
  account: string,
  vaultsToFetch: VaultConfigBaseProps[],
  chainId: number,
) => {
  const calls = vaultsToFetch.map((v) => {
    return {
      address: getTreasuryAddress(chainId),
      functionName: 'pooledUserInfo',
      abi: treasuryABI,
      args: [BigInt(v.id), account],
    } as const
  })

  const client = publicClient({chainId})

	const rawUserInfos = await client.multicall({ contracts: calls, allowFailure: false })
	
  const parsedUserInfos = rawUserInfos.map((userInfo) => {
    return {
			amount: new BigNumber(userInfo[0].toString()).toString(),
			lastLockTime: new BigNumber(userInfo[1].toString()).toNumber(),
			lastRewardTime: new BigNumber(userInfo[2].toString()).toNumber(),
			totalEarned: new BigNumber(userInfo[3].toString()).toString()
		}
  })
  return parsedUserInfos
}

