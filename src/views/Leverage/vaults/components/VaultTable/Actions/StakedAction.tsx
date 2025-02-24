import { useAccount } from 'wagmi'
import styled from 'styled-components'
import { Button, Flex, Box, Text } from 'components'
import { useToast } from 'contexts'
import { useModal } from 'widgets/Modal'
import { Vault } from 'libraries/vaults'
import getTimePeriods from 'utils/getTimePeriods'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useCatchTxError from 'hooks/useCatchTxError'
import { useERC20 } from 'hooks/useContracts'
import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { fetchVaultsUserDataAsync, fetchVaultsPublicDataAsync } from 'state/vaults'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getTreasuryAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import useApprove from 'views/Leverage/vaults/hooks/useApprove'
import useActions from 'views/Leverage/vaults/hooks/useActions'
import AccountNotConnect from './AccountNotConnect'
import DepositModal from '../../DepositModal'
import useCountdown from '../../../hooks/useCountdown'

const StyledBox = styled(Box)`
  background: ${({theme}) => theme.colors.backgroundAlt2};
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-radius: 4px;
  padding: 4px;
`

const padTime = (num: number) => num.toString().padStart(2, '0')

const formatRoundTime = (secondsBetweenBlocks: number) => {
  const { days, hours, minutes, seconds } = getTimePeriods(secondsBetweenBlocks)
  const minutesSeconds = `${padTime(days)}:${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`
  return minutesSeconds
}

interface StackedActionProps {
  vault: Vault
  onDeposit: (id: string, amount: string) => Promise<any>
  onWithdraw: (id: string, amount: string) => Promise<any>
  onDone?: () => void
  onApprove: () => Promise<any>
  isApproved?: boolean
}

export function useStakedActions(lpContract, id, treasuryAddress, maxPremium) {
  const { account, chainId } = useActiveWeb3React()
  const { onDeposit, onWithdraw } = useActions()
  const dispatch = useAppDispatch()

  const { onApprove } = useApprove(lpContract, treasuryAddress)

  const onDone = useCallback(
    () => {
      dispatch(fetchVaultsUserDataAsync({ account: account!, ids: [id], chainId }))
      dispatch(fetchVaultsPublicDataAsync({ ids: [id], chainId }))
    },
    [account, id, chainId, dispatch],
  )

  return {
    onDeposit,
    onWithdraw,
    onApprove,
    onDone,
  }
}

export const StakedContainer = ({ children, ...props }) => {
  const { address: account } = useAccount()
  const { chainId } = useActiveWeb3React()
  const { vault } = props
  const lpContract = useERC20(vault?.token?.address)
  const treasuryAddress = getTreasuryAddress(chainId)
  // const maxPremium = new BigNumber(vault.bondPrice).times(1.005).toJSON()
  const { onDeposit, onWithdraw, onApprove, onDone } = useStakedActions(lpContract, vault.id, treasuryAddress, 0)

  const { allowance } = vault.userData || {}

  const isApproved = account && allowance && new BigNumber(allowance).isGreaterThan(0)

  return children({
    vault,
    onDeposit,
    onWithdraw,
    onDone,
    onApprove,
    isApproved,
  })
}

const Staked: React.FunctionComponent<React.PropsWithChildren<StackedActionProps>> = ({
  vault,
  onDone,
  onDeposit,
  onWithdraw,
  onApprove,
  isApproved
}) => {
  // const dispatch = useAppDispatch()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { account, chainId } = useActiveWeb3React()

  const { secondsRemaining } = useCountdown((vault.userData?.lastLockTime ?? 0) + 40 * 24 * 3600)
  const countdown = formatRoundTime(secondsRemaining).split(":")

  const handleMint = async (amount: string) => {
    const receipt = await fetchWithCatchTxError(() => onDeposit(vault.id.toString(), amount))

    if (receipt?.status) {
      toastSuccess(
        `Deposit!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have deposited {vault.name} vault.
        </ToastDescriptionWithTx>,
      )
      onDone?.()
    }
  }

  const handleWithdraw = async (amount: string) => {
    const receipt = await fetchWithCatchTxError(() => onWithdraw(vault.id.toString(), amount))

    if (receipt?.status) {
      toastSuccess(
        'Withdraw!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have unlocked {vault.name} vault.
        </ToastDescriptionWithTx>,
      )
      onDone?.()
    }
  }

  const handleApprove = async () => {
    const receipt = await fetchWithCatchTxError(() => onApprove())
    if (receipt?.status) {
      toastSuccess('Contract Enabled', <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
      onDone?.()
    }
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={new BigNumber(vault.userData?.balance ?? 0)}
      vault={vault}
      addLiquidityUrl={`/swap?outputCurrency=${vault.token.address}`}
      enablePendingTx={pendingTx}
      onConfirm={handleMint}
      handleApprove={handleApprove}
    />,
    true,
    true,
    `vault-deposit-modal-${vault.id}`,
  )

  if (!account) {
    return (
      <Flex mt="30px">
        <ConnectWalletButton />
      </Flex>
    )
  }

  return (
    <>
    {countdown && new BigNumber(vault.userData?.amount ?? 0).isGreaterThan(0) ? <Flex justifyContent="space-between" alignItems="center">
        <Text>Unlock Timer:</Text>
        <Flex justifyContent="center" mt="10px">
          <StyledBox><Text fontSize="18px">{countdown[0]}</Text></StyledBox>
          <StyledBox ml="5px"><Text fontSize="18px">{countdown[1]}</Text></StyledBox>
          <StyledBox ml="5px"><Text fontSize="18px">{countdown[2]}</Text></StyledBox>
          <StyledBox ml="5px"><Text fontSize="18px">{countdown[3]}</Text></StyledBox>
        </Flex>
      </Flex> : <></>}
    <Flex justifyContent="space-between" mt="30px">
      <Button width="48%" height="36px" onClick={onPresentDeposit} variant="primary">
        Deposit
      </Button>
      <Button 
        width="48%" 
        height="36px"
        onClick={() => handleWithdraw(vault.userData?.amount ?? "0")} 
        variant="danger"
        disabled={secondsRemaining > 0 || new BigNumber(vault.userData?.amount ?? 0).isEqualTo(0)}
      >
        Withdraw
      </Button>
    </Flex>
    </>
  )
}

export default Staked
