import { useState, useMemo, useEffect} from 'react'
import { useAccount } from 'wagmi'
import {
  Text,
  SearchInput,
  Select,
  Box,
  OptionProps,
  Flex,
  Button,
  NextLinkFromReactRouter,
  Card,
  ButtonMenu,
  ButtonMenuItem,
} from 'components'
import { safeGetAddress } from 'utils'
import styled from 'styled-components'
import { WNATIVE } from 'libraries/swap-sdk'
import Page from 'components/Layout/Page'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useLPLocks, useTokenLocks, useTokenLockedCount, useTokenInfo, useLPLockedCount, useTokenLockedCountForUser, useLPLockedCountForUser, useTokenLocksForUser, useLPLocksForUser } from './hooks/useLocks'
import TokenLockTable from './components/TokenLockTable'

export const StyledAppBody = styled(Card)`
  margin: auto;  
  border-radius: 8px;
  max-width: 690px;
  width: 100%;
  padding: 16px 20px 28px 20px;
  z-index: 1;
`

const MAX_ITEMS = 10

const Locks: React.FC<React.PropsWithChildren> = () => {
  const { address: account } = useAccount()
  const lengthForTokenLock = useTokenLockedCount()
  const lengthForLPLock = useLPLockedCount()
  const lengthForTokenLockForUser = useTokenLockedCountForUser(account)
  const lengthForLPLockForUser = useLPLockedCountForUser(account)

  const [filterOption, setFilterOption] = useState('normal')
  const [typeOption, setTypeOption] = useState(false)

  const { chainId } = useActiveChainId()

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(1)

  const _tokenData = useTokenLocks(BigInt(start), BigInt(end), chainId)
  const _lpData = useLPLocks(BigInt(start), BigInt(end), chainId)
  const _tokenDataForUser = useTokenLocksForUser(account, chainId)
  const _lpDataForUser = useLPLocksForUser(account, chainId)

  const tokenData = useMemo(() => _tokenData.reverse(), [_tokenData])
  const lpData = useMemo(() => _lpData.reverse(), [_lpData])
  const tokenDataForUser = useMemo(() => _tokenDataForUser.reverse(), [_tokenDataForUser])
  const lpDataForUser = useMemo(() => _lpDataForUser.reverse(), [_lpDataForUser])

  const [query, setQuery] = useState('')
  const tokenInfo = useTokenInfo(safeGetAddress(query as `0x${string}`)? query as `0x${string}` : WNATIVE[chainId].address, chainId)

  const [page, setPage] = useState(1)

  const [type, setType] = useState(0)

  const length = type === 0 ? lengthForTokenLock : (type === 1 ? lengthForTokenLockForUser : (type === 2 ? lengthForLPLock : lengthForLPLockForUser))

  const activeData = query? (tokenInfo && safeGetAddress(query) ? [tokenInfo] : []) : 
    type === 0 ? tokenData : (type === 1 ? tokenDataForUser : (type === 2 ? lpData : lpDataForUser))

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    setStart(Number(length) > MAX_ITEMS * page ? Number(length) - MAX_ITEMS * page : 0)
    setEnd(Number(length) > MAX_ITEMS * (page - 1) + 1 ? Number(length) - MAX_ITEMS * (page - 1) - 1 : 0)
  }, [page, length])

  const handleFilterOptionChange = (option: OptionProps): void => {
    setFilterOption(option.value)
  }

  const handleSelectTypeChange = (option: boolean): void => {
    setTypeOption(option)
  }

  useEffect(() => {
    if (filterOption === "normal") {
      if (!typeOption) {
        setType(0)
      }
      if (typeOption) {
        setType(1)
      }
    }
    if (filterOption === "lp") {
      if (!typeOption) {
        setType(2)
      }
      if (typeOption) {
        setType(3)
      }
    }
  }, [filterOption, typeOption])

  return (
    <Page>
      <StyledAppBody>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="text">
            Token Lock
          </Text>
          <Button
            as={NextLinkFromReactRouter}
            to="/lock/create"
            variant='primary'
            width="150px"
            height="36px"
          >
            Create Lock
          </Button>
        </Flex>
        <Flex justifyContent="space-between" flexDirection={["column", "column", "column", "row"]} my="12px">
          <Flex>
            <Box mr="10px">
              <Text textTransform="uppercase" color="textDisabled" fontSize="12px">
                Token Type
              </Text>
              <Select
                options={[
                  {
                    label: 'Normal',
                    value: 'normal',
                  },
                  {
                    label: 'LP',
                    value: 'lp',
                  },
                ]}
                onOptionChange={handleFilterOptionChange}
              />
            </Box>
            <Flex width="max-content" flexDirection="column" mt="18px">
              <ButtonMenu activeIndex={typeOption ? 1 : 0} scale="sm" variant="primary" onItemClick={() => handleSelectTypeChange(!typeOption)}>
                <ButtonMenuItem>
                  All
                </ButtonMenuItem>
                <ButtonMenuItem>
                  My
                </ButtonMenuItem>
              </ButtonMenu>
            </Flex>
          </Flex>
          <Flex width={["100%", "100%", "100%", "50%"]}>
            <Box mt={["4px", "4px", "4px", "16px"]} width="100%">
              <SearchInput onChange={handleChangeQuery} placeholder="Search by token address..." />
            </Box>
          </Flex>
        </Flex>
        {activeData && <TokenLockTable
          data={activeData}
          length={Number(length)}
          page={page}
          setPage={setPage}
          type={type}
        />}
      </StyledAppBody>
    </Page>
  )
}

export default Locks