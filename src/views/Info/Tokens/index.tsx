import { Card, Heading, Text } from 'components'
import Page from 'components/Layout/Page'
import { useMemo } from 'react'
import { useAllTokenDataSWR, useTokenDatasSWR } from 'state/info/hooks'
import { useWatchlistTokens } from 'state/user/hooks'
import TokenTable from 'views/Info/components/InfoTables/TokensTable'
import TopTokenMovers from 'views/Info/components/TopTokenMovers'

const TokensOverview: React.FC<React.PropsWithChildren> = () => {
  const allTokens = useAllTokenDataSWR()

  const formattedTokens = useMemo(() => {
    return Object.values(allTokens)
      .map((token) => token.data)
      .filter((token) => token)
  }, [allTokens])

  const [savedTokens] = useWatchlistTokens()
  const watchListTokens = useTokenDatasSWR(savedTokens)

  return (
    <Page>
      <Heading scale="lg" mb="16px">
        Your Watchlist
      </Heading>
      {watchListTokens && watchListTokens.length > 0 ? (
        <TokenTable tokenDatas={watchListTokens} />
      ) : (
        <Card>
          <Text py="16px" px="24px">
            Saved tokens will appear here
          </Text>
        </Card>
      )}
      <TopTokenMovers />
      <Heading scale="lg" mt="40px" mb="16px" id="info-tokens-title">
        All Tokens
      </Heading>
      <TokenTable tokenDatas={formattedTokens} />
    </Page>
  )
}

export default TokensOverview
