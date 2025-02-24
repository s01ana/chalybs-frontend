import { Address, zeroAddress } from 'viem'
import { launchpadABI } from 'config/abi/launchpad'
import { publicClient } from 'utils/wagmi'
import { SerializedLaunchpad } from './types'

const LAUNCHPAD_VARIABLES = ['presaleType', 'token', 'buyToken', 'presaleStartTimestamp', 'presaleEndTimestamp', 'softCap', 'hardCap', 'minBuy', 'maxBuy', 'rate', 'listingRate', 'lockPeriod', 'mainFee', 'tokenFee', 'liquidity', 'router', 'locker', 'feeAddress', 'tokenBackAddress', 'whiteListEnableTime', 'totalDepositedBalance', 'totalClaimedAmount', 'investors', 'refundable', 'claimable', 'initialized', 'info', 'logoUrl', 'website', 'twitter', 'facebook', 'github', 'telegram', 'instagram', 'discord', 'reddit', 'youtube', 'whitelist', 'getWhiteListLength']
const FAIRLAUNCH_VARIABLES = ['presaleType', 'token', 'buyToken', 'presaleStartTimestamp', 'presaleEndTimestamp', 'softCap', 'maxBuy', 'total', 'listingRate', 'lockPeriod', 'mainFee', 'tokenFee', 'liquidity', 'router', 'locker', 'feeAddress', 'totalDepositedBalance', 'totalClaimedAmount', 'investors', 'refundable', 'claimable', 'initialized', 'info', 'logoUrl', 'website', 'twitter', 'facebook', 'github', 'telegram', 'instagram', 'discord', 'reddit', 'youtube', 'whitelist', 'getWhiteListLength']

const calls = (launchpad: Address, presaleType: string) => {
  if (presaleType === "standard")
    return LAUNCHPAD_VARIABLES.map((val) => { return {
      abi: launchpadABI,
      address: launchpad,
      functionName: val,
    }})
  return FAIRLAUNCH_VARIABLES.map((val) => { return {
    abi: launchpadABI,
    address: launchpad,
    functionName: val,
  }})
}

export const fetchLaunchpadData = async (launchpad: Address, chainId: number, presaleType?: string): Promise<any[]> => {
  const client = publicClient({chainId})
  // @ts-ignore
  const launchpadMultiCallResult = await client.multicall({ contracts: calls(launchpad, presaleType), allowFailure: true })
  return launchpadMultiCallResult
}

function launchpadTransformer (chainId: number, launchpadResult : any[]) {
  const [
    presaleType,
    token,
    buyToken,
    presaleStartTimestamp,
    presaleEndTimestamp,
    softCap,
    hardCap,
    minBuy,
    maxBuy,
    rate,
    listingRate,
    lockPeriod,
    // isAutoListing,
    // vestingFirst,
    // vestingPeriod,
    // vestingEach,
    mainFee,
    tokenFee,
    liquidity,
    router,
    locker,
    feeAddress,
    tokenBackAddress,
    whiteListEnableTime,
    totalDepositedBalance,
    totalClaimedAmount,
    investors,
    refundable,
    claimable,
    initialized,
    info,
    logoUrl,
    website,
    twitter,
    facebook,
    github,
    telegram,
    instagram,
    discord,
    reddit,
    youtube,
    whitelist,
    whitelistLength
  ] = launchpadResult

  return {
    chainId,
    presaleType: presaleType.result,
    token: token.result,
    buyToken: buyToken.result,
    presaleStartTimestamp: Number(presaleStartTimestamp.result.toString()),
    presaleEndTimestamp: Number(presaleEndTimestamp.result.toString()),
    softCap: Number(softCap.result.toString()),
    hardCap: Number(hardCap.result.toString()),
    minBuy: Number(minBuy.result.toString()),
    maxBuy: Number(maxBuy.result.toString()),
    rate: Number(rate.result.toString()),
    listingRate: Number(listingRate.result.toString()),
    lockPeriod: Number(lockPeriod.result.toString()),
    isAutoListing: router.result !== zeroAddress,
    mainFee: Number(mainFee.result.toString()),
    tokenFee: Number(tokenFee.result.toString()),
    liquidity: Number(liquidity.result.toString()),
    router: router.result,
    locker: locker.result,
    feeAddress: feeAddress.result,
    tokenBackAddress: tokenBackAddress.result,
    whiteListEnableTime: Number(whiteListEnableTime.result.toString()),
    totalDepositedBalance: Number(totalDepositedBalance.result.toString()),
    totalClaimedAmount: Number(totalClaimedAmount.result.toString()),
    investors: Number(investors.result.toString()),
    refundable: refundable.result,
    claimable: claimable.result,
    initialized: initialized.result,
    info: info.result,
    logoUrl: logoUrl.result,
    website: website.result,
    twitter: twitter.result,
    facebook: facebook.result,
    github: github.result,
    telegram: telegram.result,
    instagram: instagram.result,
    discord: discord.result,
    reddit: reddit.result,
    youtube: youtube.result,
    whitelist: whitelist.result,
    whitelistLength: Number(whitelistLength.result.toString()),
  }
}

