import { Duration, getUnixTime, startOfHour, sub } from 'date-fns'
import { useRouter } from 'next/router'
import { useMemo} from 'react'
import fetchPoolChartData from 'state/info/queries/pools/chartData'
import { fetchAllPoolData, fetchAllPoolDataWithAddress } from 'state/info/queries/pools/poolData'
import fetchPoolTransactions from 'state/info/queries/pools/transactions'
import { fetchGlobalChartData } from 'state/info/queries/protocol/chart'
import { fetchProtocolData } from 'state/info/queries/protocol/overview'
import fetchTopTransactions from 'state/info/queries/protocol/transactions'
import fetchTokenChartData from 'state/info/queries/tokens/chartData'
import fetchPoolsForToken from 'state/info/queries/tokens/poolsForToken'
import fetchTokenPriceData from 'state/info/queries/tokens/priceData'
import { fetchAllTokenData, fetchAllTokenDataByAddresses } from 'state/info/queries/tokens/tokenData'
import fetchTokenTransactions from 'state/info/queries/tokens/transactions'
import { Block, Transaction } from 'state/info/types'
import { useQuery } from '@tanstack/react-query'
import { getDeltaTimestamps } from 'utils/getDeltaTimestamps'
import { useBlockFromTimeStampSWR } from 'views/Info/hooks/useBlocksFromTimestamps'
import { MultiChainName } from './constant'
import { ChartEntry, PoolData, PriceChartEntry, ProtocolData, TokenData } from './types'

// Protocol hooks

const refreshIntervalForInfo = 15000 // 15s
const QUERY_SETTINGS_IMMUTABLE = {
  refetchOnReconnect: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
}
const QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH = {
  retry: 3,
  retryDelay: 3000,
}
const QUERY_SETTINGS_INTERVAL_REFETCH = {
  refetchInterval: refreshIntervalForInfo,
  keepPreviousData: true,
  ...QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH,
}

export const useProtocolDataSWR = (): ProtocolData | undefined => {
  const [t24, t48] = getDeltaTimestamps()
  const { blocks } = useBlockFromTimeStampSWR([t24, t48])
  const [block24, block48] = blocks ?? []
  const { data: protocolData } = useQuery({
    queryKey: [`info/protocol/updateProtocolData/swap`, "ARB"],
    queryFn: () => fetchProtocolData("ARB", block24, block48),
    enabled: Boolean(block24 && block48),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH,
  })

  return protocolData ?? undefined
}

export const useProtocolChartDataSWR = (): ChartEntry[] | undefined => {
  const { data: chartData } = useQuery({
    queryKey: [`info/protocol/updateProtocolChartData/swap`, "ARB"],
    queryFn: () => fetchGlobalChartData("ARB"),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH,
  })
  return chartData ?? undefined
}

export const useProtocolTransactionsSWR = (): Transaction[] | undefined => {
  const { data: transactions } = useQuery({
    queryKey: [`info/protocol/updateProtocolTransactionsData/swap`, "ARB"],
    queryFn: () => fetchTopTransactions("ARB"),
    ...QUERY_SETTINGS_INTERVAL_REFETCH, // update latest Transactions per 15s
  })
  return transactions ?? undefined
}

export const useAllPoolDataSWR = () => {
  const [t24h, t48h, t7d, t14d] = getDeltaTimestamps()
  const { blocks } = useBlockFromTimeStampSWR([t24h, t48h, t7d, t14d])
  const { data } = useQuery({
    queryKey: [`info/pools/data/swap`, "ARB"],
    queryFn: () => fetchAllPoolData(blocks ?? [], "ARB"),
    enabled: Boolean(blocks),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH,
  })
  return data ?? {}
}

export const usePoolDatasSWR = (poolAddresses: string[]): PoolData[] | undefined => {
  const name = poolAddresses.join('')
  const [t24h, t48h, t7d, t14d] = getDeltaTimestamps()
  const { blocks } = useBlockFromTimeStampSWR([t24h, t48h, t7d, t14d])
  const { data } = useQuery({
    queryKey: [`info/pool/data/${name}/swap`, "ARB"],
    queryFn: () => fetchAllPoolDataWithAddress(blocks ?? [], "ARB", poolAddresses),
    enabled: Boolean(blocks) && Boolean(name),
    ...QUERY_SETTINGS_INTERVAL_REFETCH,
  })
  
  if (!data) return []

  const poolsWithData = poolAddresses
    .map((address) => {
      return data?.[address]?.data
    })
    .filter((pool) => pool)

  return poolsWithData
}

export const usePoolChartDataSWR = (address: string): ChartEntry[] | undefined => {
  const { data } = useQuery({
    queryKey: [`info/pool/chartData/${address}/swap`, "ARB"],
    queryFn: () => fetchPoolChartData("ARB", address),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH,
  })
  return data?.data ?? undefined
}

export const usePoolTransactionsSWR = (address: string): Transaction[] | undefined => {
  const { data } = useQuery({
    queryKey: [`info/pool/transactionsData/${address}/swap`, "ARB"],
    queryFn: () => fetchPoolTransactions("ARB", address),
    ...QUERY_SETTINGS_INTERVAL_REFETCH,
  })
  return data?.data ?? undefined
}

// Tokens hooks

