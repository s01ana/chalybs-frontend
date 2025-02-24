import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { safeGetAddress } from 'utils'
import { Currency, WETH9 } from 'libraries/swap-sdk'
import useDebounce from 'hooks/useDebounce'
import { Text, Box, Message, Button, Input, Checkbox, Flex, ChevronDownIcon, MessageText } from 'components'
import { useModal } from 'widgets/Modal'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Row from 'components/Layout/Row'
import { CommonBasesType } from 'components/SearchModal/types'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useToken } from 'hooks/Tokens'
import ProgressSteps from '../../components/ProgressSteps'
import { LaunchpadFormView, TokenData } from '../../types'
import { FormContainer } from '../../components/FormContainer'

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: none;
  border-radius: 8px;
  margin-bottom: 5px;
  height: 40px;
`

export function VerifyTokenForm({
  setModalView,
  tokenData,
  setTokenData
}: {
  setModalView: Dispatch<SetStateAction<LaunchpadFormView>>
  tokenData: TokenData
  setTokenData: Dispatch<SetStateAction<TokenData>>
}) {
  const {chainId} = useActiveChainId()

  const native = useNativeCurrency()

  const { address: account } = useAccount()

  const [currency, setCurrency] = useState<Currency | null>(tokenData.currency)

  const [tokenError, setTokenError] = useState("");

  const [searchQuery, setSearchQuery] = useState<string>(tokenData.tokenAddress)
  const debouncedQuery = useDebounce(searchQuery, 200)
  const searchToken = useToken(debouncedQuery)

  const [listingOption, ] = useState(tokenData.listingOption)
  const [mainFee, setMainFee] = useState(tokenData.mainFee)
  const [tokenFee, setTokenFee] = useState(tokenData.tokenFee)

  const handleNext = async () => {
    setTokenData({
      tokenAddress: searchToken?.address ?? "",
      tokenName: searchToken?.name ?? "",
      tokenDecimals: searchToken?.decimals ?? 18,
      tokenSymbol: searchToken?.symbol ?? "",
      currency: currency ?? native,
      mainFee,
      tokenFee,
      listingOption
    })
    setModalView(LaunchpadFormView.DeFiInfo)
  }

  const handleCurrencySelect = useCallback(
    (_currency: Currency) => {
      setCurrency(_currency)
    },
    [],
  )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={handleCurrencySelect}
      showCommonBases
      selectedCurrency={currency ?? undefined}
      commonBasesType={CommonBasesType.LIQUIDITY}
    />,
    true,
    true,
    'selectCurrencyModal',
  )

  useEffect(() => {
    if (searchToken === null) {
      setTokenError("Unknown address")
    }
    if (searchToken) {
      setTokenError("")
    }
  }, [searchToken])

  useEffect(() => {
    setTokenError("")
    if (!safeGetAddress(searchQuery)) setTokenError("Invalid token address")
    if (searchQuery === "") setTokenError("Token address cannot be blank")
  }, [searchQuery])

  return (
    <Box position="inherit">
      <FormContainer>
        <Box mt="20px">
          <ProgressSteps steps={[false, false, false]} />
        </Box>
        <Box>
          <Text fontSize="18px" color="primary">1. Verify Token</Text>
          <Text fontSize="14px">Enter the token address and verify</Text>
        </Box>
        <Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Token Address*</Text>
            <Input
              id="token-search-input"
              placeholder="Input token address"
              scale="md"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {tokenError !== "" && <Text color="failure" fontSize="14px" px="4px">
              {tokenError}
            </Text>}
            {searchToken && 
              <>
                <Flex width="100%" justifyContent="space-between" px="20px" mt="10px">
                  <Text>Token Name</Text>
                  <Text>{searchToken.name}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="20px" mt="10px">
                  <Text>Token Symbol</Text>
                  <Text>{searchToken.symbol}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="20px" mt="10px">
                  <Text>Token Decimals</Text>
                  <Text>{searchToken.decimals}</Text>
                </Flex>
              </>
            }
          </Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Currency</Text>
            <Flex alignItems="center" flexDirection={["column", "column", "row"]}>
              <StyledButton
                endIcon={<ChevronDownIcon />}
                onClick={() => {
                  onPresentCurrencyModal()
                }}
              >
                {currency ? (
                  <Row>
                    <CurrencyLogo currency={currency} />
                    <Text ml="8px">{currency.symbol}</Text>
                  </Row>
                ) : (
                  <Text ml="8px">Select a Token</Text>
                )}
              </StyledButton>
              <Text color="text" fontSize="14px" ml="20px">Users will pay with {currency?.symbol ?? ""} for your token</Text>
            </Flex>
          </Box>
          <Box mb="20px">
            <Text fontSize="12px" color="primary">Fee Options</Text>
            <Flex
              alignItems="center"
              onClick={
                () => {
                  setMainFee("50")
                  setTokenFee("0")
                }
              }
            >
              <Checkbox
                scale="sm"
                checked={mainFee === "50"}
                value="50"
                readOnly
              />
              <Text ml="20px">5% {currency?.symbol ?? ""} raised only</Text>
            </Flex>
            <Flex 
              alignItems="center" 
              onClick={
                () => {
                  setMainFee("20")
                  setTokenFee("20")
                }
              }
            >
              <Checkbox
                scale="sm"
                checked={mainFee === "20"}
                value="20"
                readOnly
              />
              <Text ml="20px">2% {currency?.symbol ?? ""} raised + 2% token sold</Text>
            </Flex>
          </Box>
        </Box>
        {currency !== native && <Message variant="warning" icon={false} p="8px 12px">
          <MessageText color="text">
            <span>For auto liquidity tokens, or tokens that depend on {WETH9[chainId].symbol} pair, It will lead to error when finalizing the pool or transfering the tokens (for example Liquidity Generator Token).</span>
          </MessageText>
        </Message>}
        {!account ? <ConnectWalletButton /> : <Button
          onClick={handleNext}
          disabled={tokenError !== "" || searchQuery === ""}
          height="48px"
          variant='primary'
        >Next</Button>}
      </FormContainer>
    </Box>
  )
}
