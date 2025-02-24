import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Text, Box, Message, Flex, MessageText } from 'components'
import { useAccount } from 'wagmi'
import addresses from 'config/constants/contracts'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useToken } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { getLaunchpadFactoryAddress } from 'utils/addressHelpers'
import ProgressSteps from '../../components/ProgressSteps'
import { useAccountInfo } from '../../hooks/useAccountInfo'
import { FairLaunch, FinishData, LaunchpadFormView, Socials, TokenData } from '../../types'
import { FormContainer } from '../../components/FormContainer'
import SendCommitButton from './SendCommitButton'

export function ReviewForm({
  setModalView,
  tokenData,
  deFiData,
  socials,
  setPresale
}: {
  setModalView: Dispatch<SetStateAction<LaunchpadFormView>>
  tokenData: TokenData
  deFiData: FairLaunch
  socials: Socials
  setPresale: Dispatch<SetStateAction<FinishData>>
}) {
  const {chainId} = useActiveChainId()
  const { address: account } = useAccount()

  const {
    parsedAmount,
    inputError
  } = useAccountInfo(deFiData.totalAmount, useToken(tokenData.tokenAddress))

  const {approvalState: approval, approveCallback} = useApproveCallback(parsedAmount, getLaunchpadFactoryAddress(chainId))

  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  return (
    <Box position="inherit">
      <FormContainer>
        <Box mt="20px">
          <ProgressSteps steps={[true, true, true]} />
        </Box>
        <Box>
          <Text fontSize="18px" color="primary">4. Finish</Text>
          <Text fontSize="14px">Review your information</Text>
        </Box>
        <Box>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Total token</Text>
            <Text>{deFiData.totalAmount} {tokenData.tokenSymbol}</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Token Name</Text>
            <Text>{tokenData.tokenName}</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Token Symbol</Text>
            <Text>{tokenData.tokenSymbol}</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Token Decimals</Text>
            <Text>{tokenData.tokenDecimals}</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Total Selling Amount</Text>
            <Text>{deFiData.total} {tokenData.tokenSymbol}</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Sale Method</Text>
            <Text>{deFiData.whitelist ? "Whitelist Only" : "Public"}</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Soft Cap</Text>
            <Text>{deFiData.softCap} {tokenData.currency.symbol}</Text>
          </Flex>
          {deFiData.isMax && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Maximum Buy</Text>
            <Text>{deFiData.maximumBuy} {tokenData.currency.symbol}</Text>
          </Flex>}
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Liquidity</Text>
            <Text>{deFiData.liquidity} %</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Start Time</Text>
            <Text>{deFiData.startTime} (UTC)</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">End Time</Text>
            <Text>{deFiData.endTime} (UTC)</Text>
          </Flex>
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Liquidity Lockup Time</Text>
            <Text>{deFiData.lockTime} days</Text>
          </Flex>
          {socials.whitelist !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Whitelist Approbation Link</Text>
            <Text>{socials.whitelist}</Text>
          </Flex>}
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Website</Text>
            <Text>{socials.website}</Text>
          </Flex>
          {socials.facebook !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Facebook</Text>
            <Text>{socials.facebook}</Text>
          </Flex>}
          {socials.twitter !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Twitter</Text>
            <Text>{socials.twitter}</Text>
          </Flex>}
          {socials.github !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Github</Text>
            <Text>{socials.github}</Text>
          </Flex>}
          {socials.telegram !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Telegram</Text>
            <Text>{socials.telegram}</Text>
          </Flex>}
          {socials.instagram !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Instagram</Text>
            <Text>{socials.instagram}</Text>
          </Flex>}
          {socials.discord !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Discord</Text>
            <Text>{socials.discord}</Text>
          </Flex>}
          {socials.reddit !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Reddit</Text>
            <Text>{socials.reddit}</Text>
          </Flex>}
          {socials.description !== "" && <><Flex width="100%" justifyContent="space-between" px="5px" mb="5px">
            <Box mr="60px"><Text color="primary">Description</Text></Box>
            <Text textAlign="right">{socials.description}</Text>
          </Flex></>}
          {socials.youtube !== "" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Youtube Video</Text>
            <Text>{socials.youtube}</Text>
          </Flex>}
        </Box>
        <Message variant="warning" icon={false} p="8px 12px">
          <MessageText color="text">
          <span>Please exclude address {addresses.launchpadFactory[chainId]} from fees, rewards, max tx amount to start creating pools.</span>
          </MessageText>
        </Message>
        <Message variant="warning" icon={false} p="8px 12px">
          <MessageText color="text">
            <span>For tokens with burns, rebase or other special transfers please ensure that you have a way to whitelist multiple addresses or turn off the special transfer events (By setting fees to 0 for example for the duration of the presale)</span>
          </MessageText>
        </Message>
        {!account ? <ConnectWalletButton /> : <SendCommitButton
          tokenData={tokenData}
          deFiData={deFiData}
          socials={socials}
          account={account}
          approval={approval}
          approveCallback={approveCallback}
          approvalSubmitted={approvalSubmitted}
          setApprovalSubmitted={setApprovalSubmitted}
          swapInputError={inputError}
          setPresale={setPresale}
          setModalView={setModalView}
        />}
      </FormContainer>
    </Box>
  )
}
