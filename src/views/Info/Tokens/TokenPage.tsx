/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link as UIKitLink,
  LinkExternal,
  Spinner,
  Text,
  NextLinkFromReactRouter,
  Breadcrumbs,
} from 'components'
import { useMatchBreakpoints } from 'contexts'
import { NextSeo } from 'next-seo'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { CHAIN_QUERY_NAME } from 'config/chains'
import truncateHash from 'utils/truncateHash'
import Page from 'components/Layout/Page'
import { ONE_HOUR_SECONDS } from 'config/constants/info'
import { Duration } from 'date-fns'
import { useMemo } from 'react'
import { multiChainId, multiChainScan } from 'state/info/constant'
import {
  useMultiChainPath,
  usePoolDatasSWR,
  usePoolsForTokenSWR,
  useTokenChartDataSWR,
  useTokenDataSWR,
  useTokenPriceDataSWR,
  useTokenTransactionsSWR,
} from 'state/info/hooks'
import { useWatchlistTokens } from 'state/user/hooks'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'
import { formatAmount } from 'utils/formatInfoNumbers'
import { CurrencyLogo } from 'views/Info/components/CurrencyLogo'
import ChartCard from 'views/Info/components/InfoCharts/ChartCard'
import PoolTable from 'views/Info/components/InfoTables/PoolsTable'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import Percent from 'views/Info/components/Percent'
import SaveIcon from 'views/Info/components/SaveIcon'
import useCMCLink from 'views/Info/hooks/useCMCLink'

const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.dropdown};
  padding: 12px;
  border-radius: 12px;
`

const ContentLayout = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-gap: 1em;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`

const StyledCMCLink = styled(UIKitLink)`
  width: 24px;
  height: 24px;
  margin-right: 8px;

  & :hover {
    opacity: 0.8;
  }
`
const DEFAULT_TIME_WINDOW: Duration = { weeks: 1 }

