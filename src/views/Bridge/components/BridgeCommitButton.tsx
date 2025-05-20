import { useAppKit } from '@reown/appkit/react'
import { Currency, CurrencyAmount } from 'libraries/swap-sdk'
import { useCallback, useEffect, useState } from 'react'
import { useModal } from 'widgets/Modal'
import { useToast } from 'contexts'
import { CommitButton } from 'components/CommitButton'
import Column from 'components/Layout/Column'
import { AutoRow, RowBetween } from 'components/Layout/Row'
import CircleLoader from 'components/Loader/CircleLoader'
import { ApprovalState } from 'hooks/useApproveCallback'
import { Field } from 'state/swap/actions'
import ProgressSteps from 'views/Swap/components/ProgressSteps'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { Button, Text } from 'components'
import useBurnToken from '../hooks/useBurnToken'
import ConfirmSwapModal from './ConfirmSwapModal'

interface SwapCommitButtonPropsType {
  account?: string
  approval: ApprovalState
  approveCallback: () => Promise<any>
  approvalSubmitted: boolean
  setApprovalSubmitted: (b: boolean) => void
  currencies: {
    INPUT?: Currency
    OUTPUT?: Currency
  }
  swapInputError?: string
  currencyBalances: {
    INPUT?: CurrencyAmount<Currency>
    OUTPUT?: CurrencyAmount<Currency>
  }
  parsedAmount?: CurrencyAmount<Currency>
  onUserInput: (field: Field, typedValue: string) => void
  pid?: number
  isNative: boolean
  sourceChain: number
  targetChain: number
  fee?: bigint
}

export default function BridgeCommitButton({
  account,
  approval,
  approveCallback,
  approvalSubmitted,
  setApprovalSubmitted,
  currencies,
  swapInputError,
  currencyBalances,
  parsedAmount,
  onUserInput,
  pid,
  isNative,
  sourceChain,
  targetChain,
  fee
}: SwapCommitButtonPropsType) {
  const { open } = useAppKit()

  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, fetchTxResponse, loading: pendingTx } = useCatchTxError()

  const { onStake } = useBurnToken(pid ?? 0, isNative)

  const [{attemptingTxn, txHash, errorMessage}, setBridgeState] = useState<{
    attemptingTxn: boolean
    txHash: string | undefined
    errorMessage: string | undefined
  }>({
    attemptingTxn: false,
    txHash: undefined,
    errorMessage: undefined
  })

  const handleSwap = async () => {
    setBridgeState({ attemptingTxn: true, txHash: undefined, errorMessage: undefined })
    const receipt = await fetchWithCatchTxError(() => onStake(parsedAmount?.toExact() ?? "0", parsedAmount?.currency.decimals ?? 18, fee))
    setApprovalSubmitted(false)

    if (receipt?.status) {
      setBridgeState({ attemptingTxn: false, txHash: receipt.transactionHash, errorMessage: undefined })
      toastSuccess(
        `Successful!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          Your funds have been locked in the bridge pool. You will receive the funds in a minute.
        </ToastDescriptionWithTx>,
      )
    } else {
      setBridgeState({ attemptingTxn: false, txHash: undefined, errorMessage: "Transaction reverted." })
    }
  }

  useEffect(() => {
    setBridgeState({ errorMessage, txHash, attemptingTxn })
  }, [attemptingTxn, errorMessage, txHash, setBridgeState])

  const handleConfirmDismiss = useCallback(() => {
    setBridgeState({ attemptingTxn, errorMessage, txHash })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, errorMessage, txHash, setBridgeState])

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      pid={pid}
      parsedAmount={parsedAmount}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={account}
      onConfirm={handleSwap}
      errorMessage={errorMessage}
      customOnDismiss={handleConfirmDismiss}
      sourceChain={sourceChain}
      targetChain={targetChain}
      fee={fee}
    />,
    true,
    true,
    'confirmBridgeModal',
  )

  const onSwapHandler = useCallback(() => {
    setBridgeState({
      attemptingTxn: false,
      errorMessage: undefined,
      txHash: undefined,
    })
    onPresentConfirmModal()
  }, [onPresentConfirmModal, setBridgeState])

  if (!account) {
    return <Button
      width="100%"
      variant='primary'
      height="58px"
      onClick={() => open()}
    >
      <Text color="primaryBright" fontSize="20px">
        Connect Wallet
      </Text>
    </Button>
  }

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED))

  const isValid = !swapInputError
  const approved = approval === ApprovalState.APPROVED

  if (showApproveFlow) {
    return (
      <>
        <RowBetween>
          <CommitButton
            variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
            onClick={approveCallback}
            disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
            width="48%"
            height="56px"
          >
            {approval === ApprovalState.PENDING ? (
              <AutoRow gap="6px" justify="center">
                Enabling <CircleLoader stroke="white" />
              </AutoRow>
            ) : approvalSubmitted && approved ? (
              'Enabled'
            ) : (
              `Enable ${currencies[Field.INPUT]?.symbol ?? ''}`
            )}
          </CommitButton>
          <CommitButton
            variant='primary'
            onClick={onSwapHandler}
            width="48%"
            id="swap-button"
            disabled={!isValid || !approved || pendingTx}
            height="56px"
          >
            {
              pendingTx ? 
                <AutoRow gap="6px" justify="center">
                  Bridging <CircleLoader stroke="white" />
                </AutoRow> 
              : 
                'Bridge'
            }
          </CommitButton>
        </RowBetween>
        <Column style={{ marginTop: '1rem' }}>
          <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
        </Column>
      </>
    )
  }

  return (
    <>
      <CommitButton
        variant='primary'
        onClick={onSwapHandler}
        id="swap-button"
        width="100%"
        disabled={!isValid || !approved || pendingTx}
        height="56px"
      >
        {swapInputError ||
          (pendingTx ? 
            <AutoRow gap="6px" justify="center">
              Bridging <CircleLoader stroke="white" />
            </AutoRow>
          : 
          'Bridge'
          )}
      </CommitButton>
    </>
  )
}
