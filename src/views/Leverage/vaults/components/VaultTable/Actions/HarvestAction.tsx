import { useCallback } from 'react'
// import { useAccount } from 'wagmi'
import { Heading, Button, Text } from 'components'
import { useToast } from 'contexts'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { Vault } from 'libraries/vaults'
import { useAppDispatch } from 'state'
import { fetchVaultsUserDataAsync } from 'state/vaults'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
// import { useERC20 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useActions from '../../../hooks/useActions'

import { ActionContainer, ActionContent, ActionTitles } from "./styles";

interface HarvestActionProps {
  vault: Vault
  onDeposit: (id: string, amount: string) => Promise<any>
  onDone?: () => void
}

export const HarvestActionContainer = ({ children, ...props }) => {
  const { vault } = props;
  const { account, chainId } = useActiveWeb3React()
  const { onDeposit } = useActions()
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => dispatch(fetchVaultsUserDataAsync({ account: account!, ids: [vault.id], chainId })),
    [account, dispatch, chainId, vault.id],
  )

  return children({ vault, onDone, onDeposit })
}

export const HarvestAction: React.FunctionComponent<React.PropsWithChildren<HarvestActionProps>> = ({
  vault,
  onDeposit,
  onDone,
}) => {
  // const { address: account } = useAccount()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()  

  const earnings = new BigNumber(vault?.userData?.pendingReward ?? "0") ?? BIG_ZERO

  // const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  // const displayBalance = rawEarningsBalance.toFixed(5, BigNumber.ROUND_DOWN)
  // const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0

  const onClickHarvestButton = () => {
    handleHarvest()
  }

  const handleHarvest = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onDeposit(vault.id.toString(), "0")
    })
    if (receipt?.status) {
      toastSuccess(
        `Claimed!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          Your {vault.name} earnings have been sent to your wallet!
        </ToastDescriptionWithTx>,
      )
      onDone?.()
    }
  }

  return (
    <ActionContainer style={{ minHeight: 124.5 }}>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          Pending
        </Text>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pl="4px">
          {vault.name}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px" pl="4px">
          Bond
        </Text>
      </ActionTitles>
      <ActionContent>
        {/* <div>
          {earningsBusd > 0 && (
            <Balance fontSize="12px" color="textSubtle" decimals={2} value={earningsBusd} unit=" USD" prefix="~" />
          )}
        </div> */}
        <Heading color={earnings.eq(0) ? 'textDisabled' : 'text'}>{earnings.toFixed(2, BigNumber.ROUND_DOWN)} </Heading>
        <Button ml="4px" height="36px" disabled={earnings.eq(0) || pendingTx } onClick={onClickHarvestButton}>
          {pendingTx ? "Claiming" : "Claim"}
        </Button>
      </ActionContent>
    </ActionContainer>
  );
}

export default HarvestAction