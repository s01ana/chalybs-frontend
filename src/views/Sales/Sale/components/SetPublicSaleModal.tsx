import { useCallback, useState } from "react";
import _toNumber from "lodash/toNumber";
import { 
  Button,
  AutoRenewIcon,
  Box,
  Text
} from "components";
import { Modal, ModalActions } from "widgets/Modal";
import { useToast } from "contexts";
import useCatchTxError from "hooks/useCatchTxError";
import { ToastDescriptionWithTx } from "components/Toast";
import { useAppDispatch } from "state";
import { fetchLaunchpadPublicDataAsync } from "state/launchpad";
import usePool from "../hooks/usePool";

interface DepositModalProps {
  chainId: number
  pool: `0x${string}`
  onDismiss?: () => void
}

const SetPublicSaleModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  chainId,
  pool,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const { onDisableWhitelist } = usePool(pool, false)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => dispatch(fetchLaunchpadPublicDataAsync({ address: pool, chainId })),
    [pool, chainId, dispatch],
  )

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onDisableWhitelist())

    if (receipt?.status) {
      toastSuccess(
        `Sale type changed!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have changed sale type.
        </ToastDescriptionWithTx>,
      )
      onDone()
    }
  }

  return (
    <Modal title="Set Public Sale" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Text>You are going to change sale type to public.</Text>
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx} height="48px">
            Cancel
          </Button>
          {pendingTx ? (
            <Button 
              width="100%" 
              height="48px"
              variant="primary"
              isLoading={pendingTx} 
              endIcon={<AutoRenewIcon spin color="currentColor" />}
            >
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

export default SetPublicSaleModal;
