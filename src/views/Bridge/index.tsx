import BigNumber from 'bignumber.js'
import addresses from 'config/constants/contracts'
import { Currency, CurrencyAmount, NATIVE, Percent } from 'libraries/swap-sdk'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useCurrencyBridge } from 'hooks/Tokens'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import replaceBrowserHistory from 'utils/replaceBrowserHistory'
import { useBridgeActionHandlers } from 'state/swap/useSwapActionHandlers'
import { Field } from 'state/swap/actions'
import { combinedTokenMapFromOfficialsUrlsAtom } from 'state/lists/hooks'
import { useDefaultsFromURLSearchBridge, useSwapState } from 'state/swap/hooks'
import Page from 'components/Layout/Page'
import { Box, Flex } from 'components/Box'
import { AppBody } from 'components/App'
import CurrencyInputBridgePanel from 'views/Bridge/components/CurrencyInputBridgePanel'
import { AutoRow } from 'components/Layout/Row'
import { ArrowDownIcon, ArrowUpDownIcon, IconButton, Text } from 'components'
import { CommonBasesType } from 'components/SearchModal/types'
import { useAtomValue } from 'jotai'
import { iconDownClass, iconUpDownClass, switchButtonClass } from 'theme/css/SwapWidget.css'
import { Wrapper } from 'views/Swap/components/styleds'
import { ChainId } from 'config/chains'
import useBridgePool from 'hooks/useBridgePool'
import CurrencyInputHeader from 'views/Swap/components/CurrencyInputHeader'
import useBridgeTransactions from 'hooks/useBridgeTransactions'
import { useBridgeInfo } from './hooks/useBridgeInfo'
import BridgeCommitButton from './components/BridgeCommitButton'
import TransactionTable from './components/TransactionTable'

const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 30px;
`

const StyledBox1 = styled(Box)`
  background: ${({ theme }) => theme.colors.input};
  padding: 9px 0;
  border-radius: 30px;
  border: 2px solid ${({ theme }) => theme.colors.primary3D};
