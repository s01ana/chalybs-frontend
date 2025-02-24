import BigNumber from "bignumber.js";
import { Dispatch, Fragment, SetStateAction } from "react";
import { ArrowBackIcon, ArrowForwardIcon, Button, Flex, NextLinkFromReactRouter, Text, LinkExternal } from "components";
import styled from "styled-components";
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getBlockExploreLink } from 'utils'
import Divider from "components/Divider";

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 0.5em;
  align-items: center;

  padding: 0 24px;

  grid-template-columns: 3fr 2fr 3fr 1fr;

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

const accountEllipsis = (address: string) => {
  return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
}

const DataRow: React.FC<React.PropsWithChildren<{ data: any}>> = ({ data }) => {
  const {chainId} = useActiveChainId()
  const url = `/lock/record/${data.id}`
  return (
    <>
    <ResponsiveGrid>
      <LinkExternal href={getBlockExploreLink(data.owner, 'address', chainId)}>
        <Text fontSize="14px">{accountEllipsis(data.owner)}</Text>
      </LinkExternal>
      <Text fontSize="14px">{new BigNumber(data.amount).div(10 ** data.decimals).toJSON()}</Text>
      <Text fontSize="14px">{new Date(data.tgeDate * 1000).toLocaleString()}</Text>
      <NextLinkFromReactRouter to={`${url}`}>
        <Button
          width="100%"
          variant="text"
        ><Text fontSize="14px" color="primary">View</Text></Button>
      </NextLinkFromReactRouter>
    </ResponsiveGrid>
    <Divider />
    </>
  )
}

const MAX_ITEMS = 10

const LockRecords: React.FC<
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
          Wallet
        </Text>
        <Text color="primary" fontSize="12px">
          Amount
        </Text>
        <Text color="primary" fontSize="12px">
          Unlock time(UTC)
        </Text>
        <Text color="primary" fontSize="12px" />
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

export default LockRecords