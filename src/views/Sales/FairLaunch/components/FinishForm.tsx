import { Dispatch, SetStateAction } from 'react'
import { Text, Box, Button, Flex, NextLinkFromReactRouter } from 'components'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { ProgressCirclesFullCompleted } from '../../components/ProgressSteps'
import { FairLaunch, FinishData, LaunchpadFormView, Socials, TokenData } from '../../types'
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
  setDefiData: Dispatch<SetStateAction<FairLaunch>>
  setSocials: Dispatch<SetStateAction<Socials>>
  setPresale: Dispatch<SetStateAction<FinishData>>
  address: string
}) {
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
      total: "",
      whitelist: false,
      softCap: "",
      isMax: false,
      maximumBuy: "",
      router: "",
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
        <Box mt="20px">
          <ProgressCirclesFullCompleted steps={[true, true, true]} />
        </Box>
        <Box>
          <Text fontSize="18px" color="primary">Congratulation!</Text>
          <Text fontSize="14px">You've just created fairlaunch</Text>
        </Box>
        <Flex width="100%" alignItems="center" flexDirection={["column", "row"]}>
          <Box width="100%">
            <NextLinkFromReactRouter to={`/sale/${address}`}>
              <Button
                width="100%"
                variant="secondary"
                height="48px"
              >View FairLaunch</Button>
            </NextLinkFromReactRouter>
          </Box>
        </Flex>
        <Flex width="100%" alignItems="center" flexDirection={["column", "row"]}>
          <Box mr={["0", "15px"]} mb={["10px", "0"]} width="100%">
            <Button
              width="100%"
              onClick={handleReturn}
              height="48px"
              variant="primary"
            >Create Other</Button>
          </Box>
          <Box width="100%">
            <NextLinkFromReactRouter to="/sales">
              <Button
                width="100%"
                height="48px"
                variant="primary"
              >View List</Button>
            </NextLinkFromReactRouter>
          </Box>
        </Flex>
      </FormContainer>
    </Box>
  )
}
