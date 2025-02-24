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
import { ToastDescriptionWithTx } from "components/Toast";
import { Modal, ModalActions } from "widgets/Modal";
import { useToast } from "contexts";
import useCatchTxError from "hooks/useCatchTxError";
import useLock from "../hooks/useLock";

interface DepositModalProps {
  id: string
  onDismiss?: () => void
}

const EditDescriptionModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  id,
  onDismiss,
}) => {
  const { fetchWithCatchTxError } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState("Title cannot be blank");

  const { onEditLockDescription } = useLock()

  const onConfirm = async () => {
    const receipt = await fetchWithCatchTxError(() => onEditLockDescription(id, title))

    if (receipt?.status) {
      toastSuccess(
        'Title changed!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have changed the lock title.
        </ToastDescriptionWithTx>,
      )
    }
  }

  const handleChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setTitleError("")
    if (e.target.value === "") setTitleError("Title cannot be blank")
  }

  return (
    <Modal title="Edit Description" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Box width="100%">
          <Flex justifyContent="space-between">
            <Text small color="primary">Input Title*</Text>
            {titleError !== "" && <Text color="failure" fontSize="12px" px="4px">
              {titleError}
            </Text>}
          </Flex>
          <Input
            id="lock-owner-input"
            placeholder='Input new description'
            scale="md"
            autoComplete="off"
            value={title}
            onChange={handleChangeOwner}
          />
        </Box>
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" height="48px" disabled={pendingTx}>
            Cancel
          </Button>
          {pendingTx ? (
            <Button width="100%" variant="primary" height="48px" isLoading={pendingTx} endIcon={<AutoRenewIcon spin color="currentColor" />}>
              Confirming
            </Button>
          ) : (
            <Button
              width="100%"
              variant="primary"
              height="48px"
              disabled={titleError !== ""}
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
  )
}

export default EditDescriptionModal;
