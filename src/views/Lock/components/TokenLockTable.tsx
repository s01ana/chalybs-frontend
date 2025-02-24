import BigNumber from "bignumber.js";
import { Dispatch, Fragment, SetStateAction } from "react";
import { ArrowBackIcon, ArrowForwardIcon, Button, Flex, NextLinkFromReactRouter, Text } from "components";
import styled from "styled-components";
import { CHAIN_QUERY_NAME } from "config/chains";
import { CurrencyLogo } from "components/Logo";
import { useCurrency } from "hooks/Tokens";
import Divider from "components/Divider";

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 0.5em;
  align-items: center;

  padding: 0 12px;

  grid-template-columns: 4fr 3fr 1fr;

  @media screen and (max-width: 670px) {
    grid-template-columns: 4fr 3fr 1fr;
  }
`

const TableWrapper = styled(Flex)`
  width: 100%;
  padding-top: 16px;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card.background};
  border-radius: 8px;
  // border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${({ theme }) => theme.mediaQueries.md} {
    border-radius: 8px;
  }
`

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2em;
  margin-bottom: 1.2em;
`

const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

const DataRow: React.FC<React.PropsWithChildren<{ data: any, type: number }>> = ({ data, type }) => {
  const token = useCurrency(data.address)
  const url = type === 1 || type === 3 ? `/lock/record/${data.id}` : `/lock/token/${data.address}`
  return (
    <>
    <ResponsiveGrid>
      <Flex alignItems="center">
        <CurrencyLogo size="30px" currency={token} />
        <Flex flexDirection="column" ml="10px">
          <Text small>{type !== 2 ? data.name : `${data.token0Name} / ${data.token1Name}`}</Text>
          <Text color="textDisabled" small>{type !== 2 ? data.symbol : `${data.token0Symbol} / ${data.token1Symbol}`}</Text>
        </Flex>
      </Flex>
      <Text small>{new BigNumber(data.amount).div(10 ** (type === 0 || type === 1 ? data.decimals : 18)).toJSON()}</Text>
      <NextLinkFromReactRouter to={`${url}?chain=${CHAIN_QUERY_NAME[data.chainId]}`}>
        <Button
          width="100%"
          variant="text"
        ><Text color="primary" small>View</Text></Button>
      </NextLinkFromReactRouter>
    </ResponsiveGrid>
    <Divider />
    </>
  )
}

const MAX_ITEMS = 10

const TokenLockTable: React.FC<
  React.PropsWithChildren<{
    data: any[]
    length: number
    page: number
    setPage: Dispatch<SetStateAction<number>>
    type: number
  }>
> = ({ data, length, page, setPage, type }) => {
  const maxPage = Number.isNaN(length) ? 1 : Math.floor(length / MAX_ITEMS) + (length % MAX_ITEMS === 0 ? 0 : 1)

  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="primary" fontSize="12px">
          Token
        </Text>
        <Text color="primary" fontSize="12px">
          Amount
        </Text>
        <Text color="primary" fontSize="12px">
          {" "}
        </Text>
      </ResponsiveGrid>

      <Divider />

      {data.map((row) => {
        if (row) {
          return (
            <Fragment key={`${type === 1 || type === 3 ? row.id : row.address}`}>
              <DataRow data={row} type={type} />
            </Fragment>
          )
        }
        return null
      })}
      {(type === 0 || type === 2) && <PageButtons>
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
      </PageButtons>}
    </TableWrapper>
  )
}

export default TokenLockTable