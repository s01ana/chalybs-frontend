import { useEffect, useState } from "react";
import _toNumber from "lodash/toNumber";
import BigNumber from "bignumber.js";
import { 
  Button,
  AutoRenewIcon,
  Box,
  Text,
  Input,
  Flex
} from "components";
import { ToastDescriptionWithTx } from "components/Toast";
import { useToast } from "contexts";
import { Modal, ModalActions } from "widgets/Modal";
import { useCurrencyBalances } from "state/wallet/hooks";
import { useToken } from "hooks/Tokens";
import useCatchTxError from "hooks/useCatchTxError";
import useLock from "../hooks/useLock";

interface DepositModalProps {
  id: string
  account?: `0x${string}`
  token: string
  oldAmount: string
  oldDate: number
  onDismiss?: () => void
}

const EditModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  id,
  account,
  token,
  oldAmount,
  oldDate,
  onDismiss,
}) => {
  const { fetchWithCatchTxError  } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [pendingTx, setPendingTx] = useState(false)

  const searchToken = useToken(token)

  const relevantTokenBalances = useCurrencyBalances(account, [
    searchToken,
  ])

  const balance = relevantTokenBalances[0]?.quotient?.toString() ?? "0"

  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState("amount is a required field");

  const [lockTime, setLockTime] = useState("")
  const [lockTimeError, setLockTimeError] = useState("");

  const { onEditLock } = useLock()

  const onConfirm = async () => {
    if (!searchToken) return
    const receipt = await fetchWithCatchTxError(() => onEditLock(
      id, 
      new BigNumber(amount).times(10**searchToken?.decimals).toFixed(), 
      new BigNumber(Date.parse(`${lockTime.replace("T", " ")} GMT`)).div(1000).toFixed()
    ))

    if (receipt?.status) {
      toastSuccess(
        'Lock Edited!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          You have edited the lock.
        </ToastDescriptionWithTx>,
      )
    }
  }

  useEffect(() => {
    setLockTimeError("")
    const lockTimeInTimestamp = Date.parse(`${lockTime.replace("T", " ")} GMT`);
    if (Number.isNaN(lockTimeInTimestamp)) {setLockTimeError("Lock time cannot be blank"); return}
    if (lockTimeInTimestamp <= Date.now()) setLockTimeError("Unlock time needs to be after now")
    if (lockTimeInTimestamp <= Number(oldDate)) setLockTimeError("New unlock time should not be before old unlock time")
  }, [lockTime, oldDate])

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!searchToken) return
    setAmount(e.target.value)
    setAmountError("")
    if (Number(e.target.value) > Number(balance) / 10**searchToken?.decimals) setAmountError(`Max amount is ${Number(balance) / 10**searchToken?.decimals}`)
    if (Number(e.target.value) < Number(oldAmount)) setAmountError("New amount must be not less than current amount")
    if (Number(e.target.value) <= 0) setAmountError("Amount must be positive number")
  }

  return (
    <Modal title="Edit Lock" onDismiss={onDismiss}>
      <Box width={["100%", "100%", "100%", "420px"]}>
        <Box width="100%" mb="20px">
          <Flex justifyContent="space-between">
            <Text small color="primary">Amount*</Text>
            {amountError !== "" && <Text color="failure" fontSize="12px" px="4px">
              {amountError}
            </Text>}
          </Flex>
          <Input
            id="token-search-input"
            type="number"
            placeholder='Enter amount'
            scale="md"
            autoComplete="off"
            value={amount}
            onChange={handleChangeAmount}
          />
        </Box>
        <Box>
          <Flex justifyContent="space-between">
            <Text fontSize="14px" color="primary">Lock until (UTC)*</Text>
            {lockTimeError !== "" && <Text color="failure" fontSize="12px" px="4px">
              {lockTimeError}
            </Text>}
          </Flex>
          <Input
            type="datetime-local"
            placeholder="Select date"
            scale="md"
            value={lockTime}
            onChange={(e) => setLockTime(e.target.value)}
          />
        </Box>
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" height="48px" disabled={pendingTx}>
            Cancel
          </Button>
          {pendingTx ? (
            <Button width="100%" isLoading={pendingTx} variant="primary" height="48px" endIcon={<AutoRenewIcon spin color="currentColor" />}>
              Confirming
            </Button>
          ) : (
            <Button
              width="100%"
              variant="primary"
              height="48px"
              disabled={amountError !== "" || lockTimeError !== ""}
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

export default EditModal;
