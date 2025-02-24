import BigNumber from 'bignumber.js'
import { Text, Box, Card, LinkExternal, Flex, Button, EditIcon } from 'components'
import { useModal } from 'widgets/Modal'
import getTimePeriods from 'utils/getTimePeriods'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { getBlockExploreLink } from 'utils'
import Page from 'components/Layout/Page'
import { AppHeader } from 'components/App'
import FormContainer from './components/FormContainer'
import TransferModal from './components/TransferModal'
import RenounceModal from './components/RenounceModal'
import UnlockModal from './components/UnlockModal'
import EditModal from './components/EditModal'
import EditDescriptionModal from './components/EditDescriptionModal'
import useCountdown from '../../hooks/useCountdown'
import { useLockById } from './hooks/useLocks'

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

const accountEllipsis = (address: string) => {
  return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
}

const StyledBox = styled(Box)`
  background: ${({theme}) => theme.colors.backgroundAlt2};
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-radius: 4px;
  padding: 4px;
`

const padTime = (num: number) => num.toString().padStart(2, '0')

const formatRoundTime = (secondsBetweenBlocks: number) => {
  const { days, hours, minutes, seconds } = getTimePeriods(secondsBetweenBlocks)
  const minutesSeconds = `${padTime(days)}:${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`

  return minutesSeconds
}

