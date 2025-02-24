import { useCallback, useMemo, useState } from 'react'
import { useAppKit } from '@reown/appkit/react'
import { CurrencyAmount, Token, Percent } from 'libraries/swap-sdk'
import styled from 'styled-components'
import {
  Button,
  Flex,
  Text,
  Box,
  OpenNewIcon,
  NextLinkFromReactRouter,
  Message,
  AddIcon,
} from 'components'
import { useModal } from 'widgets/Modal'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CommitButton } from 'components/CommitButton'
import { getLPSymbol } from 'utils/getLpSymbol'
import { transactionErrorToUserReadableMessage } from 'utils/transactionErrorToUserReadableMessage'
import { ROUTER_ADDRESS } from 'config/constants/exchange'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { AppHeader, AppBody } from 'components/App'
import { RowBetween } from 'components/Layout/Row'

import { PairState } from 'hooks/usePairs'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useTransactionDeadline } from 'hooks/useTransactionDeadline'
import { Field } from 'state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks'

import { useTransactionAdder } from 'state/transactions/hooks'
import { useUserSlippage } from 'utils/user'
import { calculateGasMargin } from 'utils'
import { calculateSlippageAmount, useRouterContract } from 'utils/exchange'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Dots from 'components/Loader/Dots'
import { CommonBasesType } from 'components/SearchModal/types'
import Page from 'components/Layout/Page'
import { usePairAdder } from 'state/user/hooks'
import { BitfinityBridgeBox } from 'views/Swap/components/styleds'
import PoolPriceBar from './PoolPriceBar'
import ConfirmAddLiquidityModal from './components/ConfirmAddLiquidityModal'
import { useCurrencySelectRoute } from './useCurrencySelectRoute'

const StyledBox = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.primary3D};
  padding: 10px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
