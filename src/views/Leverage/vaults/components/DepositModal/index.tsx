import BigNumber from "bignumber.js";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import _toNumber from "lodash/toNumber";
import { getFullDisplayBalance, getDecimalAmount } from "utils/formatBalance";
import { Vault } from "libraries/vaults";
import { BIG_TEN, BIG_ZERO } from "utils/bigNumber";
import { trimTrailZero } from "utils/trimTrailZero";
import { 
  Flex,
  // Box,
  Text,
  Button,
  // IconButton,
  // Skeleton,
  // Message,
  // MessageText,
  AutoRenewIcon,
  // ErrorIcon,
  // CalculateIcon,
  // RoiCalculatorModal,
} from "components";

import { Modal, ModalBody, ModalActions, ModalInputForVault, ModalInput } from "widgets/Modal";

const AnnualRoiContainer = styled((props) => <Flex {...props} />)`
  cursor: pointer;
`;

const AnnualRoiDisplay = styled((props) => <Text {...props} />)`
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
`;

interface DepositModalProps {
  max: BigNumber;
  vault: Vault;
  addLiquidityUrl?: string;
  enablePendingTx?: boolean;
  onDismiss?: () => void;
  onConfirm: (amount: string) => void;
  handleApprove?: () => void;
}

const DepositModal: React.FC<React.PropsWithChildren<DepositModalProps>> = ({
  max,
  vault,
  addLiquidityUrl = "",
  enablePendingTx,
  onConfirm,
  onDismiss,
  handleApprove
}) => {
  const [val, setVal] = useState("0");
  const [pendingTx, setPendingTx] = useState(false);
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, vault.token.decimals);
  }, [max, vault]);

  const needEnable = useMemo(() => {
    if (vault.name === "BNB") return false
    if (vault.userData?.allowance) {
      const amount = getDecimalAmount(new BigNumber(val), vault.token.decimals);
      return amount.gt(vault.userData.allowance);
    }
    return false;
  }, [vault, val]);

  const lpTokensToStake = val ? new BigNumber(val) : BIG_ZERO
  const fullBalanceNumber = useMemo(() => new BigNumber(fullBalance), [fullBalance]);

  // const willGetValueBN = lpTokensToStake.div(new BigNumber(vault.bondPrice)).times(100)

  // const willGetValueWithLP = vault.lpBond? willGetValueBN.times(vault.totalLpValue).div(vault.totalLpSupply).times(BIG_TEN.pow(9)) : willGetValueBN
  // const formattedAnnualRoi = formatNumber(willGetValueWithLP.toNumber(), willGetValueWithLP.gt(10000) ? 0 : 2, willGetValueWithLP.gt(10000) ? 0 : 2);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        const inputVal = e.currentTarget.value.replace(/,/g, ".");
        setVal(inputVal);
      }
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  const handlePercentInput = useCallback(
    (percent: number) => {
      const totalAmount = fullBalanceNumber.dividedBy(100).multipliedBy(percent);
      const amount = trimTrailZero(totalAmount.toNumber().toFixed(vault.token.decimals));
      setVal(amount as string);
    },
    [fullBalanceNumber, vault]
  );

  return (
    <Modal title={`Deposit ${vault.name}`} onDismiss={onDismiss}>
      <ModalBody width={["100%", "100%", "100%", "420px"]}>
        <ModalInputForVault
          value={val}
          valueUSDPrice={undefined}
          onSelectMax={handleSelectMax}
          onPercentInput={handlePercentInput}
          onChange={handleChange}
          max={fullBalance}
          maxAmount={fullBalanceNumber}
          symbol={vault.name}
          addLiquidityUrl="addLiquidityUrl"
          inputTitle={`Deposit ${vault.name}`}
          decimals={vault.token.decimals}
          needEnable={needEnable}
        />
        <ModalActions>
          <Button variant="secondary" onClick={onDismiss} width="100%" height="36px" disabled={pendingTx}>
            Cancel
          </Button>
          {needEnable ? (
            <Button
              width="100%"
              height="36px"
              isLoading={pendingTx}
              endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
              onClick={async () => {
                setPendingTx(true);
                await handleApprove?.();
                setPendingTx(false);
              }}
            >
              Enable
            </Button>
          ) : pendingTx ? (
            <Button 
              width="100%" 
              height="36px"
              isLoading={pendingTx} 
              endIcon={<AutoRenewIcon spin color="currentColor" />}
            >
              Confirming
            </Button>
          ) : (
            <Button
              width="100%"
              height="36px"
              disabled={!lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(fullBalanceNumber)}
              onClick={async () => {
                setPendingTx(true);
                await onConfirm(val);
                onDismiss?.();
                setPendingTx(false);
              }}
            >
              Confirm
            </Button>
          )}
        </ModalActions>
        <Flex alignItems="center" justifyContent="space-between">
          <Text small color="textSubtle">
            The Unlock timer will refresh to 40 days after deposit.
          </Text>
        </Flex>
        {/* <LinkExternal href={addLiquidityUrl} style={{ alignSelf: "center" }}>
          {t("Get %symbol%", { symbol: vault.token.symbol })}
        </LinkExternal> */}
      </ModalBody>
    </Modal>
  );
};

export default DepositModal;
