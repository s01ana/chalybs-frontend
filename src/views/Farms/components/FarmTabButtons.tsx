import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { NextLinkFromReactRouter } from "components/NextLink";
import { NotificationDot } from "components/NotificationDot";
import { ButtonMenu, ButtonMenuItem } from "components/ButtonMenu";
import { Flex } from "components/Box";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean;
  tokenMode?: boolean;
}

export const FarmTabButtons: React.FC<React.PropsWithChildren<FarmTabButtonsProps>> = ({ hasStakeInFinishedFarms, tokenMode }) => {
  const router = useRouter();

  let activeIndex;
  switch (router.pathname) {
    case "/farms":
      activeIndex = 0;
      break;
    case "/pools":
      activeIndex = 0;
      break;
    case "/farms/history":
      activeIndex = 1;
      break;
    case "/pools/history":
      activeIndex = 1;
      break;
    case "/farms/archived":
      activeIndex = 2;
      break;
    case "/pools/archived":
      activeIndex = 2;
      break;
    default:
      activeIndex = 0;
      break;
  }

  return (
    <Wrapper>
      <Flex width="max-content" flexDirection="column">
        <ButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
          <ButtonMenuItem as={NextLinkFromReactRouter} to={tokenMode ? "/pools" : "/farms"}>
            Live
          </ButtonMenuItem>
          <NotificationDot show={hasStakeInFinishedFarms}>
            <ButtonMenuItem as={NextLinkFromReactRouter} to={tokenMode ? "/pools/history" : "/farms/history"} id="finished-farms-button">
              Finished
            </ButtonMenuItem>
          </NotificationDot>
        </ButtonMenu>
      </Flex>
    </Wrapper>
  );
};
