import { useState } from "react";
import _toNumber from "lodash/toNumber";
import { 
  Button,
  AutoRenewIcon,
  Box,
  Text,
} from "components";
import { Modal, ModalActions } from "widgets/Modal";
import { useToast } from "contexts";
import useCatchTxError from "hooks/useCatchTxError";
import { ToastDescriptionWithTx } from "components/Toast";
import useLock from "../hooks/useLock";

interface DepositModalProps {
  id: string
  onDismiss?: () => void
}

const RenounceModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  id,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const { onRenounceOwnership } = useLock()

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onRenounceOwnership(id))

    if (receipt?.status) {
      toastSuccess(
        'Renounced!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have renounced the lock ownership.
        </ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal title="Renounce Ownership" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Text>You are going to renounce the lock ownership.</Text>
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

export default RenounceModal;
