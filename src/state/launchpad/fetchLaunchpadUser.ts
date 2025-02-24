import { erc20Abi, zeroAddress } from 'viem'
import { launchpadABI } from 'config/abi/launchpad'
import {multicallABI} from 'config/abi/Multicall'
import { publicClient } from 'utils/wagmi'
import { getMulticallAddress } from 'utils/addressHelpers'
import { SerializedLaunchpadUserData } from './types'

const fetchEthUser = async (
  account: `0x${string}`,
  chainId: number,
): Promise<any> => {
  const multicallAddress = getMulticallAddress()

  const ethBalanceCall = [{
    abi: multicallABI,
    address: multicallAddress,
    functionName: 'getEthBalance',
    args: [account],
  }]

  const client = publicClient({chainId})

  const ethBalancesRaw = await client.multicall({ contracts: ethBalanceCall, allowFailure: true })

  const ethBalance = Number(ethBalancesRaw[0].result?.toString())

  return {
    allowance: 0,
    balance: ethBalance
  }
}

const fetchTokenUser = async (
  launchpad: `0x${string}`,
  account: `0x${string}`,
  token: `0x${string}`,
  chainId: number,
): Promise<any> => {
  const calls = [
    {
      abi: erc20Abi ,
      address: token,
      functionName: 'allowance',
      args: [account, launchpad],
    },
    {
      abi: erc20Abi ,
      address: token,
      functionName: 'balanceOf',
      args: [account],
    },
  ]

  const client = publicClient({chainId})

  const userDataMultiCallResult = await client.multicall({ contracts: calls, allowFailure: true })
  const tokenAllowance = Number(userDataMultiCallResult[0].result?.toString())
  const tokenBalance = Number(userDataMultiCallResult[1].result?.toString())
  return {
    allowance: tokenAllowance,
    balance: tokenBalance
  }
}

const fetchLaunchpadUser = async (
  launchpad: `0x${string}`,
  account: `0x${string}`,
  chainId: number,
): Promise<any[]> => {
  const calls = [
    {
      abi: launchpadABI,
      address: launchpad,
      functionName: 'deposits',
      args: [account],
    },
    {
      abi: launchpadABI,
      address: launchpad,
      functionName: 'claimed',
      args: [account],
    },
    {
      abi: launchpadABI,
      address: launchpad,
      functionName: 'whiteList',
      args: [account],
    },
    {
      abi: launchpadABI,
      address: launchpad,
      functionName: 'owner',
    },
    {
      abi: launchpadABI,
      address: launchpad,
      functionName: 'getVestedAmount',
      args: [account],
    },
  ]

  const client = publicClient({chainId})

  // @ts-ignore
  const userDataMultiCallResult = await client.multicall({ contracts: calls, allowFailure: true })
  return userDataMultiCallResult
}

function launchpadTransformer (launchpadUserDataResult : any[], account: `0x${string}`) {
  const [
    deposit,
    claimed,
    whitelisted,
    owner,
    vested,
  ] = launchpadUserDataResult

  return {
    deposit: Number(deposit.result.toString()),
    claimed: Number(claimed.result.toString()),
    vested: Number(vested.result.toString()),
    owner: owner.result === account,
    whitelisted: whitelisted.result
  }
}

const fetchLaunchpadUserData = async (launchpad: `0x${string}`, account: `0x${string}`, chainId: number): Promise<SerializedLaunchpadUserData> => {
  const client = publicClient({chainId})
  const [token] = await Promise.all([
    client.readContract({
      abi: launchpadABI,
      address: launchpad,
      functionName: "buyToken"
    })
  ])

  const [launchpadUserDataResult] = await Promise.all([
    fetchLaunchpadUser(launchpad, account, chainId)
  ])

  const [tokenUserDataResult] = token !== zeroAddress ? await Promise.all([
    fetchTokenUser(launchpad, account, token, chainId)
  ]) : await Promise.all([
    fetchEthUser(account, chainId)
  ])

  fetchEthUser(account, chainId)

  const launchpadUserData = launchpadTransformer(launchpadUserDataResult, account)

  return {...tokenUserDataResult, ...launchpadUserData}
}

export default fetchLaunchpadUserData