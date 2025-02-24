import { gql } from 'graphql-request'
import { useEffect, useState } from 'react'
import { getDeltaTimestamps } from 'utils/getDeltaTimestamps'
import {
  getMultiChainQueryEndPointWithStableSwap,
  MultiChainName,
} from '../../constant'

interface TopPoolsResponse {
  pairDayDatas: {
    id: string
  }[]
}

/**
 * Initial pools to display on the home page
 */
const fetchTopPools = async (chainName: MultiChainName, timestamp24hAgo: number): Promise<string[]> => {
  const firstCount = 30
  const whereCondition = `where: { date_gt: ${timestamp24hAgo}, token0_not_in: $blacklist, token1_not_in: $blacklist, dailyVolumeUSD_gt: 2000 }`
  try {
    const query = gql`
      query topPools($blacklist: [String!]) {
        pairDayDatas(
          first: ${firstCount}
          ${whereCondition}
          orderBy: dailyVolumeUSD
          orderDirection: desc
        ) {
          id
        }
      }
    `
    const data = await getMultiChainQueryEndPointWithStableSwap(chainName).request<TopPoolsResponse>(query, {
      blacklist: [""],
    })
    // pairDayDatas id has compound id "0xPOOLADDRESS-NUMBERS", extracting pool address with .split('-')
    return data.pairDayDatas.map((p) => p.id.split('-')[0])
  } catch (error) {
    console.error('Failed to fetch top pools', error)
    return []
  }
}

/**
 * Fetch top addresses by volume
 */
const useTopPoolAddresses = (): string[] => {
  const [topPoolAddresses, setTopPoolAddresses] = useState<any>([])
  const [timestamp24hAgo] = getDeltaTimestamps()

  useEffect(() => {
    const fetch = async () => {
      const addresses = await fetchTopPools("ARB", timestamp24hAgo)
      setTopPoolAddresses(addresses)
    }
    if (topPoolAddresses.length === 0) {
      fetch()
    }
  }, [topPoolAddresses, timestamp24hAgo])

  return topPoolAddresses
}

export const fetchTopPoolAddresses = async (chainName: MultiChainName) => {
  const [timestamp24hAgo] = getDeltaTimestamps()

  const addresses = await fetchTopPools(chainName, timestamp24hAgo)
  return addresses
}

export default useTopPoolAddresses
