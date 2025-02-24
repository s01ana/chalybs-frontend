import { useState } from 'react'
import styled from 'styled-components'
import { Box, Button, Card, Flex, NextLinkFromReactRouter, Text } from 'components'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import Page from 'components/Layout/Page'
import { FinishData, LaunchpadFormView, TokenData, Socials, FairLaunch } from '../types'
import { routers } from '../constants'
import { VerifyTokenForm } from './components/VerifyTokenForm'
import { InformationForm } from './components/InformationForm'
import { SocialsForm } from './components/SocialsForm'
import { ReviewForm } from './components/ReviewForm'
import { FinishForm } from './components/FinishForm'

const PageHeader = styled(Flex)`
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 12px;
  border-radius: 16px;
`

export const StyledAppBody = styled(Card)`
  margin: auto;
  margin-top: 10px;
  border-radius: 8px;
  max-width: 1200px;
  width: 100%;
  z-index: 1;
`
const CreateFairLaunch: React.FC<React.PropsWithChildren> = () => {
  const [modalView, setModalView] = useState<LaunchpadFormView>(LaunchpadFormView.VerifyToken)
  const native = useNativeCurrency()
  const { chainId } = useActiveChainId()

  const [ tokenData, setTokenData ] = useState<TokenData>({
    tokenAddress: "",
    tokenName: "",
    tokenDecimals: 0,
    tokenSymbol: "",
    currency: native,
    mainFee: "50",
    tokenFee: "0",
    listingOption: true
  })

  const [deFiData, setDeFiData] = useState<FairLaunch>({
    total: "",
    whitelist: false,
    softCap: "",
    isMax: false,
    maximumBuy: "",
    router: routers[chainId][0].value,
    liquidity: "",
    startTime: new Date(Date.now() + 24*3600*1000).toISOString().substring(0, 19),
    endTime: new Date(Date.now() + 6*24*3600*1000).toISOString().substring(0, 19),
    lockTime: "",
    totalAmount: "0",
    // isVesting: false,
    // vestingData: {
    //   vestingFirst: "0",
    //   vestingPeriod: "0",
    //   vestingEach: "0"
    // }
  })

  const [socials, setSocials] = useState<Socials>({
    website: "",
    logoUrl: "",
    facebook: "",
    twitter: "",
    github: "",
    telegram: "",
    instagram: "",
    discord: "",
    reddit: "",
    youtube: "",
    whitelist: "",
    description: "",
  })

  const [presale, setPresale] = useState<FinishData>({address: ""})

  return (
    <Page>
      <StyledAppBody mb="24px">
        {
          modalView === LaunchpadFormView.VerifyToken && 
          <VerifyTokenForm
            setModalView={setModalView}
            tokenData={tokenData}
            setTokenData={setTokenData}
          />
        }
        {
          modalView === LaunchpadFormView.DeFiInfo && 
          <InformationForm
            setModalView={setModalView}
            tokenData={tokenData}
            deFiData={deFiData}
            setDefiData={setDeFiData}
          />
        }
        {
          modalView === LaunchpadFormView.Socials && 
          <SocialsForm
            setModalView={setModalView}
            deFiData={deFiData}
            socials={socials}
            setSocials={setSocials}
          />
        }
        {
          modalView === LaunchpadFormView.Review && 
          <ReviewForm
            setModalView={setModalView}
            tokenData={tokenData}
            deFiData={deFiData}
            socials={socials}
            setPresale={setPresale}
          />
        }
        {
          modalView === LaunchpadFormView.Finish && 
          <FinishForm
            setModalView={setModalView}
            setTokenData={setTokenData}
            setDefiData={setDeFiData}
            setSocials={setSocials}
            setPresale={setPresale}
            address={presale.address}
          />
        }
      </StyledAppBody>
    </Page>
  )
}

export default CreateFairLaunch