const LockById = ({id} : {id: string}) => {
  const {chainId} = useActiveChainId()
  const { address: account } = useAccount()
  const lockInfo = useLockById(BigInt(id ?? 0), chainId)

  const type = lockInfo?.factory === undefined ? TOKEN_TYPE.NORMAL : TOKEN_TYPE.LP

  const { secondsRemaining } = useCountdown(Number(lockInfo.tgeDate))
  
  const countdown = formatRoundTime(secondsRemaining).split(":")

  const [onPresentTransferModal] = useModal(
    <TransferModal
      id={id}
    />,
    true,
    true,
    `lock-transfer-modal-${id}`,
  )

  const [onPresentDescriptionModal] = useModal(
    <EditDescriptionModal
      id={id}
    />,
    true,
    true,
    `lock-description-modal-${id}`,
  )

  const [onPresentRenounceModal] = useModal(
    <RenounceModal
      id={id}
    />,
    true,
    true,
    `lock-renounce-modal-${id}`,
  )

  const [onPresentUnlockModal] = useModal(
    <UnlockModal
      id={id}
    />,
    true,
    true,
    `lock-unlock-modal-${id}`,
  )

  const [onPresentEditModal] = useModal(
    <EditModal
      id={id}
      account={account}
      token={lockInfo.address}
      oldAmount={new BigNumber(lockInfo.amount).div(10 ** lockInfo.decimals).toJSON()}
      oldDate={lockInfo.tgeDate*1000}
    />,
    true,
    true,
    `lock-edit-modal-${id}`,
  )

  return (
    <Page>
      <StyledAppBody mb="16px">
        <Box pt="12px" pb="20px">
          <Flex width="100%" justifyContent="center" mb="12px">
            <Text color="primary" fontSize="18px">Unlock in</Text>
          </Flex>
          <Flex width="100%" justifyContent="center">
            <StyledBox><Text fontSize="18px">{countdown[0]}</Text></StyledBox>
            <StyledBox ml="5px"><Text fontSize="18px">{countdown[1]}</Text></StyledBox>
            <StyledBox ml="5px"><Text fontSize="18px">{countdown[2]}</Text></StyledBox>
            <StyledBox ml="5px"><Text fontSize="18px">{countdown[3]}</Text></StyledBox>
          </Flex>
        </Box>
      </StyledAppBody>
      <StyledAppBody mb="16px">
        <Box p="12px" position="inherit">
          <AppHeader title={type === TOKEN_TYPE.NORMAL ? 'Token Info' : 'Pair Info'} noConfig />
          <FormContainer>
            <Box mt="12px">
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" small>{type === TOKEN_TYPE.NORMAL ? "Token Address" : "Pair Address"}</Text>
                <LinkExternal href={getBlockExploreLink(lockInfo.address, 'address', chainId)}>
                  <Text small>{accountEllipsis(lockInfo.address)}</Text>
                </LinkExternal>
              </Flex>
              {type === TOKEN_TYPE.NORMAL && <>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" small>Token Name</Text>
                    <Text small>{lockInfo.name}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" small>Token Symbol</Text>
                    <Text small>{lockInfo.symbol}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" small>Token Decimals</Text>
                    <Text small>{lockInfo.decimals}</Text>
                </Flex>
              </>}
              {type === TOKEN_TYPE.LP && <>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" small>Pair Name</Text>
                    <Text small>{lockInfo.token0Symbol}/{lockInfo.token1Symbol}</Text>
                </Flex>
                <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                    <Text color="primary" small>Factory Address</Text>
                    <LinkExternal href={getBlockExploreLink(lockInfo.factory, 'address', chainId)}>
                      <Text color="primary" small>{accountEllipsis(lockInfo.factory)}</Text>
                    </LinkExternal>
                </Flex>
              </>}
            </Box>
          </FormContainer>
        </Box>
      </StyledAppBody>
      <StyledAppBody mb="16px">
        <Box p="12px" position="inherit">
          <AppHeader title='Lock Info' noConfig />
          <FormContainer>
            <Box mt="12px">
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" small>Title</Text>
                <Button variant="text" height="24px" p="0" onClick={onPresentDescriptionModal}>
                  <Flex>
                    <Box mr="10px"><Text small>{lockInfo.description}</Text></Box>
                    <EditIcon color="text" width="16px" />
                  </Flex>
                </Button>
              </Flex>
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" small>Amount Locked</Text>
                <Text small>{new BigNumber(lockInfo.amount).div(10 ** lockInfo.decimals).toJSON()}</Text>
              </Flex>
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" small>Owner</Text>
                <LinkExternal href={getBlockExploreLink(lockInfo.owner, 'address', chainId)}>
                  <Text small>{accountEllipsis(lockInfo.owner)}</Text>
                </LinkExternal>
              </Flex>
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" small>Lock Date</Text>
                <Text small>{new Date(Number(lockInfo.lockDate) * 1000).toLocaleString()} UTC</Text>
              </Flex>
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" small>Unlock Date</Text>
                <Text small>{new Date(Number(lockInfo.tgeDate) * 1000).toLocaleString()} UTC</Text>
              </Flex>
              <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
                <Text color="primary" small>Unlocked Amount</Text>
                <Text small>{new BigNumber(lockInfo.unlockedAmount).div(10 ** lockInfo.decimals).toJSON()}</Text>
              </Flex>
            </Box>
          </FormContainer>
          {lockInfo.owner === account && <FormContainer>
            <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]} mb="12px">
              <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
                <Button
                  width="100%"
                  height="48px"
                  variant='primary'
                  onClick={onPresentTransferModal}
                ><Text color="background" small>Transfer Lock Ownership</Text></Button>
              </Box>
              <Box width="100%">
                <Button
                  width="100%"
                  height="48px"
                  variant='primary'
                  onClick={onPresentRenounceModal}
                ><Text color="background" small>Renounce Lock Ownership</Text></Button>
              </Box>
            </Flex>
            <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]}>
              <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
                <Button
                  width="100%"
                  height="48px"
                  variant='primary'
                  onClick={onPresentEditModal}
                ><Text color="background" small>Update</Text></Button>
              </Box>
              <Box width="100%">
                <Button
                  width="100%"
                  height="48px"
                  variant='primary'
                  disabled={Number(lockInfo.tgeDate) * 1000 >= Date.now() }
                  onClick={onPresentUnlockModal}
                ><Text color="background" small>Unlock</Text></Button>
              </Box>
            </Flex>
          </FormContainer>}
        </Box>
      </StyledAppBody>
    </Page>
  )
}

export default LockById
