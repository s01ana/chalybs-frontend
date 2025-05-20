import BigNumber from "bignumber.js";
import { Dispatch, Fragment, SetStateAction } from "react";
import { ArrowBackIcon, ArrowForwardIcon, Button, Flex, NextLinkFromReactRouter, Text, LinkExternal, TokenLogo, Box } from "components";
import { ChainLogo } from 'components/Logo/ChainLogo'
import styled from "styled-components";
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getBlockExploreLink } from 'utils'
import Divider from "components/Divider";
import { CurrencyLogo } from "components/Logo";
import { useCurrency, useCurrencyBridge } from "hooks/Tokens";
import useBridgePool from "hooks/useBridgePool";

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 0.5em;
  align-items: center;

  padding: 0 24px;

  grid-template-columns: 4fr 4fr 3fr 4fr 4fr 1.5fr;

  @media screen and (max-width: 670px) {
    grid-template-columns: 3fr 1fr 1fr;
    & > *:nth-child(3) {
      display: none;
    }
  }
`

const TableWrapper = styled(Flex)`
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card.background};
  border-radius: 8px;
`

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5em;
  margin-bottom: 0.8em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

const StyledChainLogo = styled(Box)`
  position: absolute;
  background-color: ${({theme}) => theme.colors.invertedContrast}
  // padding: 8px;
  border-radius: 8px;
  top: 20px;
  right: -8px;
`

const accountEllipsis = (address: string) => {
  return address ? `${address.substring(0, 8)}...${address.substring(address.length - 6)}` : null
}

const timeAgo = (timestamp: number) => {
  const seconds = Math.floor(Date.now() / 1000 - timestamp);
  const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 }
  ];

  for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
          return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
  }

  return "just now";
}

const DataRow: React.FC<React.PropsWithChildren<{ data: any}>> = ({ data }) => {
  const { poolInfo: sourcePool } = useBridgePool(data.sourcechain, data.pool)
  const { poolInfo: targetPool } = useBridgePool(data.targetchain, data.pool)
  return (
    <>
    <ResponsiveGrid>
      <Text fontSize="13px">{timeAgo(data.timestamp)}</Text>
      <Flex alignItems="center" style={{ gap: '12px' }}>
        <Flex position="relative">
          <StyledLogo size="32px" srcs={[`/images/${data.sourcechain}/tokens/${sourcePool?.[0]}.png`]} alt='usdt' />
          <StyledChainLogo>
            <ChainLogo chainId={data.sourcechain} width={16} height={16} />
          </StyledChainLogo>
        </Flex>
        →
        <Flex position="relative">
          <StyledLogo size="32px" srcs={[`/images/${data.targetchain}/tokens/${targetPool?.[0]}.png`]} alt='usdt' />
          <StyledChainLogo>
            <ChainLogo chainId={data.targetchain} width={16} height={16} />
          </StyledChainLogo>
        </Flex>
      </Flex>
      <Text fontSize="13px">{Number(new BigNumber(data.amount).div(10 ** 18).toFixed(4))}</Text>
      <LinkExternal href={getBlockExploreLink(data.sourcehash, 'transaction', data.sourcechain)}>
        <Text fontSize="13px">{accountEllipsis(data.sourcehash)}</Text>
      </LinkExternal>
      {data.targethash ? <LinkExternal href={getBlockExploreLink(data.targethash, 'transaction', data.targetchain)}>
        <Text fontSize="13px">{accountEllipsis(data.targethash)}</Text>
      </LinkExternal> : <Text fontSize="13px">-</Text>}
      <Text fontSize="13px">{data.targethash ? "Done" : "Pending"}</Text>
    </ResponsiveGrid>
    <Divider />
    </>
  )
}

const MAX_ITEMS = 10

const TransactionTable: React.FC<
  React.PropsWithChildren<{
    data: any[]
    length: number
    page: number
    setPage: Dispatch<SetStateAction<number>>
  }>
> = ({ data, length, page, setPage }) => {
  const maxPage = Number.isNaN(length) ? 1 : Math.floor(length / MAX_ITEMS) + (length % MAX_ITEMS === 0 ? 0 : 1)

  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="primary" fontSize="12px">
          Time
        </Text>
        <Text color="primary" fontSize="12px">
          Tokens
        </Text>
        <Text color="primary" fontSize="12px">
          Amount
        </Text>
        <Text color="primary" fontSize="12px">
          Source-chain Hash
        </Text>
        <Text color="primary" fontSize="12px">
          Target-chain Hash
        </Text>
        <Text color="primary" fontSize="12px">
          Status
        </Text>
      </ResponsiveGrid>

      <Divider />

      {data.map((row) => {
        if (row) {
          return (
            <Fragment key={row.id}>
              <DataRow data={row} />
            </Fragment>
          )
        }
        return null
      })}
      <PageButtons>
        <Arrow
          onClick={() => {
            setPage(page === 1 ? page : page - 1)
          }}
        >
          <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
        </Arrow>
        <Text>Page {page} of {maxPage}</Text>
        <Arrow
          onClick={() => {
            setPage(page === maxPage ? page : page + 1)
          }}
        >
          <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
        </Arrow>
      </PageButtons>
    </TableWrapper>
  )
}

export default TransactionTable