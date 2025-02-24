import BigNumber from "bignumber.js";
import { useCallback, useState } from "react";
import _toNumber from "lodash/toNumber";
import { 
  Button,
  AutoRenewIcon,
  Box,
  Text,
  Input,
  Flex,
  Checkbox
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
  endTime: number
  onDismiss?: () => void
}

const SetWhitelistModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  chainId,
  pool,
  endTime,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const [enablePublicTime, setEnablePublicTime] = useState<boolean>(false)
  const [time, setTime] = useState<string>("")
  const [publicTime, setPublicTime] = useState<BigNumber>(new BigNumber(endTime))

  const { onEnableWhitelist } = usePool(pool, false)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => {
      dispatch(fetchLaunchpadPublicDataAsync({ address: pool, chainId }))
    },
    [pool, chainId, dispatch],
  )

  const onConfirm = async (val: string) => {
    const receipt = await fetchWithCatchTxError(() => onEnableWhitelist(val))

    if (receipt?.status) {
      toastSuccess(
        `Sale type changed!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have changed sale type to whitelisted.
        </ToastDescriptionWithTx>,
      )
      onDone()
    }
  }

  const handleChangePublicTime = (e) => {
    setTime(e.target.value)
    setPublicTime(new BigNumber(Date.parse(`${e.target.value.replace("T", " ")} GMT`)).div(1000))
  }

  return (
    <Modal title="Whitelist Setting" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Flex alignItems="center" mb="10px" onClick={() => setEnablePublicTime(!enablePublicTime)}>
          <Checkbox
            scale="sm"
            checked={enablePublicTime}
            readOnly
          />
          <Text ml="10px">Setting Public Sale Start Time</Text>
        </Flex>
        {enablePublicTime && <Box width="100%">
          <Text fontSize="12px" color="primary">Public Sale Start Time (UTC)*</Text>
          <Input
            type="datetime-local"
            placeholder="Select date"
            scale="md"
            value={time}
            onChange={handleChangePublicTime}
          />
        </Box>}
        <ModalActions>
          <Button 
            variant="secondary" 
            onClick={onDismiss} 
            width="100%" disabled={pendingTx}
            height="48px"
          >
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
              // disabled={}
              onClick={async () => {
                setPendingTx(true);
                await onConfirm(publicTime.toJSON());
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

export default SetWhitelistModal;
