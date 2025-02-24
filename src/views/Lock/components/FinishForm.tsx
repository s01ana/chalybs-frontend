import { Dispatch, SetStateAction } from 'react'
import { Text, Box, Button, Flex, NextLinkFromReactRouter, Message, MessageText, OpenNewIcon } from 'components'
import { AppHeader } from 'components/App'
import { getBlockExploreLink } from 'utils'
import { LockFormView, FinishData } from '../types'
import FormContainer from './FormContainer'

export function FinishForm({
  setModalView,
  finishData,
  setFinishData,
}: {
  setModalView: Dispatch<SetStateAction<LockFormView>>
  finishData: FinishData
  setFinishData: Dispatch<SetStateAction<FinishData>>
}) {
  const handleReturn = async () => {

    setFinishData({
      id: "",
      token: "",
      hash: "",
      chainId: 148
    })

    setModalView(LockFormView.Create)
  }

  return (
    <Box p="12px" position="inherit">
      <AppHeader title='Lock Token' noConfig />
      <FormContainer>
        <Message variant="success" icon={false} p="8px" my="8px">
          <MessageText color="text">
            Congratulations, You've just locked your token!
          </MessageText>
        </Message>
        <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]}>
          <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
            <Button
              as={NextLinkFromReactRouter}
              to={getBlockExploreLink(finishData.hash, 'transaction', finishData.chainId)}
              target='_blink'
              width="100%"
              height="48px"
              variant="secondary"
            >
              <Flex alignItems="center" justifyContent="center" width="100%" p="12px">
                <Text fontSize="14px">View Transaction</Text>
              </Flex>
              <Flex position="absolute" right="12px" alignItems="center"><OpenNewIcon color="primary" /></Flex>
            </Button>
          </Box>
          <Box width="100%">
            <Button
              width="100%"
              height="48px"
              variant="primary"
              onClick={handleReturn}
            ><Text fontSize="14px" color="background">Create Other</Text></Button>
          </Box>
        </Flex>
        <Flex width="100%" alignItems="center" flexDirection={["column", "column", "row"]} mt="10px">
          <Box mr={["0", "0", "15px"]} mb={["10px", "10px", "0"]} width="100%">
            <NextLinkFromReactRouter to={`/lock/token/${finishData.token}`}>
              <Button
                width="100%"
                height="48px"
                variant="primary"
              ><Text fontSize="14px" color="background">View Token</Text></Button>
            </NextLinkFromReactRouter>
          </Box>
          <Box width="100%">
            <NextLinkFromReactRouter to={`/lock/record/${finishData.id}`}>
              <Button
                width="100%"
                height="48px"
                variant="primary"
              ><Text fontSize="14px" color="background">View Lock</Text></Button>
            </NextLinkFromReactRouter>
          </Box>
        </Flex>
      </FormContainer>
    </Box>
  )
}
