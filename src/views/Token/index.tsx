import { useState } from 'react'
import styled from 'styled-components'
import { ChainId } from 'config/chains'
import { Box, Button, Card, Flex, NextLinkFromReactRouter, OpenNewIcon, Text } from 'components'
import Page from 'components/Layout/Page'
import { FinishData, TokenData, TokenFormView } from './types'
import { VerifyTokenForm } from './components/VerifyTokenForm'
import { FinishForm } from './components/FinishForm'

const PageHeader = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  border-radius: 16px;
`

export const StyledAppBody = styled(Card)`
  border-radius: 8px;
  max-width: 460px;
  width: 100%;
  padding: 4px 8px 16px 8px;
  z-index: 1;
`
const Launchpad: React.FC<React.PropsWithChildren> = () => {
  const [modalView, setModalView] = useState<TokenFormView>(TokenFormView.Create)

  const [ tokenData, setTokenData ] = useState<TokenData>({
    name: "",
    symbol: "",
    decimals: "",
    totalSupply: "",
    type: "standard",
    liquidityGen: undefined
  })

  const [finishData, setFinishData] = useState<FinishData>({
    address: "" as `0x${string}`,
    hash: "",
    chainId: ChainId.MAINNET
  })

  return (
    <Page>
      <Flex justifyContent="center">
        <StyledAppBody my="24px">
          {
            modalView === TokenFormView.Create && 
            <VerifyTokenForm
              setModalView={setModalView}
              tokenData={tokenData}
              setTokenData={setTokenData}
              setFinishData={setFinishData}
            />
          }
          {
            modalView === TokenFormView.Finish && 
            <FinishForm
              setModalView={setModalView}
              tokenData={tokenData}
              finishData={finishData}
              setTokenData={setTokenData}
              setFinishData={setFinishData}
            />
          }
        </StyledAppBody>
      </Flex>
    </Page>
  )
}

export default Launchpad
