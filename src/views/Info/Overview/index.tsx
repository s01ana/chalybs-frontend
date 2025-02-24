import { Card, Flex, Heading } from 'components'
import Page from 'components/Layout/Page'
import { useMemo } from 'react'
import {
  useAllTokenDataSWR,
  useProtocolChartDataSWR,
  useProtocolDataSWR,
  useProtocolTransactionsSWR,
} from 'state/info/hooks'
import styled from 'styled-components'
import BarChart from 'views/Info/components/InfoCharts/BarChart'
import LineChart from 'views/Info/components/InfoCharts/LineChart'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import HoverableChart from '../components/InfoCharts/HoverableChart'
import { usePoolsData } from '../hooks/usePoolsData'

export const ChartCardsContainer = styled(Flex)`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  padding: 0;
  gap: 1em;

  & > * {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const Overview: React.FC<React.PropsWithChildren> = () => {
  const protocolData = useProtocolDataSWR()
  const chartData = useProtocolChartDataSWR()
  const transactions = useProtocolTransactionsSWR()

  const currentDate = new Date().toLocaleString("en-US", { month: 'short', year: 'numeric', day: 'numeric' })

  const allTokens = useAllTokenDataSWR()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token && token.name !== 'unknown')
  }, [allTokens])

  const { poolsData } = usePoolsData()

  const somePoolsAreLoading = useMemo(() => {
    return poolsData.some((pool) => !pool?.token0Price)
  }, [poolsData])

  return (
    <Page>
      <Heading scale="lg" mb="16px" id="info-overview-title">
      Dexfinity Info & Analytics
      </Heading>
      <ChartCardsContainer>
        <Card>
          <HoverableChart
            chartData={chartData ?? []}
            protocolData={protocolData}
            currentDate={currentDate}
            valueProperty="liquidityUSD"
            title='Liquidity'
            ChartComponent={LineChart}
          />
        </Card>
        <Card>
          <HoverableChart
            chartData={chartData ?? []}
            protocolData={protocolData}
            currentDate={currentDate}
            valueProperty="volumeUSD"
            title='Volume 24H'
            ChartComponent={BarChart}
          />
        </Card>
      </ChartCardsContainer>
      <Heading scale="lg" mt="40px" mb="16px">
        Top Tokens
      </Heading>
      <TokenTable tokenDatas={formattedTokens} />
      <Heading scale="lg" mt="40px" mb="16px">
        Top Pairs
      </Heading>
      <PoolTable poolDatas={poolsData} loading={somePoolsAreLoading} />
      <Heading scale="lg" mt="40px" mb="16px">
        Transactions
      </Heading>
      <TransactionTable transactions={transactions ?? []} />
    </Page>
  )
}

export default Overview
