import { useState } from "react";
import { Button } from "components/Button";
import { Text } from "components/Text";
import { Box, Flex } from "components/Box";
import { Checkbox } from "components/Checkbox";
import { Modal, ModalV2 } from "widgets/Modal";
import { useDisclaimer } from "utils/user/disclaimer";
import styled from "styled-components";

const StyledTextArea = styled(Box)`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 500px;
  background: ${({ theme }) => theme.colors.dropdown};
  padding: 12px;
  margin: -8px;
  border-radius: 20px;
`

const DisclaimerModal = () => {
  const [disclaimer, hideDisclaimer] = useDisclaimer()
  const [check, setCheck] = useState(false)

  if (!disclaimer) return null

  return (
    <ModalV2 isOpen closeOnOverlayClick={false}>
      <Modal
        title="Disclaimer"
        headerBackground="gradientCardHeader"
        width={["100%", "100%", "100%", "436px"]}
        hideCloseButton
      >
        <StyledTextArea>
          <Box>
          <Text lineHeight="1.1" mb="12px">
            This website-hosted user interface (this "Interface") is an open source frontend software portal to the Dexfinity protocol, a decentralized and community-driven collection of blockchain-enabled smart contracts and tools (the "Dexfinity Protocol"). This Interface and the Dexfinity Protocol are made available by the Dexfinity Foundation, however all transactions conducted on the protocol are run by related permissionless smart contracts. As the Interface is open-sourced and the Dexfinity Protocol and its related smart contracts are accessible by any user, entity or third party, there are a number of third party web and mobile user-interfaces that allow for interaction with the Dexfinity Protocol.
          </Text>
          <Text lineHeight="1.1" mb="12px">
            THIS INTERFACE AND THE Dexfinity PROTOCOL ARE PROVIDED "AS IS", AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND. The Dexfinity Foundation does not provide, own, or control the Dexfinity Protocol or any transactions conducted on the protocol or via related smart contracts. By using or accessing this Interface or the Dexfinity Protocol and related smart contracts, you agree that no developer or entity involved in creating, deploying or maintaining this Interface or the Dexfinity Protocol will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of, this Interface or the Dexfinity Protocol, including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, digital assets, tokens, or anything else of value.
          </Text>
          <Text lineHeight="1.1">
            By using or accessing this Interface, the Dexfinity Protocol, or related smart contracts, you represent that you are not located in, incorporated or established in, or a citizen or resident of the Prohibited Jurisdictions. You also represent that you are not subject to sanctions or otherwise designated on any list of prohibited or restricted parties or excluded or denied persons, including but not limited to the lists maintained by the United States' Department of Treasury's Office of Foreign Assets Control, the United Nations Security Council, European Union, or any other government authority.
          </Text>
          </Box>
        </StyledTextArea>
        <Flex 
          alignItems="center" 
          mt="20px"
          onClick={() => setCheck(!check)}
        >
          <Checkbox
            scale="sm"
            checked={check}
            value="auto"
            readOnly
          />
          <Text ml="8px">Agree to terms</Text>
        </Flex>
        <Button
          mt="12px"
          variant="primary"
          disabled={!check}
          height="48px"
          onClick={hideDisclaimer}
        >
          Enter Dexfinity
        </Button>
      </Modal>
    </ModalV2>
  );
};

export default DisclaimerModal