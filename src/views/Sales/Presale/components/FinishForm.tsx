import { Dispatch, SetStateAction } from 'react'
import { Text, Box, Button, Flex, NextLinkFromReactRouter } from 'components'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { ProgressCirclesFullCompleted } from '../../components/ProgressSteps'
import { Presale, FinishData, LaunchpadFormView, Socials, TokenData } from '../../types'
import { routers } from '../../constants'
import { FormContainer } from '../../components/FormContainer'

export function FinishForm({
  setModalView,
  setTokenData,
  setDefiData,
  setSocials,
  setPresale,
  address,
}: {
  setModalView: Dispatch<SetStateAction<LaunchpadFormView>>
  setTokenData: Dispatch<SetStateAction<TokenData>>
  setDefiData: Dispatch<SetStateAction<Presale>>
  setSocials: Dispatch<SetStateAction<Socials>>
  setPresale: Dispatch<SetStateAction<FinishData>>
  address: string
}) {
  const { chainId } = useActiveChainId()
  const native = useNativeCurrency()

  const handleReturn = async () => {
    setTokenData({
      tokenAddress: "",
      tokenName: "",
      tokenDecimals: 0,
      tokenSymbol: "",
      currency: native,
      mainFee: "50",
      tokenFee: "0",
      listingOption: true
    })

    setDefiData({
      presaleRate: "",
      whitelist: false,
      softCap: "",
      hardCap: "",
      minimumBuy: "",
      maximumBuy: "",
      refundType: false,
      router: routers[chainId][0].value,
      liquidity: "",
      listingRate: "",
      startTime: new Date(Date.now() + 24*3600*1000).toISOString().substring(0, 19),
      endTime: new Date(Date.now() + 15*24*3600*1000).toISOString().substring(0, 19),
      lockTime: "",
      totalAmount: "0",
      // isVesting: false,
      // vestingData: {
      //   vestingFirst: "0",
      //   vestingPeriod: "0",
      //   vestingEach: "0"
      // }
    })

    setSocials({
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

    setPresale({address: ""})

    setModalView(LaunchpadFormView.VerifyToken)
  }

  return (
    <Box position="inherit">
      <FormContainer>
        <ProgressCirclesFullCompleted steps={[true, true, true]} />
        <Box>
          <Text fontSize="16px" bold color="primary">Congratulation!</Text>
          <Text fontSize="12px">You've just created launchpad</Text>
        </Box>
        <Flex width="100%" alignItems="center" flexDirection={["column", "row"]}>
          <Box width="100%">
            <NextLinkFromReactRouter to={`/sale/${address}`}>
              <Button
                width="100%"
                variant="secondary"
                height="48px"
              >View Launchpad</Button>
            </NextLinkFromReactRouter>
          </Box>
        </Flex>
        <Flex width="100%" alignItems="center" flexDirection={["column", "row"]}>
          <Box mr={["0", "15px"]} mb={["10px", "0"]} width="100%">
            <Button
              width="100%"
              height="48px"
              variant='primary'
              onClick={handleReturn}
            >Create Other</Button>
          </Box>
          <Box width="100%">
            <NextLinkFromReactRouter to="/sales">
              <Button
                width="100%"
                height="48px"
                variant='primary'
              >View List</Button>
            </NextLinkFromReactRouter>
          </Box>
        </Flex>
      </FormContainer>
    </Box>
  )
}
