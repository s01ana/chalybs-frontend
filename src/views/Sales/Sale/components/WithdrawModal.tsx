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

const WithdrawModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  chainId,
  pool,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const { onWithdraw } = usePool(pool, false)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => dispatch(fetchLaunchpadPublicDataAsync({ address: pool, chainId })),
    [pool, chainId, dispatch],
  )

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onWithdraw())

    if (receipt?.status) {
      toastSuccess(
        `Withdrawn!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have withdrawn from the pool.
        </ToastDescriptionWithTx>,
      )
      onDone()
    }
  }

  return (
    <Modal title="Withdraw" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Text>You are going to withdraw your fund from this pool.</Text>
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx} height="48px">
            Cancel
          </Button>
          {pendingTx ? (
            <Button 
              height="48px"
              variant="primary"
              width="100%" 
              isLoading={pendingTx} 
              endIcon={<AutoRenewIcon spin color="currentColor" />}
            >
              Confirming
            </Button>
          ) : (
            <Button
              height="48px"
              variant="primary"
              width="100%"
              // disabled={}
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

export default WithdrawModal;
