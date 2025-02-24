import { Link, Text, BscScanIcon } from 'components'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import truncateHash from 'utils/truncateHash'
import { useActiveChainId } from 'hooks/useActiveChainId'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
  txChainId?: number
}

const DescriptionWithTx: React.FC<React.PropsWithChildren<DescriptionWithTxProps>> = ({
  txHash,
  txChainId,
  children,
}) => {
  const { chainId } = useActiveChainId()

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      {txHash && (
        <Link external href={getBlockExploreLink(txHash, 'transaction', txChainId || chainId)}>
           View on {getBlockExploreName(txChainId || chainId)}: {truncateHash(txHash, 8, 0)}
          <BscScanIcon color="primary" ml="4px" />
        </Link>
      )}
    </>
  )
}

export default DescriptionWithTx
