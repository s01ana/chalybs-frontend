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

const FinalizeModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  chainId,
  pool,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const { onFinalize } = usePool(pool, false)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => dispatch(fetchLaunchpadPublicDataAsync({ address: pool, chainId })),
    [pool, chainId, dispatch],
  )

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onFinalize())

    if (receipt?.status) {
      toastSuccess(
        `Sale finalized!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have finalized the pool.
        </ToastDescriptionWithTx>,
      )
      onDone()
    }
  }

  return (
    <Modal title="Finalize pool" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Text>You are going to finalize this pool.</Text>
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx} height="48px">
            Cancel
          </Button>
          {pendingTx ? (
            <Button 
              variant="primary"
              width="100%" 
              isLoading={pendingTx} 
              endIcon={<AutoRenewIcon spin color="currentColor" />} 
              height="48px"
            >
              Confirming
            </Button>
          ) : (
            <Button
              variant="primary"
              width="100%"
              // disabled={}
              onClick={async () => {
                setPendingTx(true);
                await onConfirm();
                onDismiss?.();
                setPendingTx(false);
              }}
              height="48px"
            >
              Confirm
            </Button>
          )}
        </ModalActions>
      </Box>
    </Modal>
  );
};

export default FinalizeModal;
