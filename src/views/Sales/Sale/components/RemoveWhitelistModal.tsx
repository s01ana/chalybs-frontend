import { useCallback, useState } from "react";
import _toNumber from "lodash/toNumber";
import styled from "styled-components";
import { 
  Button,
  AutoRenewIcon,
  Box,
  Text,
  TextArea
} from "components";
import { Modal, ModalActions } from "widgets/Modal";
import { useToast } from "contexts";
import useCatchTxError from "hooks/useCatchTxError";
import { ToastDescriptionWithTx } from "components/Toast";
import { useAppDispatch } from "state";
import { fetchLaunchpadPublicDataAsync } from "state/launchpad";
import { safeGetAddress } from "utils";
import usePool from "../hooks/usePool";

interface DepositModalProps {
  chainId: number
  pool: `0x${string}`
  onDismiss?: () => void
}

const StyledTextArea = styled(TextArea)`
  max-width: 100%;
  min-width: 100%;
  ::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`

const RemoveWhitelistModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  chainId,
  pool,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const [allocation, setAllocation] = useState<string[]>([])
  const [error, setError] = useState("")
  const [display, setDisplay] = useState("")

  const { onRemoveWhitelist } = usePool(pool, false)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => {
      dispatch(fetchLaunchpadPublicDataAsync({ address: pool, chainId }))
    },
    [pool, chainId, dispatch],
  )

  const onConfirm = async (val: string[]) => {
    const receipt = await fetchWithCatchTxError(() => onRemoveWhitelist(val))

    if (receipt?.status) {
      toastSuccess(
        `Whitelist removed!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have removed whitelist.
        </ToastDescriptionWithTx>,
      )
      onDone()
    }
  }

  const placeholder = `Insert Address: separate with breaks line.
Ex:
0x0000000000000000000000000000000000001000
0x0000000000000000000000000000000000002000
0x0000000000000000000000000000000000003000
  `

  const handleAllocation = (e: any) => {
    setDisplay(e.target.value)
    if (e.target.value !== "") {
      setError("")
    } else {
      setError("allocation is required")
    }
    const list = e.target.value.split("\n")
    const _allocation: any[] = []
    for (let i = 0; i < list.length; i++) {
      const element = list[i].replace(" ", "").replace(",", "")
      if (!safeGetAddress(element)) {
        setError(`Invalid address at line ${i+1}`)
        return
      }
      _allocation.push(element)
    }
    setAllocation(_allocation)
  }

  return (
    <Modal title="Remove users from Whitelist" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Text fontSize="12px" color="primary">Allocation*</Text>
        <StyledTextArea
          rows={12}
          placeholder={placeholder}
          value={display}
          onChange={handleAllocation}
        />
        {error !== "" && <Text color="failure" fontSize="14px" px="4px">
          {error}
        </Text>}
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx} height="48px">
            Cancel
          </Button>
          {pendingTx ? (
            <Button 
              variant="primary"
              width="100%" 
              height="48px"
              isLoading={pendingTx} 
              endIcon={<AutoRenewIcon spin color="currentColor" />}
            >
              Confirming
            </Button>
          ) : (
            <Button
              width="100%"
              height="48px"
              disabled={error !== ""}
              onClick={async () => {
                setPendingTx(true);
                await onConfirm(allocation);
                onDismiss?.();
                setPendingTx(false);
              }}
              variant="primary"
            >
              Confirm
            </Button>
          )}
        </ModalActions>
      </Box>
    </Modal>
  );
};

export default RemoveWhitelistModal;