function fairlaunchTransformer (chainId: number, launchpadResult : any[]) {
  const [
    presaleType,
    token,
    buyToken,
    presaleStartTimestamp,
    presaleEndTimestamp,
    softCap,
    maxBuy,
    total,
    listingRate,
    lockPeriod,
    mainFee,
    tokenFee,
    liquidity,
    router,
    locker,
    feeAddress,
    totalDepositedBalance,
    totalClaimedAmount,
    investors,
    refundable,
    claimable,
    initialized,
    info,
    logoUrl,
    website,
    twitter,
    facebook,
    github,
    telegram,
    instagram,
    discord,
    reddit,
    youtube,
    whitelist,
    whitelistLength
  ] = launchpadResult

  return {
    chainId,
    presaleType: presaleType.result,
    token: token.result,
    buyToken: buyToken.result,
    presaleStartTimestamp: Number(presaleStartTimestamp.result.toString()),
    presaleEndTimestamp: Number(presaleEndTimestamp.result.toString()),
    softCap: Number(softCap.result.toString()),
    // hardCap: 0,
    maxBuy: Number(maxBuy.result.toString()),
    // minBuy: 0,
    // rate: 0,
    // isAutoListing: true,
    // whiteListEnableTime: 0,
    // tokenBackAddress: "0",
    total: Number(total.result.toString()),
    listingRate: Number(listingRate.result.toString()),
    lockPeriod: Number(lockPeriod.result.toString()),
    // vestingFirst: Number(vestingFirst.result.toString()),
    // vestingPeriod: Number(vestingPeriod.result.toString()),
    // vestingEach: Number(vestingEach.result.toString()),
    mainFee: Number(mainFee.result.toString()),
    tokenFee: Number(tokenFee.result.toString()),
    liquidity: Number(liquidity.result.toString()),
    router: router.result,
    locker: locker.result,
    feeAddress: feeAddress.result,
    totalDepositedBalance: Number(totalDepositedBalance.result.toString()),
    totalClaimedAmount: Number(totalClaimedAmount.result.toString()),
    investors: Number(investors.result.toString()),
    refundable: refundable.result,
    claimable: claimable.result,
    initialized: initialized.result,
    info: info.result,
    logoUrl: logoUrl.result,
    website: website.result,
    twitter: twitter.result,
    facebook: facebook.result,
    github: github.result,
    telegram: telegram.result,
    instagram: instagram.result,
    discord: discord.result,
    reddit: reddit.result,
    youtube: youtube.result,
    whitelist: whitelist.result,
    whitelistLength: Number(whitelistLength.result.toString()),
  }
}

const fetchLaunchpad = async (launchpad: Address, chainId: number): Promise<SerializedLaunchpad> => {
  const client = publicClient({chainId})
  const [[presaleType]] = await Promise.all([
    client.multicall({
      contracts: [
        {
          address: launchpad,
          functionName: "presaleType",
          abi: launchpadABI,
        }
      ],
    })
  ])

  const [launchpadResult] = await Promise.all([
    fetchLaunchpadData(launchpad, chainId, presaleType?.result)
  ])

  if (presaleType.result === "standard")
    return launchpadTransformer(chainId, launchpadResult)
  return fairlaunchTransformer(chainId, launchpadResult)
}

export default fetchLaunchpad
