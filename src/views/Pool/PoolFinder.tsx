import { Currency } from 'libraries/swap-sdk'
import { Button, ChevronDownIcon, Text, NextLinkFromReactRouter, Flex, Box, Card, CardBody, OpenNewIcon, AddIcon } from 'components'
import Page from 'components/Layout/Page'
import { useModal } from 'widgets/Modal'
import { useAccount } from 'wagmi'
import { BIG_INT_ZERO } from 'config/constants/exchange'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AppBody, AppHeader } from 'components/App'
import { AutoColumn } from 'components/Layout/Column'
import Row from 'components/Layout/Row'
import Dots from 'components/Loader/Dots'
import { CurrencyLogo } from 'components/Logo'
import { MinimalPositionCard } from 'components/PositionCard'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { PairState, usePair } from 'hooks/usePairs'
import { usePairAdder } from 'state/user/hooks'
import { useTokenBalance } from 'state/wallet/hooks'
import { currencyId } from 'utils/currencyId'
import { CommonBasesType } from 'components/SearchModal/types'
import { BitfinityBridgeBox } from 'views/Swap/components/styleds'

enum Fields {
  TOKEN0 = 0,
  TOKEN1 = 1,
}

const StyledBox = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.primary3D};
  padding: 10px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 8px;
  height: 72px;
  padding: 0 16px;
`

export default function PoolFinder() {
  const { address: account } = useAccount()
  const native = useNativeCurrency()

  const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)
  const [currency0, setCurrency0] = useState<Currency | null>(native)
  const [currency1, setCurrency1] = useState<Currency | null>(null)

  const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)
  const addPair = usePairAdder()
  useEffect(() => {
    if (pair) {
      addPair(pair)
    }
  }, [pair, addPair])

  const validPairNoLiquidity: boolean =
    pairState === PairState.NOT_EXISTS ||
    Boolean(
      pairState === PairState.EXISTS &&
        pair &&
        pair.reserve0.quotient === BIG_INT_ZERO &&
        pair.reserve1.quotient === BIG_INT_ZERO,
    )

  const position = useTokenBalance(account ?? undefined, pair?.liquidityToken)
  const hasPosition = Boolean(position && position.quotient > BIG_INT_ZERO)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      if (activeField === Fields.TOKEN0) {
        setCurrency0(currency)
      } else {
        setCurrency1(currency)
      }
    },
    [activeField],
  )

  const prerequisiteMessage = (
    <Card mt="12px">
      <CardBody>
        <Text textAlign="center">
          {!account ? 'Connect to a wallet to find pools' : 'Select a token to find your liquidity.'}
        </Text>
      </CardBody>
    </Card>
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
      commonBasesType={CommonBasesType.LIQUIDITY}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  return (
    <Page>
      <Flex justifyContent="center" mt="40px">
        <AppBody>
          <AppHeader title='Import Pool' backTo="/liquidity" />
          <AutoColumn style={{marginTop: "10px"}}>
            <StyledButton
              endIcon={<ChevronDownIcon />}
              onClick={() => {
                onPresentCurrencyModal()
                setActiveField(Fields.TOKEN0)
              }}
            >
              {currency0 ? (
                <Row>
                  <CurrencyLogo currency={currency0} size='32px' />
                  <Text ml="8px">{currency0.symbol}</Text>
                </Row>
              ) : (
                <Text ml="8px">Select a Token</Text>
              )}
            </StyledButton>

            <Flex my="-16px" justifyContent="center" zIndex="2">
              <StyledBox>
                <AddIcon width="16px" />
              </StyledBox>
            </Flex>

            <StyledButton
              endIcon={<ChevronDownIcon />}
              onClick={() => {
                onPresentCurrencyModal()
                setActiveField(Fields.TOKEN1)
              }}
            >
              {currency1 ? (
                <Row>
                  <CurrencyLogo currency={currency1} size='32px' />
                  <Text ml="8px">{currency1.symbol}</Text>
                </Row>
              ) : (
                <Text as={Row}>Select a Token</Text>
              )}
            </StyledButton>

            {currency0 && currency1 ? (
              pairState === PairState.EXISTS ? (
                hasPosition && pair ? (
                  <Box mt="12px">
                    <MinimalPositionCard pair={pair} />
                    <Button 
                      as={NextLinkFromReactRouter} 
                      to="/liquidity" 
                      variant="secondary" 
                      width="100%"
                      height="36px"
                      mt="12px"
                    >
                      Manage this pair
                    </Button>
                  </Box>
                ) : (
                  <Card mt="12px">
                    <CardBody>
                      <AutoColumn gap="sm" justify="center">
                        <Text textAlign="center">You don’t have liquidity in this pair yet.</Text>
                        <Button
                          as={NextLinkFromReactRouter}
                          to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                          variant="secondary"
                          width="100%"
                          height="36px"
                          mt="12px"
                        >
                          Add Liquidity
                        </Button>
                      </AutoColumn>
                    </CardBody>
                  </Card>
                )
              ) : validPairNoLiquidity ? (
                <Card mt="12px">
                  <CardBody>
                    <AutoColumn gap="sm" justify="center">
                      <Text textAlign="center">No pair found.</Text>
                      <Button
                        as={NextLinkFromReactRouter}
                        to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                        variant="secondary"
                        width="100%"
                        height="36px"
                        mt="12px"
                      >
                        Create pair
                      </Button>
                    </AutoColumn>
                  </CardBody>
                </Card>
              ) : pairState === PairState.INVALID ? (
                <Card mt="12px">
                  <CardBody>
                    <AutoColumn gap="sm" justify="center">
                      <Text textAlign="center" fontWeight={500}>
                        Invalid pair.
                      </Text>
                    </AutoColumn>
                  </CardBody>
                </Card>
              ) : pairState === PairState.LOADING ? (
                <Card mt="12px">
                  <CardBody>
                    <AutoColumn gap="sm" justify="center">
                      <Text textAlign="center">
                        Loading
                        <Dots />
                      </Text>
                    </AutoColumn>
                  </CardBody>
                </Card>
              ) : null
            ) : (
              prerequisiteMessage
            )}
          </AutoColumn>
        </AppBody>
      </Flex>
      {/* <Flex justifyContent="center" mt="10px">
        <BitfinityBridgeBox
          as={NextLinkFromReactRouter}
          to='https://bitfinity.omnity.network/'
          target='_blink'
          p="12px"
        >
          <Flex alignItems="center">
            <img 
              src='/images/bitfinityBridge.png' 
              width="40px" 
              height="40px" 
              alt="bridgeIcon" 
              style={{borderRadius: "12px"}}
            />
            <Box ml="10px">
              <Text fontSize="16px" lineHeight="1.2" color="primaryBright">Bitfinity token bridge</Text>
              <Text fontSize="14px" lineHeight="1.2" color="primaryBright">Deposit tokens to the Bitfinity network.</Text>
            </Box>
          </Flex>
          <Flex mr="10px">
            <OpenNewIcon color="primaryBright" />
          </Flex>
        </BitfinityBridgeBox>
      </Flex> */}
    </Page>
  )
}
