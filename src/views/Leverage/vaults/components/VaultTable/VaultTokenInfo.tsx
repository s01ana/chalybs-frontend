import { ReactNode } from "react"
import styled from "styled-components"
import { Text } from "components"
import { Vault } from 'libraries/vaults'

interface VaultTableFarmTokenInfoProps {
  vault?: Vault
  children?: ReactNode
}

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`;

const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
  }
`;

const VaultTokenInfo: React.FunctionComponent<React.PropsWithChildren<VaultTableFarmTokenInfoProps>> = ({
  vault,
  children
}) => {
  const pairContainer = (
    <Container>
      <TokenWrapper>{children}</TokenWrapper>
      <Text bold textTransform="uppercase" color="secondary" pr="4px">
        {vault?.name}
      </Text>
      <Text bold> Vault</Text>
    </Container>
  );

  return pairContainer
};

export default VaultTokenInfo;
