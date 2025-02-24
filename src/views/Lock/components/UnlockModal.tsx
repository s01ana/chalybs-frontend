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

const UnlockModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  id,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const { onUnlock } = useLock()

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onUnlock(id))

    if (receipt?.status) {
      toastSuccess(
        'Unlocked!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have unlocked the token.
        </ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal title="Unlock" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Text>You are going to unlock the token.</Text>
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

export default UnlockModal;
