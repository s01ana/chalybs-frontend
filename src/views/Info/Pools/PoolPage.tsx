/* eslint-disable no-nested-ternary */
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonMenu,
  ButtonMenuItem,
  Card,
  Flex,
  Heading,
  HelpIcon,
  LinkExternal,
  NextLinkFromReactRouter,
  Spinner,
  Text
} from 'components'
import { useMatchBreakpoints } from 'contexts'
import { useTooltip } from 'hooks'
import { NextSeo } from 'next-seo'
import { CHAIN_QUERY_NAME } from 'config/chains'
import { useActiveChainId } from 'hooks/useActiveChainId'
import Page from 'components/Layout/Page'
import { useState, useMemo } from 'react'
import { multiChainId, multiChainScan } from 'state/info/constant'
import {
  useMultiChainPath,
  usePoolChartDataSWR,
  usePoolDatasSWR,
  usePoolTransactionsSWR,
} from 'state/info/hooks'
import { useWatchlistPools } from 'state/user/hooks'
import styled from 'styled-components'
import { getBlockExploreLink } from 'utils'
import { formatAmount } from 'utils/formatInfoNumbers'
import { CurrencyLogo, DoubleCurrencyLogo } from 'views/Info/components/CurrencyLogo'
import ChartCard from 'views/Info/components/InfoCharts/ChartCard'
import TransactionTable from 'views/Info/components/InfoTables/TransactionsTable'
import Percent from 'views/Info/components/Percent'
import SaveIcon from 'views/Info/components/SaveIcon'

const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.dropdown};
  padding: 12px;
  border-radius: 12px;
`

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 1em;
  margin-top: 16px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`

const TokenButton = styled(Flex)`
  padding: 8px 0px;
  margin-right: 16px;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const LockedTokensContainer = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  border-radius: 8px;
  max-width: 280px;
`

