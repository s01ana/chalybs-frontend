import BigNumber from "bignumber.js";
import styled from "styled-components";
import { Box, Flex } from "../../components/Box";
import { Text } from "../../components/Text";
import { Input, InputProps } from "../../components/Input";

interface ModalInputProps {
  max: string;
  symbol: string;
  onSelectMax?: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  decimals?: number;
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: ${({ theme, isWarning }) => (isWarning ? theme.colors.warning : theme.shadows.inset)};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`;

const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  border: none;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`;

const StyledBox = styled(Box)`
  cursor: pointer;
  :hover{
    color: ${({ theme }) => theme.colors.invertedContrast};
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`;

const ModalInputForTrigger: React.FC<React.PropsWithChildren<ModalInputProps>> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  decimals = 18,
}) => {
  const isBalanceZero = max === "0" || !max;

  return (
    <div style={{ position: "relative" }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          {/* <Text fontSize="14px"></Text> */}
          {onSelectMax && <StyledBox onClick={onSelectMax}>
            <Text fontSize="14px">Max: {max}</Text>
          </StyledBox>}
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          <Text fontSize="16px">
            {symbol}
          </Text>
        </Flex>
      </StyledTokenInput>
    </div>
  );
};

export default ModalInputForTrigger;
