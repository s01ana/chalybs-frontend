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

const ClaimModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  chainId,
  pool,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const { onClaim } = usePool(pool, false)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => dispatch(fetchLaunchpadPublicDataAsync({ address: pool, chainId })),
    [pool, chainId, dispatch],
  )

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onClaim())

    if (receipt?.status) {
      toastSuccess(
        `Claimed!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have claimed from the pool.
        </ToastDescriptionWithTx>,
      )
      onDone()
    }
  }

  return (
    <Modal title="Claim" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Text>You are going to claim from this pool.</Text>
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

export default ClaimModal;