const TokenPage: React.FC<React.PropsWithChildren<{ routeAddress: string }>> = ({ routeAddress }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()

  // In case somebody pastes checksummed address into url (since GraphQL expects lowercase address)
  const address = routeAddress.toLowerCase()

  const cmcLink = useCMCLink(address)

  const tokenData = useTokenDataSWR(address)
  const poolsForToken = usePoolsForTokenSWR(address)
  const poolDatas = usePoolDatasSWR(poolsForToken ?? [])
  const transactions = useTokenTransactionsSWR(address)
  const chartData = useTokenChartDataSWR(address)

  // pricing data
  const priceData = useTokenPriceDataSWR(address, ONE_HOUR_SECONDS, DEFAULT_TIME_WINDOW)
  const adjustedPriceData = useMemo(() => {
    // Include latest available price
    if (priceData && tokenData && priceData.length > 0) {
      return [
        ...priceData,
        {
          time: new Date().getTime() / 1000,
          open: priceData[priceData.length - 1].close,
          close: tokenData?.priceUSD,
          high: tokenData?.priceUSD,
          low: priceData[priceData.length - 1].close,
        },
      ]
    }
    return undefined
  }, [priceData, tokenData])

  const [watchlistTokens, addWatchlistToken] = useWatchlistTokens()
  const chainPath = useMultiChainPath()

  return (
    <Page>
      <NextSeo title={tokenData?.symbol} />
      {tokenData ? (
        !tokenData.exists ? (
          <Card>
            <Box p="16px">
              <Text>
                No pair has been created with this token yet. Create one
                <NextLinkFromReactRouter style={{ display: 'inline', marginLeft: '6px' }} to={`/add/${address}`}>
                  here.
                </NextLinkFromReactRouter>
              </Text>
            </Box>
          </Card>
        ) : (
          <>
            {/* Stuff on top */}
            <StyledBox>
              <Flex justifyContent="space-between" mb="24px" flexDirection={['column', 'column', 'row']}>
                <Breadcrumbs mb="32px">
                  <NextLinkFromReactRouter to={`/info${chainPath}`}>
                    <Text color="primary">Info</Text>
                  </NextLinkFromReactRouter>
                  <NextLinkFromReactRouter to={`/info${chainPath}/tokens`}>
                    <Text color="primary">Tokens</Text>
                  </NextLinkFromReactRouter>
                  <Flex>
                    <Text mr="8px">{tokenData.symbol}</Text>
                    <Text>{`(${truncateHash(address)})`}</Text>
                  </Flex>
                </Breadcrumbs>
                <Flex justifyContent={[null, null, 'flex-end']} mt={['8px', '8px', 0]}>
                  <LinkExternal
                    mr="8px"
                    color="primary"
                    href={getBlockExploreLink(address, 'address', multiChainId.ARB)}
                  >
                    View on {multiChainScan.ARB}
                  </LinkExternal>
                  {cmcLink && (
                    <StyledCMCLink href={cmcLink} rel="noopener noreferrer nofollow" target="_blank">
                      <Image src="/images/CMC-logo.svg" height={22} width={22} alt='View token on CoinMarketCap' />
                    </StyledCMCLink>
                  )}
                  <SaveIcon fill={watchlistTokens.includes(address)} onClick={() => addWatchlistToken(address)} />
                </Flex>
              </Flex>
              <Flex justifyContent="space-between" flexDirection={['column', 'column', 'column', 'row']}>
                <Flex flexDirection="column">
                  <Flex alignItems="center">
                    <CurrencyLogo size="32px" address={address as `0x${string}`} chainName="ARB" />
                    <Text
                      ml="12px"
                      lineHeight="0.7"
                      fontSize={isXs || isSm ? '24px' : '40px'}
                      id="info-token-name-title"
                    >
                      {tokenData.name}
                    </Text>
                    <Text ml="12px" lineHeight="1" color="textSubtle" fontSize={isXs || isSm ? '14px' : '20px'}>
                      ({tokenData.symbol})
                    </Text>
                  </Flex>
                  <Flex mt="8px" ml="46px" alignItems="center">
                    <Text mr="16px" fontSize="24px">
                      ${formatAmount(tokenData.priceUSD, { notation: 'standard' })}
                    </Text>
                    <Percent value={tokenData.priceUSDChange} fontWeight={600} />
                  </Flex>
                </Flex>
                <Flex>
                  <NextLinkFromReactRouter to={`/swap?outputCurrency=${address}&chainId=${multiChainId.ARB}`}>
                    <Button height="48px" variant="primary" px="12px">Trade</Button>
                  </NextLinkFromReactRouter>
                  <NextLinkFromReactRouter to={`/add/${address}?chain=${CHAIN_QUERY_NAME[chainId]}`}>
                    <Button ml="8px" variant="text" height="48px" px="12px">
                      Add Liquidity
                    </Button>
                  </NextLinkFromReactRouter>
                </Flex>
              </Flex>
            </StyledBox>

            {/* data on the right side of chart */}
            <ContentLayout>
              <Card>
                <Box p="24px">
                  <Text small color="secondary" fontSize="12px" textTransform="uppercase">
                    Liquidity
                  </Text>
                  <Text fontSize="24px">
                    ${formatAmount(tokenData.liquidityUSD)}
                  </Text>
                  <Percent value={tokenData.liquidityUSDChange} />

                  <Text mt="24px" color="secondary" fontSize="12px" textTransform="uppercase">
                    Volume 24H
                  </Text>
                  <Text fontSize="24px" textTransform="uppercase">
                    ${formatAmount(tokenData.volumeUSD)}
                  </Text>
                  <Percent value={tokenData.volumeUSDChange} />

                  <Text mt="24px" color="secondary" fontSize="12px" textTransform="uppercase">
                    Volume 7D
                  </Text>
                  <Text fontSize="24px">
                    ${formatAmount(tokenData.volumeUSDWeek)}
                  </Text>

                  <Text mt="24px" color="secondary" fontSize="12px" textTransform="uppercase">
                    Transactions 24H
                  </Text>
                  <Text fontSize="24px">
                    {formatAmount(tokenData.txCount, { isInteger: true })}
                  </Text>
                </Box>
              </Card>
              {/* charts card */}
              <ChartCard
                variant="token"
                chartData={chartData ?? []}
                tokenData={tokenData}
                tokenPriceData={adjustedPriceData}
              />
            </ContentLayout>

            {/* pools and transaction tables */}
            <Heading scale="lg" mb="16px" mt="40px">
              Pairs
            </Heading>

            <PoolTable poolDatas={poolDatas ?? []} />

            <Heading scale="lg" mb="16px" mt="40px">
              Transactions
            </Heading>

            <TransactionTable transactions={transactions ?? []} />
          </>
        )
      ) : (
        <Flex mt="80px" justifyContent="center">
          <Spinner />
        </Flex>
      )}
    </Page>
  )
}

export default TokenPage