const PoolPage: React.FC<React.PropsWithChildren<{ address: string }>> = ({ address: routeAddress }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const [showWeeklyData, setShowWeeklyData] = useState(0)
  const { tooltip, tooltipVisible, targetRef } = useTooltip(
    `Based on last 7 days' performance. Does not account for impermanent loss`,
    {},
  )

  // In case somebody pastes checksummed address into url (since GraphQL expects lowercase address)
  const address = routeAddress.toLowerCase()

  const poolData = usePoolDatasSWR([address])?.[0]
  const chartData = usePoolChartDataSWR(address)
  const transactions = usePoolTransactionsSWR(address)

  const [watchlistPools, addPoolToWatchlist] = useWatchlistPools()
  const chainPath = useMultiChainPath()

  const feeDisplay = useMemo(() => {
    return showWeeklyData ? poolData?.lpFees7d : poolData?.lpFees24h
  }, [poolData, showWeeklyData])

  return (
    <Page>
      <NextSeo title={poolData ? `${poolData?.token0?.symbol ?? ""} / ${poolData?.token1?.symbol ?? ""}` : undefined} />
      {poolData ? (
        <>
          <StyledBox>
            <Flex justifyContent="space-between" mb="16px" flexDirection={['column', 'column', 'row']}>
              <Breadcrumbs mb="32px">
                <NextLinkFromReactRouter to={`/info${chainPath}`}>
                  <Text color="primary">Info</Text>
                </NextLinkFromReactRouter>
                <NextLinkFromReactRouter to={`/info${chainPath}/pairs`}>
                  <Text color="primary">Pairs</Text>
                </NextLinkFromReactRouter>
                <Flex>
                  <Text mr="8px">{`${poolData.token0.symbol} / ${poolData.token1.symbol}`}</Text>
                </Flex>
              </Breadcrumbs>
              <Flex justifyContent={[null, null, 'flex-end']} mt={['8px', '8px', 0]}>
                <LinkExternal
                  mr="8px"
                  href={getBlockExploreLink(address, 'address', multiChainId.ARB)}
                >
                  View on {multiChainScan.ARB}
                </LinkExternal>
                <SaveIcon fill={watchlistPools.includes(address)} onClick={() => addPoolToWatchlist(address)} />
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Flex alignItems="center">
                <DoubleCurrencyLogo
                  address0={poolData.token0.address as `0x${string}`}
                  address1={poolData.token1.address as `0x${string}`}
                  size={32}
                  chainName="ARB"
                />
                <Text
                  ml="38px"
                  fontSize={isXs || isSm ? '24px' : '40px'}
                  id="info-pool-pair-title"
                >{`${poolData.token0.symbol} / ${poolData.token1.symbol}`}</Text>
              </Flex>
              <Flex justifyContent="space-between" flexDirection={['column', 'column', 'column', 'row']}>
                <Flex flexDirection={['column', 'column', 'row']} mb={['8px', '8px', null]}>
                  <NextLinkFromReactRouter to={`/info${chainPath}/tokens/${poolData.token0.address}`}>
                    <TokenButton>
                      <CurrencyLogo address={poolData.token0.address as `0x${string}`} size="24px" chainName="ARB" />
                      <Text fontSize="16px" ml="4px" style={{ whiteSpace: 'nowrap' }} width="fit-content">
                        {`1 ${poolData.token0?.symbol} =  ${formatAmount(poolData.token1Price, {
                          notation: 'standard',
                          displayThreshold: 0.001,
                          tokenPrecision: 'normal',
                        })} ${poolData.token1.symbol}`}
                      </Text>
                    </TokenButton>
                  </NextLinkFromReactRouter>
                  <NextLinkFromReactRouter to={`/info${chainPath}/tokens/${poolData.token1.address}`}>
                    <TokenButton ml={[null, null, '10px']}>
                      <CurrencyLogo address={poolData.token1.address as `0x${string}`} size="24px" chainName="ARB" />
                      <Text fontSize="16px" ml="4px" style={{ whiteSpace: 'nowrap' }} width="fit-content">
                        {`1 ${poolData.token1.symbol} =  ${formatAmount(poolData.token0Price, {
                          notation: 'standard',
                          displayThreshold: 0.001,
                          tokenPrecision: 'normal',
                        })} ${poolData.token0.symbol}`}
                      </Text>
                    </TokenButton>
                  </NextLinkFromReactRouter>
                </Flex>
                <Flex>
                  <NextLinkFromReactRouter
                    to={`/swap?inputCurrency=${poolData.token0.address}&outputCurrency=${poolData.token1.address}&chainId=${multiChainId.ARB}`}
                  >
                    <Button height="48px" variant="primary" px="12px">Trade</Button>
                  </NextLinkFromReactRouter>
                  <NextLinkFromReactRouter
                    to={`/add/${poolData.token0.address}/${poolData.token1.address}?chain=${CHAIN_QUERY_NAME[chainId]}`}
                  >
                    <Button ml="8px" variant="text" height="48px" px="12px">
                      Add Liquidity
                    </Button>
                  </NextLinkFromReactRouter>
                </Flex>
              </Flex>
            </Flex>
          </StyledBox>
          <ContentLayout>
            <Box>
              <Card>
                <Box p="24px">
                  <Flex justifyContent="space-between">
                    <Flex flex="1" flexDirection="column">
                      <Text color="secondary" fontSize="12px" textTransform="uppercase">
                        Liquidity
                      </Text>
                      <Text fontSize="24px">
                        ${formatAmount(poolData.liquidityUSD)}
                      </Text>
                      <Percent value={poolData.liquidityUSDChange} />
                    </Flex>
                    <Flex flex="1" flexDirection="column">
                      <Text color="secondary" fontSize="12px" textTransform="uppercase">
                        LP reward APR
                      </Text>
                      <Text fontSize="24px">
                        {formatAmount(poolData.lpApr7d)}%
                      </Text>
                      <Flex alignItems="center">
                        <span ref={targetRef}>
                          <HelpIcon color="textSubtle" />
                        </span>
                        <Text ml="4px" fontSize="12px" color="textSubtle">
                        7D performance
                        </Text>
                        {tooltipVisible && tooltip}
                      </Flex>
                    </Flex>
                  </Flex>
                  <Text color="secondary" mt="24px" fontSize="12px" textTransform="uppercase">
                  Total Tokens Locked
                  </Text>
                  <LockedTokensContainer>
                    <Flex justifyContent="space-between">
                      <Flex>
                        <CurrencyLogo address={poolData.token0.address as `0x${string}`} size="24px" chainName="ARB" />
                        <Text small color="textSubtle" ml="8px">
                          {poolData.token0.symbol}
                        </Text>
                      </Flex>
                      <Text small>{formatAmount(poolData.liquidityToken0)}</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Flex>
                        <CurrencyLogo address={poolData.token1.address as `0x${string}`} size="24px" chainName="ARB" />
                        <Text small color="textSubtle" ml="8px">
                          {poolData.token1.symbol}
                        </Text>
                      </Flex>
                      <Text small>{formatAmount(poolData.liquidityToken1)}</Text>
                    </Flex>
                  </LockedTokensContainer>
                </Box>
              </Card>
              <Card mt="16px">
                <Flex flexDirection="column" p="24px">
                  <ButtonMenu
                    activeIndex={showWeeklyData}
                    onItemClick={(index) => setShowWeeklyData(index)}
                    scale="sm"
                    variant="subtle"
                  >
                    <ButtonMenuItem width="100%">24H</ButtonMenuItem>
                    <ButtonMenuItem width="100%">7D</ButtonMenuItem>
                  </ButtonMenu>
                  <Flex mt="24px">
                    <Flex flex="1" flexDirection="column">
                      <Text color="secondary" fontSize="12px" textTransform="uppercase">
                        {showWeeklyData ? 'Volume 7D' : 'Volume 24H'}
                      </Text>
                      <Text fontSize="24px">
                        ${showWeeklyData ? formatAmount(poolData.volumeUSDWeek) : formatAmount(poolData.volumeUSD)}
                      </Text>
                      <Percent value={showWeeklyData ? poolData.volumeUSDChangeWeek : poolData.volumeUSDChange} />
                    </Flex>
                    <Flex flex="1" flexDirection="column">
                      <Text color="secondary" fontSize="12px" textTransform="uppercase">
                        {showWeeklyData ? 'LP reward fees 7D' : 'LP reward fees 24H'}
                      </Text>
                      <Text fontSize="24px">
                        ${formatAmount(feeDisplay)}
                      </Text>
                      <Text color="textSubtle" fontSize="12px">
                        {`out of ${showWeeklyData ? formatAmount(poolData.totalFees7d) : formatAmount(poolData.totalFees24h)} total fees`}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Box>
            <ChartCard variant="pool" chartData={chartData ?? []} />
          </ContentLayout>
          <Heading mb="16px" mt="40px" scale="lg">
            Transactions
          </Heading>
          <TransactionTable transactions={transactions ?? []} />
        </>
      ) : (
        <Flex mt="80px" justifyContent="center">
          <Spinner />
        </Flex>
      )}
    </Page>
  )
}

export default PoolPage
