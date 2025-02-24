import { Text } from "components";
import { ActionContent, ActionTitles, StyledActionContainer } from "./styles";

const AccountNotConnect = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledActionContainer>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          Start Bonding
        </Text>
      </ActionTitles>
      <ActionContent>{children}</ActionContent>
    </StyledActionContainer>
  );
};

export default AccountNotConnect;
