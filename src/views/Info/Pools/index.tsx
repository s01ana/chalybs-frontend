import { Card, Heading, Text } from 'components'
import Page from 'components/Layout/Page'
import { useMemo } from 'react'
import { usePoolDatasSWR } from 'state/info/hooks'
import { useWatchlistPools } from 'state/user/hooks'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
import { usePoolsData } from '../hooks/usePoolsData'

const PoolsOverview: React.FC<React.PropsWithChildren> = () => {
  const { poolsData } = usePoolsData()

  const [savedPools] = useWatchlistPools()
  const watchlistPools = usePoolDatasSWR(savedPools)
  const watchlistPoolsData = useMemo(
    () =>
      (watchlistPools ?? []).map((pool) => {
        return { ...pool }
      }),
    [watchlistPools],
  )

  return (
    <Page>
      <Heading scale="lg" mb="16px">
        Your Watchlist
      </Heading>
      <Card>
        {watchlistPools && watchlistPools.length > 0 ? (
          <PoolTable poolDatas={watchlistPoolsData} />
        ) : (
          <Text px="24px" py="16px">
            Saved pairs will appear here
          </Text>
        )}
      </Card>
      <Heading scale="lg" mt="40px" mb="16px" id="info-pools-title">
        All Pairs
      </Heading>
      <PoolTable poolDatas={poolsData} />
    </Page>
  )
}

export default PoolsOverview
