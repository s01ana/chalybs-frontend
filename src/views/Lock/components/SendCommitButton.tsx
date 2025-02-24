import { Dispatch, SetStateAction } from 'react'
import BigNumber from 'bignumber.js'
import { useAppKit } from '@reown/appkit/react'
import styled from 'styled-components'
import { Button, Flex, Text } from 'components'
import { useToast } from 'contexts'
import { publicClient } from 'utils/viem'
import { lockerABI } from 'config/abi/locker'
import { CommitButton } from 'components/CommitButton'
import { AutoRow } from 'components/Layout/Row'
import CircleLoader from 'components/Loader/CircleLoader'
import { useCurrentBlock } from 'state/block/hooks'
import { ApprovalState } from 'hooks/useApproveCallback'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getLockerAddress } from 'utils/addressHelpers'
import useCreateLock from '../hooks/useCreateLock'
import { FinishData, LockFormView } from '../types'

const StyledFlex = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

interface SendCommitButtonPropsType {
  chainId: number
  token: string
  symbol: string
  decimals: number
  owner: string
  isLP: boolean
  amount: string
  lockTime: number
  title: string
  isVesting: boolean
  tgeRate: string
  cycle: string
  cycleRate: string
  account?: string
  approval: ApprovalState
  approveCallback: () => Promise<any>
  approvalSubmitted: boolean
  setApprovalSubmitted: (b: boolean) => void
  swapInputError?: string
  setFinishData: Dispatch<SetStateAction<FinishData>>
  setModalView: Dispatch<SetStateAction<LockFormView>>
}

export default function SendCommitButton({
  chainId,
  token,
  symbol,
  decimals,
  owner,
  isLP,
  amount,
  lockTime,
  title,
  isVesting,
  tgeRate,
  cycle,
  cycleRate,
  account,
  approval,
  approveCallback,
  approvalSubmitted,
  setApprovalSubmitted,
  swapInputError,
  setFinishData,
  setModalView
}: SendCommitButtonPropsType) {
  const { open } = useAppKit()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const { onCreateLock, onCreateVestingLock } = useCreateLock()

  const currentBlock = useCurrentBlock()

  const handleLock = async () => {
    const receipt = await fetchWithCatchTxError(() => onCreateLock(
      token, 
      owner === "" ? account : owner, 
      isLP, 
      new BigNumber(amount).times(10**decimals).toFixed(), 
      new BigNumber(lockTime).div(1000).toFixed(), 
      title
    ))

    setApprovalSubmitted(false)

    if (receipt) {
      toastSuccess(
        'Lock Created!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You've just created a lock!
        </ToastDescriptionWithTx>,
      )

      const logs = await publicClient({chainId}).getContractEvents({
        address: getLockerAddress(chainId),
        abi: lockerABI,
        eventName: 'LockAdded',
        fromBlock: BigInt(currentBlock)
      })

      const id = logs.filter((log) => log.transactionHash === receipt.transactionHash)?.[0]?.args?.id?.toString() ?? ""

      // const id = isLP ? new BigNumber(receipt.).toString() ?? "" : new BigNumber(receipt?.events[2]?.args[0]?._hex).toString() ?? ""
      if (id !== "") setFinishData({
        id,
        token,
        hash: receipt.transactionHash,
        chainId
      })
      setModalView(LockFormView.Finish)
    }
  }

  const handleVestingLock = async () => {
    const receipt = await fetchWithCatchTxError(() => onCreateVestingLock(
      token, 
      owner === "" ? account : owner, 
      isLP, 
      new BigNumber(amount).times(10**decimals).toFixed(), 
      new BigNumber(lockTime).div(1000).toFixed(), 
      new BigNumber(tgeRate).times(100).toFixed(), 
      new BigNumber(cycle).times(3600*24).toFixed(), 
      new BigNumber(cycleRate).times(100).toFixed(), 
      title
    ))

    setApprovalSubmitted(false)

    if (receipt?.status) {
      toastSuccess(
        'Lock Created!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You've just created a lock!
        </ToastDescriptionWithTx>,
      )

      const logs = await publicClient({chainId}).getContractEvents({
        address: getLockerAddress(chainId),
        abi: lockerABI,
        eventName: 'LockAdded',
        fromBlock: BigInt(currentBlock)
      })

      const id = logs.filter((log) => log.transactionHash === receipt.transactionHash)?.[0]?.args?.id?.toString() ?? ""
      if (id !== "") setFinishData({
        id,
        token,
        hash: receipt.transactionHash,
        chainId
      })
      setModalView(LockFormView.Finish)
    }
  }

  if (!account) {
    return <Button
      width="100%"
      variant='primary'
      height="48px"
      onClick={() => open()}
    >
      <Text fontSize="20px">
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
        <StyledFlex>
          <CommitButton
            variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
            onClick={approveCallback}
            disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
            width="100%"
            height="48px"
            mx="10px"
          >
            {approval === ApprovalState.PENDING ? (
              <AutoRow gap="6px" justify="center">
                Enabling <CircleLoader stroke="white" />
              </AutoRow>
            ) : approvalSubmitted && approved ? (
              `${symbol ?? ''} Enabled`
            ) : (
              `Enable ${symbol ?? ''}`
            )}
          </CommitButton>
          <CommitButton
            variant='primary'
            onClick={isVesting? handleVestingLock : handleLock}
            width="100%"
            height="48px"
            id="swap-button"
            disabled={!isValid || !approved || pendingTx}
            mx="10px"
          >
            {
              pendingTx ? 
                <AutoRow gap="6px" justify="center">
                  Creating <CircleLoader stroke="white" />
                </AutoRow> 
              : 
                'Create Lock'
            }
          </CommitButton>
        </StyledFlex>
      </>
    )
  }

  return (
    <StyledFlex>
      <CommitButton
        variant='primary'
        onClick={isVesting? handleVestingLock : handleLock}
        id="swap-button"
        width="100%"
        height="48px"
        mx="10px"
        disabled={!isValid || !approved || pendingTx}
      >
        {swapInputError ||
          (pendingTx ? 
            <AutoRow gap="6px" justify="center">
              Creating <CircleLoader stroke="white" />
            </AutoRow>
          : 
          'Create Lock')}
      </CommitButton>
    </StyledFlex>
  )
}
