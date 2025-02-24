import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Text, Box, Card, LinkExternal, Flex } from 'components'
import Page from 'components/Layout/Page'
import { AppHeader } from 'components/App'
import { zeroAddress, Address } from 'viem'
import { getBlockExploreLink } from 'utils'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useLockedCountForToken, useLocksForToken, useTokenInfo } from './hooks/useLocks'
import FormContainer from './components/FormContainer'
import LockRecords from './components/LockRecords'

enum TOKEN_TYPE {
  NORMAL,
  LP
}

export const StyledAppBody = styled(Card)`
  margin: auto;
  margin-top: 10px;
  padding: 4px 8px 16px 8px;
  border-radius: 8px;
  max-width: 690px;
  width: 100%;
  z-index: 1;
`

const accountEllipsis = (address: Address) => {
  return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
}

const MAX_ITEMS = 10

const LockByToken = ({token} : {token: Address}) => {
  const {chainId} = useActiveChainId()
  const length = useLockedCountForToken(token ?? zeroAddress)
  const tokenInfo = useTokenInfo(token ?? zeroAddress, chainId)

  const type = tokenInfo?.factory === zeroAddress ? TOKEN_TYPE.NORMAL : TOKEN_TYPE.LP

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(1)

  const [page, setPage] = useState(1)

  const _lockData = useLocksForToken(token ?? zeroAddress, BigInt(start), BigInt(end), chainId)

  const lockData = useMemo(() => _lockData.reverse(), [_lockData])

  useEffect(() => {
    setStart(Number(length) > MAX_ITEMS * page ? Number(length) - MAX_ITEMS * page : 0)
    setEnd(Number(length) > MAX_ITEMS * (page - 1) + 1 ? Number(length) - MAX_ITEMS * (page - 1) - 1 : 0)
  }, [page, length])

  return (
    <Page>
      <StyledAppBody mb="16px">
        <Box p="12px" position="inherit">
          <AppHeader title='Lock Info' noConfig />
          <FormContainer>
            <Box mt="12px">
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" fontSize="14px">{type === TOKEN_TYPE.NORMAL ? "Token Address" : "Liquidity Address"}</Text>
                <LinkExternal href={getBlockExploreLink(tokenInfo.address, 'address', chainId)}>
                  <Text fontSize="14px">{accountEllipsis(tokenInfo.address)}</Text>
                </LinkExternal>
              </Flex>
              {type === TOKEN_TYPE.NORMAL && <>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" fontSize="14px">Token Name</Text>
                    <Text fontSize="14px">{tokenInfo.name}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" fontSize="14px">Token Symbol</Text>
                    <Text fontSize="14px">{tokenInfo.symbol}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" fontSize="14px">Token Decimals</Text>
                    <Text fontSize="14px">{tokenInfo.decimals}</Text>
                </Flex>
              </>}
              {type === TOKEN_TYPE.LP && <>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" fontSize="14px">Pair Name</Text>
                    <Text fontSize="14px">{tokenInfo.token0Symbol}/{tokenInfo.token1Symbol}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" fontSize="14px">Factory Address</Text>
                    <LinkExternal href={getBlockExploreLink(tokenInfo.factory, 'address', chainId)}>
                      <Text color="primary" fontSize="14px">{accountEllipsis(tokenInfo.factory)}</Text>
                    </LinkExternal>
                </Flex>
              </>}
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" fontSize="14px">Current Locked Amount</Text>
                <Text fontSize="14px">{new BigNumber(tokenInfo.amount).div(10 ** tokenInfo.decimals).toJSON()}</Text>
              </Flex>
            </Box>
          </FormContainer>
        </Box>
      </StyledAppBody>
      <StyledAppBody mb="24px">
        <Box p="12px" position="inherit">
          <AppHeader title='Lock Records' noConfig />
            {lockData && <LockRecords
              data={lockData}
              length={Number(length)}
              page={page}
              setPage={setPage}
            />}
        </Box>
      </StyledAppBody>
    </Page>
  )
}

export default LockByToken