export const useAllTokenHighLight = (): TokenData[] => {
  const [t24h, t48h, t7d, t14d] = getDeltaTimestamps()
  const { blocks } = useBlockFromTimeStampSWR([t24h, t48h, t7d, t14d])
  const { data, isLoading } = useQuery({
    queryKey: [`info/token/data/swap`, "ARB"],
    queryFn: () => fetchAllTokenData("ARB", blocks ?? []),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH,
  })

  const tokensWithData = useMemo(() => {
    return data
      ? Object.keys(data)
          .map((k) => {
            return data?.[k]?.data
          })
          .filter((d) => d && d.exists)
      : []
  }, [data])
  return isLoading ? [] : tokensWithData ?? []
}

export const useAllTokenDataSWR = (): {
  [address: string]: { data?: TokenData }
} => {
  const [t24h, t48h, t7d, t14d] = getDeltaTimestamps()
  const { blocks } = useBlockFromTimeStampSWR([t24h, t48h, t7d, t14d])
  const { data } = useQuery({
    queryKey: [`info/token/data/swap`, "ARB"],
    queryFn: () => fetchAllTokenData("ARB", blocks ?? []),
    enabled: Boolean(blocks),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH,
  })
  return data ?? {}
}

const graphPerPage = 50

const fetcher = (addresses: string[], chainName: MultiChainName, blocks: Block[]) => {
  const times = Math.ceil(addresses.length / graphPerPage)
  const addressGroup: Array<string[]> = []
  for (let i = 0; i < times; i++) {
    addressGroup.push(addresses.slice(i * graphPerPage, (i + 1) * graphPerPage))
  }
  return Promise.all(addressGroup.map((d) => fetchAllTokenDataByAddresses(chainName, blocks, d)))
}

export const useTokenDatasSWR = (addresses?: string[], withSettings = true): TokenData[] | undefined => {
  const name = addresses?.join('')
  const [t24h, t48h, t7d, t14d] = getDeltaTimestamps()
  const { blocks } = useBlockFromTimeStampSWR([t24h, t48h, t7d, t14d])
  const { data, isLoading } = useQuery({
    queryKey: [`info/token/data/${name}/swap`, "ARB"],
    queryFn: () => fetcher(addresses || [], "ARB", blocks ?? []),
    enabled: Boolean(name) && Boolean(blocks),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...(withSettings ? QUERY_SETTINGS_INTERVAL_REFETCH : QUERY_SETTINGS_WITHOUT_INTERVAL_REFETCH),
  })
  const allData = useMemo(() => {
    return data && data.length > 0
      ? data.reduce((a, b) => {
          return { ...a, ...b }
        }, {})
      : {}
  }, [data])

  const tokensWithData = useMemo(() => {
    if (!addresses && allData) {
      return undefined
    }
    return addresses?.map((a) => {
        return allData?.[a]?.data
      })
      .filter((d) => d && d.exists)
  }, [addresses, allData])

  return isLoading ? [] : tokensWithData ?? undefined
}

export const useTokenDataSWR = (address: string | undefined): TokenData | undefined => {
  const allTokenData = useTokenDatasSWR([address!])
  return allTokenData?.find((d) => d.address === address) ?? undefined
}

export const usePoolsForTokenSWR = (address: string): string[] | undefined => {
  const { data } = useQuery({
    queryKey: [`info/token/poolAddress/${address}/swap`, "ARB"],
    queryFn: () => fetchPoolsForToken("ARB", address),
    enabled: Boolean(address),
    ...QUERY_SETTINGS_IMMUTABLE,
    ...QUERY_SETTINGS_INTERVAL_REFETCH,
  })

  return data?.addresses ?? undefined
}

export const useTokenChartDataSWR = (address: string): ChartEntry[] | undefined => {
  const { data } = useQuery({
    queryKey: [`info/token/chartData/${address}/swap`, "ARB"],
    queryFn: () => fetchTokenChartData("ARB", address),
    enabled: Boolean(address),
    ...QUERY_SETTINGS_INTERVAL_REFETCH,
  })

  return data?.data ?? undefined
}

export const useTokenPriceDataSWR = (
  address: string,
  interval: number,
  timeWindow: Duration,
): PriceChartEntry[] | undefined => {
  const utcCurrentTime = getUnixTime(new Date()) * 1000
  const startTimestamp = getUnixTime(startOfHour(sub(utcCurrentTime, timeWindow)))
  const { data } = useQuery({
    queryKey: [`info/token/priceData/${address}/swap`, "ARB"],
    queryFn: () => fetchTokenPriceData("ARB", address, interval, startTimestamp),
    enabled: Boolean(address),
    ...QUERY_SETTINGS_INTERVAL_REFETCH,
  })
  return data?.data ?? undefined
}

export const useTokenTransactionsSWR = (address: string): Transaction[] | undefined => {
  const { data } = useQuery({
    queryKey: [`info/token/transactionsData/${address}/swap`, "ARB"],
    queryFn: () => fetchTokenTransactions("ARB", address),
    enabled: Boolean(address),
    ...QUERY_SETTINGS_INTERVAL_REFETCH,
  })
  return data?.data ?? undefined
}

export const useMultiChainPath = () => {
  const router = useRouter()
  const { chainName } = router.query
  return chainName ? `/${chainName}` : ''
}
