import {
  Button,
  Flex,
  Heading,
} from 'components'
import { useToast } from 'contexts'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import { Vault } from 'libraries/vaults'

interface FarmCardActionsProps {
  vault: Vault
  onDeposit: (a: string, b: string) => Promise<any>
  onDone?: () => void
}

const HarvestAction: React.FC<React.PropsWithChildren<FarmCardActionsProps>> = ({
  vault,
  onDeposit,
  onDone,
}) => {
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const pendingPayout = new BigNumber(vault.userData?.pendingReward ?? 0)

  const onClickHarvestButton = () => {
    handleHarvest()
  }

  const handleHarvest = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onDeposit(vault?.id.toString(), "0")
    })
    if (receipt?.status) {
      toastSuccess(
        `Claimed!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          Your {vault.name} earning have been sent to your wallet!
        </ToastDescriptionWithTx>,
      )
      onDone?.()
    }
  }

  return (
    <>
      <Flex mb="8px" justifyContent="space-between" alignItems="center">
        <Flex flexDirection="column" alignItems="flex-start">
          <Heading color={pendingPayout.eq(0) ? 'textDisabled' : 'text'}>{pendingPayout.div(10 ** vault.token.decimals).toFixed(3, BigNumber.ROUND_DOWN)} {vault.name}</Heading>
        </Flex>
        <Button disabled={pendingPayout.eq(0) || pendingTx} onClick={onClickHarvestButton}>
          {pendingTx ? 'Claiming' : 'Claim'}
        </Button>
      </Flex>
    </>
  )
}

export default HarvestAction
