import { useCallback, memo, useMemo } from 'react'
import { Currency, CurrencyAmount } from 'libraries/swap-sdk'
import { InjectedModalProps, Modal } from 'widgets/Modal'
import { ConfirmationPendingContent } from 'widgets/ConfirmationPendingContent'
import { TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { chains } from 'utils/wagmi'
import { TransactionErrorContent } from './TransactionErrorContent'
import TransactionConfirmSwapContent from './TransactionConfirmSwapContent'

const SwapTransactionErrorContent = ({ onDismiss, message }) => {
  return <TransactionErrorContent message={message} onDismiss={onDismiss} />
}

interface ConfirmSwapModalProps {
  pid?: number
  parsedAmount?: CurrencyAmount<Currency>
  attemptingTxn: boolean
  txHash?: string
  errorMessage?: string
  recipient?: string
  onConfirm: () => void
  customOnDismiss?: () => void
  sourceChain: number,
  targetChain: number,
  fee?: bigint
}

const ConfirmSwapModal: React.FC<React.PropsWithChildren<InjectedModalProps & ConfirmSwapModalProps>> = ({
  pid,
  parsedAmount,
  onConfirm,
  onDismiss,
  customOnDismiss,
  attemptingTxn,
  txHash,
  errorMessage,
  recipient,
  sourceChain: sourceChainId,
  targetChain: targetChainId,
  fee
}) => {
  const { chainId } = useActiveChainId()

  const sourceChain = useMemo(() => chains.find((c) => c.id === sourceChainId), [chainId])
  const targetChain = useMemo(() => chains.find((c) => c.id === targetChainId), [chainId])

  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  const confirmationContent = useCallback(
    () =>
      errorMessage ? (
        <SwapTransactionErrorContent
          onDismiss={onDismiss}
          message={errorMessage}
        />
      ) : (
        <TransactionConfirmSwapContent
          parsedAmount={parsedAmount}
          recipient={recipient}
          onConfirm={onConfirm}
          sourceChain={sourceChain}
          targetChain={targetChain}
          fee={fee}
        />
      ),
    [
      onConfirm,
      errorMessage,
      onDismiss,
      parsedAmount,
      recipient
    ],
  )

  // text to show while loading
  const pendingText = useMemo(() => {
    return `Bridging ${parsedAmount?.toSignificant(6) ?? ''} ${parsedAmount?.currency?.symbol ?? ''} from ${sourceChain?.name} to ${targetChain?.name}`
  }, [parsedAmount, sourceChain, targetChain])

  if (!chainId) return null

  return (
    <Modal title="Review Bridging" onDismiss={handleDismiss} bodyPadding='20px' minWidth={["100%", "418px"]}>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : txHash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={txHash}
        />
      ) : (
        confirmationContent()
      )}
    </Modal>
  )
}

export default memo(ConfirmSwapModal)
