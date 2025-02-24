import styled from "styled-components";
import { Box } from "components/Box";
import { StyledMenuItemProps } from "./types";

export const StyledActiveItem = styled(Box)`
  position: absolute;
  display: inline-block;
  top: 5px;
  right: 0px;
  color: #fff;
  border-radius: 50%;
  background: #4CAF50;
  padding: 5px;
  width: 10px;
  height: 10px;
  text-align: center;
  // position: relative;
  margin: 0 10px;
  &:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-50%) translateY(-50%);
    border-radius: 50%;
    padding: 0.05em;
    animation: activeCall 2s ease-in-out infinite both;
  }
  @keyframes activeCall {
    20% {
      padding: 0.5em;
    }
    25% {
      padding: 0.25em;
    }
    35% {
      padding: 0.75em;
    }
    50% {
      padding: 0.5em;
    }
    60% {
      padding: 0.75em;
    }
    80% {
      padding: 0.35em;
    }
    100% {
      padding: 0.35em;
    }
  }
`

export const StyledMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;

  ${({ $isActive, $variant }) =>
    $isActive &&
    $variant === "subMenu" &&
    `
      &:after{
        content: "";
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
        border-radius: 2px 2px 0 0;
      }
    `};
`;

const StyledMenuItem = styled.div<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;

  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.secondary : theme.colors.textSubtle)};
  font-size: 16px;
  // font-weight: ${({ $isActive }) => ($isActive ? "600" : "400")};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "inherit")};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "subMenu"
      ? `
    padding: 0 56px;
    height: 48px;
  `
      : `
    height: 42px;
  `}

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    ${({ $variant }) => $variant === "default" && "border-radius: 16px;"};
  }
`;

export const StyledTopMenuItemContainer = styled.div<StyledMenuItemProps>`
  position: relative;
`;

export const StyledTopMenuItem = styled.a<StyledMenuItemProps>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.primary : theme.colors.text)};
  font-size: 16px;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
  pointer-events: ${({ $isDisabled }) => ($isDisabled ? "none" : "inherit")};

  ${({ $statusColor, theme }) =>
    $statusColor &&
    `
    &:after {
      content: "";
      border-radius: 100%;
      background: ${theme.colors[$statusColor]};
      height: 8px;
      width: 8px;
      margin-left: 12px;
    }
  `}

  ${({ $variant }) =>
    $variant === "default"
      ? `
    padding: 0 16px;
    height: 48px;
  `
      : `
    padding: 4px 4px 0px 4px;
    height: 42px;
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    ${({ $variant }) => $variant === "default" && "border-radius: 8px;"};
  }
`;

export default StyledMenuItem;
