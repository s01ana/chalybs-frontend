import { useState } from "react";
import _toNumber from "lodash/toNumber";
import { 
  Button,
  AutoRenewIcon,
  Box,
  Text,
  Input,
  Flex
} from "components";
import { Modal, ModalActions } from "widgets/Modal";
import { safeGetAddress } from "utils";
import { useToast } from "contexts";
import useCatchTxError from "hooks/useCatchTxError";
import { ToastDescriptionWithTx } from "components/Toast";
import useLock from "../hooks/useLock";

interface DepositModalProps {
  id: string
  onDismiss?: () => void
}

const TransferModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  id,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const [owner, setOwner] = useState('')
  const [ownerError, setOwnerError] = useState("Address cannot be blank");

  const { onTransferOwnership } = useLock()

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onTransferOwnership(id, owner))

    if (receipt?.status) {
      toastSuccess(
        'Lock owner changed!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have transferred lock ownership.
        </ToastDescriptionWithTx>,
      )
    }
  }

  const handleChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOwner(e.target.value)
    setOwnerError("")
    if (!safeGetAddress(e.target.value)) setOwnerError("Invalid address")
    if (e.target.value === "") setOwnerError("Address cannot be blank")
  }

  return (
    <Modal title="Transfer Ownership" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Box width="100%">
          <Flex justifyContent="space-between">
            <Text small color="primary">New Owner Address*</Text>
            {ownerError !== "" && <Text color="failure" fontSize="12px" px="4px">
              {ownerError}
            </Text>}
          </Flex>
          <Input
            id="lock-owner-input"
            placeholder='Input new owner address'
            scale="md"
            autoComplete="off"
            value={owner}
            onChange={handleChangeOwner}
          />
        </Box>
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" height="48px" disabled={pendingTx}>
            Cancel
          </Button>
          {pendingTx ? (
            <Button width="100%" isLoading={pendingTx} height="48px" variant="primary" endIcon={<AutoRenewIcon spin color="currentColor" />}>
              Confirming
            </Button>
          ) : (
            <Button
              width="100%"
              height="48px" 
              variant="primary"
              disabled={ownerError !== ""}
              onClick={async () => {
                setPendingTx(true);
                await onConfirm();
                onDismiss?.();
                setPendingTx(false);
              }}
            >
              Confirm
            </Button>
          )}
        </ModalActions>
      </Box>
    </Modal>
  );
};

export default TransferModal;