`

export default function AddLiquidity({ currencyA, currencyB }) {
  const { account, chainId } = useAccountActiveChain()
  const { isWrongNetwork } = useActiveWeb3React()

  const { open } = useAppKit()

  const addPair = usePairAdder()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts: mintParsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
    addError,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)

  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)

  // modal and loading
  const [{ attemptingTxn, liquidityErrorMessage, txHash }, setLiquidityState] = useState<{
    attemptingTxn: boolean
    liquidityErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    attemptingTxn: false,
    liquidityErrorMessage: undefined,
    txHash: undefined,
  })

  // txn values
  const deadline = useTransactionDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippage() // custom from users

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Token> } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {},
  )

  const { handleCurrencyASelect, handleCurrencyBSelect } = useCurrencySelectRoute()

  const parsedAmounts = mintParsedAmounts

  // get formatted amounts
  const formattedAmounts = useMemo(
    () => ({
      [independentField]: typedValue,
      [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
    }),
    [
      dependentField,
      independentField,
      noLiquidity,
      otherTypedValue,
      parsedAmounts,
      typedValue,
    ],
  )

  const {
    approvalState: approvalA,
    approveCallback: approveACallback,
  } = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS[chainId])
  const {
    approvalState: approvalB,
    approveCallback: approveBCallback,
  } = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS[chainId])

  const addTransaction = useTransactionAdder()

  const routerContract = useRouterContract()

  async function onAdd() {
    if (!chainId || !account || !routerContract) return

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = mintParsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB || !deadline) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage ?? 0)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage ?? 0)[0],
    }

    let estimate: any
    let method: any
    let args: Array<string | string[] | number | bigint>
    let value: bigint | null
    if (currencyA?.isNative || currencyB?.isNative) {
      const tokenBIsNative = currencyB?.isNative
      estimate = routerContract.estimateGas.addLiquidityETH
      method = routerContract.write.addLiquidityETH
      args = [
        (tokenBIsNative ? currencyA : currencyB)?.wrapped?.address ?? '', // token
        (tokenBIsNative ? parsedAmountA : parsedAmountB).quotient.toString(), // token desired
        amountsMin[tokenBIsNative ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsNative ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        Number(deadline[0]).toString(),
      ]
      value = (tokenBIsNative ? parsedAmountB : parsedAmountA).quotient
    } else {
      estimate = routerContract.estimateGas.addLiquidity
      method = routerContract.write.addLiquidity
      args = [
        currencyA?.wrapped?.address ?? '',
        currencyB?.wrapped?.address ?? '',
        parsedAmountA.quotient.toString(),
        parsedAmountB.quotient.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        Number(deadline[0]).toString(),
      ]
      value = null
    }

    setLiquidityState({ attemptingTxn: true, liquidityErrorMessage: undefined, txHash: undefined })
    await estimate(args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
          // gasPrice,
        }).then((response: `0x${string}`) => {
          setLiquidityState({ attemptingTxn: false, liquidityErrorMessage: undefined, txHash: response })

          const symbolA = currencies[Field.CURRENCY_A]?.symbol
          const amountA = parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)
          const symbolB = currencies[Field.CURRENCY_B]?.symbol
          const amountB = parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)
          addTransaction({ hash: response }, {
            summary: `Add ${amountA} ${symbolA} and ${amountB} ${symbolB}`,
            translatableSummary: {
              text: 'Add %amountA% %symbolA% and %amountB% %symbolB%',
              data: { amountA: amountA ?? "", symbolA: symbolA ?? "", amountB: amountB ?? "", symbolB: symbolB ?? "" },
            },
            type: 'add-liquidity',
          })

          if (pair) {
            addPair(pair)
          }
        }),
      )
      .catch((err) => {
        if (err && err.code !== 4001) {
          console.error(`Add Liquidity failed`, err, args, value)
        }
        setLiquidityState({
          attemptingTxn: false,
          liquidityErrorMessage:
            err && err.code !== 4001
              ? `Add liquidity failed: ${transactionErrorToUserReadableMessage(err)}`
              : undefined,
          txHash: undefined,
        })
      })
  }

  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) ?? ''} ${currencies[Field.CURRENCY_A]?.symbol ?? ''} and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) ?? ''} ${currencies[Field.CURRENCY_B]?.symbol ?? ''}`

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
  }, [onFieldAInput, txHash])

  const [onPresentAddLiquidityModal] = useModal(
    <ConfirmAddLiquidityModal
      title={noLiquidity ? 'You are creating a trading pair' : 'You will receive'}
      customOnDismiss={handleDismissConfirmation}
      attemptingTxn={attemptingTxn}
      hash={txHash}
      pendingText={pendingText}
      currencyToAdd={pair?.liquidityToken}
      allowedSlippage={allowedSlippage}
      onAdd={onAdd}
      parsedAmounts={parsedAmounts}
      currencies={currencies}
      liquidityErrorMessage={liquidityErrorMessage}
      price={price}
      noLiquidity={noLiquidity}
      poolTokenPercentage={poolTokenPercentage}
      liquidityMinted={liquidityMinted}
    />,
    true,
    true,
    'addLiquidityModal',
  )

  const isValid = !error && !addError
  const errorText = error ?? addError

  const buttonDisabled =
    !isValid ||
    (approvalA !== ApprovalState.APPROVED) ||
    (approvalB !== ApprovalState.APPROVED)

  const showFieldAApproval =
    (approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING)
  const showFieldBApproval =
    (approvalB === ApprovalState.NOT_APPROVED || approvalB === ApprovalState.PENDING)

  const shouldShowApprovalGroup = (showFieldAApproval || showFieldBApproval) && isValid

  return (
    <Page>
      <Flex justifyContent="center" flexDirection="column" alignItems="center" mt="40px">
        <AppBody>
          <AppHeader
            title={
              currencies[Field.CURRENCY_A]?.symbol && currencies[Field.CURRENCY_B]?.symbol
                ? `${getLPSymbol(currencies[Field.CURRENCY_A].symbol, currencies[Field.CURRENCY_B].symbol, chainId)}`
                : 'Add Liquidity'
            }
            backTo='/liquidity'
          />
          <AutoColumn style={{marginTop: "10px"}}>
            {noLiquidity && (
              <ColumnCenter style={{marginBottom: "12px"}}>
                <Message variant="warning" style={{ width: "100%" }}>
                  <div>
                    <Text mb="8px">
                      You are the first liquidity provider.
                    </Text>
                    <Text small mb="8px">The ratio of tokens you add will set the price of this pair.</Text>
                    <Text small>Once you are happy with the rate click supply to review.</Text>
                  </div>
                </Message>
              </ColumnCenter>
            )}
            <CurrencyInputPanel
              showBUSD
              onInputBlur={undefined}
              error={false}
              disabled={false}
              beforeButton={<></>}
              onCurrencySelect={handleCurrencyASelect}
              value={formattedAmounts[Field.CURRENCY_A]}
              onUserInput={onFieldAInput}
              onPercentInput={(percent) => {
                if (maxAmounts[Field.CURRENCY_A]) {
                  onFieldAInput(maxAmounts[Field.CURRENCY_A]?.multiply(new Percent(percent, 100)).toExact() ?? '')
                }
              }}
              onMax={() => {
                onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
              }}
              showQuickInputButton
              showMaxButton
              maxAmount={maxAmounts[Field.CURRENCY_A]}
              currency={currencies[Field.CURRENCY_A]}
              id="add-liquidity-input-tokena"
              showCommonBases
              commonBasesType={CommonBasesType.LIQUIDITY}
            />
            <Flex my="-16px" justifyContent="center" zIndex="2">
              <StyledBox>
                <AddIcon width="16px" />
              </StyledBox>
            </Flex>
            <CurrencyInputPanel
              showBUSD
              onInputBlur={undefined}
              error={false}
              beforeButton={<></>}
              onCurrencySelect={handleCurrencyBSelect}
              value={formattedAmounts[Field.CURRENCY_B]}
              onUserInput={onFieldBInput}
              onPercentInput={(percent) => {
                if (maxAmounts[Field.CURRENCY_B]) {
                  onFieldBInput(maxAmounts[Field.CURRENCY_B]?.multiply(new Percent(percent, 100)).toExact() ?? '')
                }
              }}
              onMax={() => {
                onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
              }}
              showQuickInputButton
              showMaxButton
              maxAmount={maxAmounts[Field.CURRENCY_B]}
              currency={currencies[Field.CURRENCY_B]}
              id="add-liquidity-input-tokenb"
              showCommonBases
              commonBasesType={CommonBasesType.LIQUIDITY}
            />

            {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
              <Box my='20px'>
                <PoolPriceBar
                  currencies={currencies}
                  poolTokenPercentage={poolTokenPercentage}
                  noLiquidity={noLiquidity}
                  price={price}
                />
              </Box>
            )}
            {!account ? (
              <Button
                width="100%"
                variant='primary'
                height="48px"
                onClick={() => open()}
              >
                <Text fontSize="16px">
                  Connect Wallet
                </Text>
              </Button>
            ) : isWrongNetwork ? (
              <CommitButton height="58px" />
            ) : (
              <AutoColumn gap="md">
                {shouldShowApprovalGroup && (
                  <RowBetween style={{ gap: '8px' }}>
                    {showFieldAApproval && (
                      <Button
                        onClick={approveACallback}
                        // disabled={approvalA === ApprovalState.PENDING}   // after presale
                        disabled
                        width="100%"
                        height="58px"
                        variant='secondary'
                      >
                        {approvalA === ApprovalState.PENDING ? (
                          <Dots>Enabling {currencies[Field.CURRENCY_A]?.symbol ?? 'Unknown'}</Dots>
                        ) : (
                          `Enable ${currencies[Field.CURRENCY_A]?.symbol ?? 'Unknown'}`
                        )}
                      </Button>
                    )}
                    {showFieldBApproval && (
                      <Button
                        onClick={approveBCallback}
                        // disabled={approvalB === ApprovalState.PENDING} // after presale
                        disabled
                        width="100%"
                        height="58px"
                        variant='secondary'
                      >
                        {approvalB === ApprovalState.PENDING ? (
                          <Dots>Enabling {currencies[Field.CURRENCY_B]?.symbol ?? 'Unknown'}</Dots>
                        ) : (
                          `Enable ${currencies[Field.CURRENCY_B]?.symbol ?? 'Unknown'}`
                        )}
                      </Button>
                    )}
                  </RowBetween>
                )}
                <CommitButton
                  variant={!isValid ? 'danger' : 'primary'}
                  onClick={() => {
                    setLiquidityState({
                      attemptingTxn: false,
                      liquidityErrorMessage: undefined,
                      txHash: undefined,
                    })
                    onPresentAddLiquidityModal()
                  }}
                  disabled={buttonDisabled} // after presale
                  // disabled
                  height="58px"
                >
                  {errorText || 'Supply'} AFTER PRESALE
                  {/* COMING SOON */}
                </CommitButton>
              </AutoColumn>
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
