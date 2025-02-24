import { Dispatch, SetStateAction } from 'react'
import { ChainId } from 'config/chains'
import { Text, Box, Button, Flex, NextLinkFromReactRouter, LinkExternal, OpenNewIcon, CopyButton, Message, MessageText } from 'components'
import { AppHeader } from 'components/App'
import Divider from 'components/Divider'
import { getBlockExploreLink } from 'utils'
import { TokenFormView, TokenData, FinishData } from '../types'
import FormContainer from './FormContainer'

const accountEllipsis = (address: string | null | undefined) => {
  return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
}

export function FinishForm({
  setModalView,
  tokenData,
  finishData,
  setTokenData,
  setFinishData,
}: {
  setModalView: Dispatch<SetStateAction<TokenFormView>>
  tokenData: TokenData
  finishData: FinishData
  setTokenData: Dispatch<SetStateAction<TokenData>>
  setFinishData: Dispatch<SetStateAction<FinishData>>
}) {
  const handleReturn = async () => {
    setTokenData({
      name: "",
      symbol: "",
      decimals: "",
      totalSupply: "",
      type: "standard",
      liquidityGen: undefined,
    })

    setFinishData({
      address: "" as `0x${string}`,
      hash: "",
      chainId: ChainId.MAINNET
    })

    setModalView(TokenFormView.Create)
  }

  return (
    <Box p="12px" position="inherit">
      <AppHeader title="Token Creator" noConfig />
      <FormContainer>
        <Message variant="success" icon={false} p="8px" my="8px">
          <MessageText color="text">
            Congratulations, You've just created your token!
          </MessageText>
        </Message>
        <Box>
          <Flex width="100%" justifyContent="space-between" px="5px" my="10px">
            <Text color="primary">Name</Text>
            <Text>{tokenData.name}</Text>
          </Flex>
          <Divider />
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Symbol</Text>
            <Text>{tokenData.symbol}</Text>
          </Flex>
          <Divider />
          {tokenData.type === "standard" && <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Decimals</Text>
            <Text>{tokenData.decimals}</Text>
          </Flex>}
          <Divider />
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Address</Text>
            <Flex>
              <LinkExternal href={getBlockExploreLink(finishData.address, 'token', finishData.chainId)}>
                <Text>{accountEllipsis(finishData?.address)}</Text>
              </LinkExternal>
              <CopyButton
                width="16px"
                ml="5px"
                buttonColor="textSubtle"
                text={finishData.address ?? "0x"}
                tooltipMessage='Token address copied'
              />
            </Flex>
          </Flex>
          <Divider />
          <Flex width="100%" justifyContent="space-between" px="5px" mb="10px">
            <Text color="primary">Total Supply</Text>
              <Text>{Number(tokenData.totalSupply).toLocaleString()}</Text>
          </Flex>
          {/* <Divider /> */}
        </Box>
        <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]} my="10px">
          <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
            <Button
              as={NextLinkFromReactRouter}
              to={getBlockExploreLink(finishData.hash, 'transaction', finishData.chainId)}
              target='_blink'
              width="100%"
              variant="secondary"
              height="48px"
              style={{fontSize: "14px"}}
            >
              <Flex alignItems="center" justifyContent="center" width="100%" p="12px">
                <Box>View Transaction</Box>
              </Flex>
              <Flex position="absolute" right="12px" alignItems="center"><OpenNewIcon color="primary" /></Flex>
            </Button>
          </Box>
          <Box width="100%">
            <Button
              width="100%"
              height="48px"
              onClick={handleReturn}
              variant='primary'
              style={{fontSize: "14px"}}
            >Create Other</Button>
          </Box>
        </Flex>
        {/* <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]} mb="10px">
          <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
            <NextLinkFromReactRouter to={`/sales/presale?token=${finishData?.address}`}>
              <Button
                width="100%"
                height="36px"
                variant='primary'
                style={{fontSize: "14px"}}
              >Create Presale</Button>
            </NextLinkFromReactRouter>
          </Box>
          <Box width="100%">
            <NextLinkFromReactRouter to={`/sales/fairlaunch?token=${finishData?.address}`}>
              <Button
                width="100%"
                height="36px"
                variant='primary'
                style={{fontSize: "14px"}}
              ><Text fontSize="14px">Create FairLaunch</Text></Button>
            </NextLinkFromReactRouter>
          </Box>
        </Flex> */}
      </FormContainer>
    </Box>
  )
}