`

const getPID = (symbol?: string) => {
  if (symbol === "USDT") {
    return {pid: 0, isNative: false}
  }
  return {pid: undefined, isNative: undefined}
}

export default function Swap() {
  const tokenMap = useAtomValue(combinedTokenMapFromOfficialsUrlsAtom)
  useDefaultsFromURLSearchBridge()

  const { chainId, account } = useAccountActiveChain()

  const { switchNetworkAsync } = useSwitchNetwork()

  const [sourceChain, setSourceChain] = useState(ChainId.BSC)
  const [targetChain, setTargetChain] = useState(ChainId.KAI)

  const [page, setPage] = useState(1)

  const { data: transactionData } = useBridgeTransactions()

  const {
    independentField,
    typedValue,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  // console.log(inputCurrencyId)
  const inputCurrency = useCurrencyBridge(chainId, inputCurrencyId)
  const outputCurrency = useCurrencyBridge(targetChain, inputCurrencyId)

  const currencies: { [field in Field]?: Currency } = useMemo(
    () => ({
      [Field.INPUT]: inputCurrency ?? undefined,
      [Field.OUTPUT]: outputCurrency ?? undefined,
    }),
    [inputCurrency, outputCurrency],
  )

  replaceBrowserHistory('token', inputCurrency?.symbol)

  const {pid, isNative} = getPID(inputCurrency?.symbol)

  const { poolInfo, fee } = useBridgePool(sourceChain, pid)
  const { poolInfo: targetPoolInfo, fee: targetPoolFee } = useBridgePool(targetChain, pid)

  const { onCurrencySelection, onUserInput } = useBridgeActionHandlers()

  const handleInputSelect = useCallback(
    (newCurrencyInput) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, newCurrencyInput)
    },
    [inputCurrencyId, outputCurrencyId, onCurrencySelection],
  )

  const {
    currencyBalances,
    parsedAmount,
    inputError: stableSwapInputError,
  } = useBridgeInfo(typedValue, inputCurrency!, outputCurrency!, targetPoolInfo?.[1].toString(), poolInfo?.[2].toString(), poolInfo?.[3])

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )

  const formattedAmounts = {
    [independentField]: typedValue,
  }

  // check whether the user has approved the router on the input token
  const {approvalState, approveCallback} = useApproveCallback(parsedAmount, addresses.bridge[sourceChain])

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted])

  const maxAmountInput: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handlePercentInput = useCallback(
    (percent) => {
      if (maxAmountInput) {
        onUserInput(Field.INPUT, maxAmountInput.multiply(new Percent(percent, 100)).toExact())
      }
    },
    [maxAmountInput, onUserInput],
  )

  useEffect(() => {
    if (chainId === ChainId.KAI)
      setTargetChain(ChainId.BSC)
    if (chainId === ChainId.BSC)
      setTargetChain(ChainId.KAI)
    setSourceChain(chainId)
  }, [chainId])

  const inputNumber = new BigNumber(formattedAmounts[Field.INPUT])
  const outputNumber = inputNumber.isGreaterThan(0) ? inputNumber.toJSON() : "0"

  return (
    <Page>
      <Flex justifyContent="center" mt="40px">
        <AppBody>
          <CurrencyInputHeader
            title='Bridge'
            isSettingDisplayed={false}
          />
          <Wrapper id="swap-page" position="relative">
            <CurrencyInputBridgePanel
              label= 'From'
              value={formattedAmounts[Field.INPUT]}
              showMaxButton
              maxAmount={maxAmountInput}
              showQuickInputButton
              currency={currencies[Field.INPUT]}
              onUserInput={handleTypeInput}
              onPercentInput={handlePercentInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputSelect}
              otherCurrency={currencies[Field.OUTPUT]}
              id="swap-currency-input"
              showCommonBases
              showBUSD={((inputCurrencyId ? !!tokenMap[sourceChain]?.[inputCurrencyId] : false) || inputCurrencyId === NATIVE[sourceChain]?.symbol)}
              commonBasesType={CommonBasesType.SWAP_LIMITORDER}
              sourceChain={sourceChain}
              targetChain={targetChain}
              setTargetChain={setTargetChain}
              isTargetChain={false}
            />

              <AutoRow justify='center' my="-22px" mx="auto" zIndex="2">
                <StyledBox>
                  <StyledBox1>
                    <IconButton 
                      className={switchButtonClass}
                      variant="text"
                      // scale="md"
                      onClick={() => {
                        setApprovalSubmitted(false) // reset 2 step UI for approvals
                        switchNetworkAsync(targetChain)
                      }}
                      width="24px"
                      height="24px"
                    >
                      {/* <img src="/images/swap-arrow.png" width="36px" alt='arrow' /> */}
                      <ArrowDownIcon className={iconDownClass} color="text" />
                      <ArrowUpDownIcon className={iconUpDownClass} color="text" />
                    </IconButton>
                  </StyledBox1>
                </StyledBox>
              </AutoRow>
            <CurrencyInputBridgePanel
              value={outputNumber}
              onUserInput={handleTypeInput}
              label='To'
              disabled
              showMaxButton={false}
              currency={currencies[Field.INPUT]}
              disableCurrencySelect
              onCurrencySelect={handleInputSelect}
              otherCurrency={currencies[Field.INPUT]}
              id="swap-currency-output"
              showCommonBases
              showBUSD={((outputCurrencyId ? !!tokenMap[chainId]?.[outputCurrencyId] : false) || outputCurrencyId === NATIVE[chainId]?.symbol)}
              commonBasesType={CommonBasesType.SWAP_LIMITORDER}
              sourceChain={sourceChain}
              targetChain={targetChain}
              setTargetChain={setTargetChain}
              isTargetChain
            />

            <Box mt="1.5rem">
              <BridgeCommitButton
                account={account}
                approval={approvalState}
                approveCallback={approveCallback}
                approvalSubmitted={approvalSubmitted}
                setApprovalSubmitted={setApprovalSubmitted}
                currencies={currencies}
                swapInputError={stableSwapInputError}
                currencyBalances={currencyBalances}
                onUserInput={onUserInput}
                pid={pid}
                isNative={isNative ?? false}
                parsedAmount={parsedAmount}
                sourceChain={sourceChain}
                targetChain={targetChain}
                fee={fee}
              />
            </Box>
          </Wrapper>
        </AppBody>
      </Flex>
      {account && transactionData.length > 0 && <Flex flexDirection="column" mt="40px">
        <Text fontSize="18px" mb="12px">Transaction History</Text>
        <TransactionTable
          data={transactionData}
          length={transactionData?.length}
          page={page}
          setPage={setPage}
        />
      </Flex>}
    </Page>
  )
}
