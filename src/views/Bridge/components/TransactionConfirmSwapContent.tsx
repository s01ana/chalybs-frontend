import { useCallback, memo } from 'react'
import { ConfirmationModalContent } from 'widgets/ConfirmationModalContent'
import SwapModalFooter from './SwapModalFooter'
import SwapModalHeader from './SwapModalHeader'

const TransactionConfirmSwapContent = ({
  parsedAmount,
  recipient,
  onConfirm,
  sourceChain,
  targetChain,
  fee
}) => {
  const modalHeader = useCallback(() => {
    return parsedAmount ? (
      <SwapModalHeader
        parsedAmount={parsedAmount}
        sourceChain={sourceChain}
        targetChain={targetChain}
      />
    ) : null
  }, [
    parsedAmount,
    sourceChain,
    targetChain,
  ])

  const modalBottom = useCallback(() => {
    const SwapModalF = SwapModalFooter

    return parsedAmount && fee && recipient ? (
      <SwapModalF
        onConfirm={onConfirm}
        parsedAmount={parsedAmount}
        fee={fee}
        recipient={recipient}
        sourceChain={sourceChain}
      />
    ) : null
  }, [onConfirm, parsedAmount])

  return <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
}

export default memo(TransactionConfirmSwapContent)
