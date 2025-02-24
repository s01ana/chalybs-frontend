import styled from "styled-components";
import { Flex, LinkExternal, Skeleton, Text } from "components";
import { Vault } from "libraries/vaults";

export interface ExpandableSectionProps {
  vault?: Vault
  scanAddressLink?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`;

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`;

export const DetailsSection: React.FC<React.PropsWithChildren<ExpandableSectionProps>> = ({
  vault,
  scanAddressLink,
}) => {
  // const addLiquidityUrl = vault.lpBond ? `${BASE_ADD_LIQUIDITY_URL}/${vault.token0.address}/${vault.token1.address}` : `/swap?outputCurrency=${vault.bondToken.address}`

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>Total Purchased:</Text>
        {vault?.totalLocked ? <Text>{vault?.totalLocked}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      <StyledLinkExternal href={`/swap?outputCurrency=${vault?.token.address}`}>Get {vault?.name}</StyledLinkExternal>
      {scanAddressLink && (
        <StyledLinkExternal href={scanAddressLink}>
          View Contract
        </StyledLinkExternal>
      )}
    </Wrapper>
  );
};
