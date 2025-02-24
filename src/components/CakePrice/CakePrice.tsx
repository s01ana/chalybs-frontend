import React from "react";
import styled from "styled-components";
import { GTOKEN } from "libraries/tokens";
// import { useAccount, useWalletClient } from "wagmi";
// import { Button } from "components/Button";
// import { useMatchBreakpoints } from "contexts";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
  showSkeleton?: boolean;
  chainId: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<React.PropsWithChildren<Props>> = ({
  cakePriceUsd,
  color = "textSubtle",
  showSkeleton = true,
  chainId,
}) => {
  return cakePriceUsd ? (
    <PriceLink
      href={`/swap?outputCurrency=${GTOKEN[chainId].address}`}
      target="_blank"
    >
      <img src="/images/def.png" width="24px" alt="def" />
      <Text ml="6px" color={color}>{`$${cakePriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
  // const { isMobile } = useMatchBreakpoints();
  // const { connector, isConnected } = useAccount()
  // const { data: walletClient } = useWalletClient()
  // if (!walletClient) return null
  // if (connector && connector.name === 'Binance') return null
  // if (!(connector && isConnected)) return null

  // return cakePriceUsd ? (
  //   <Button
  //     variant="text"
  //     height="48px"
  //     onClick={() => {
  //       walletClient.watchAsset({
  //         // TODO: Add more types
  //         type: 'ERC20',
  //         options: {
  //           address: "0xA334D2f1b65Acc69c0A076D9c0207f24ADC86923",
  //           symbol: 'BITX',
  //           image: 'https://bitx.finance/images/bitx.png',
  //           decimals: 18,
  //         },
  //       })
  //     }}
  //   >
  //     <img src="/images/bitx.png" width="24px" alt="bitx" />
  //     {!isMobile && <Text ml="6px" color={color}>{`$${cakePriceUsd.toFixed(3)}`}</Text>}
  //   </Button>
  // ) : showSkeleton ? (
  //   <Skeleton width={80} height={24} />
  // ) : null;
};

export default React.memo(CakePrice);
