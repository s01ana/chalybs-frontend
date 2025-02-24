import styled from 'styled-components'
import { Text, Flex, Box, CloseIcon, IconButton } from 'components'
import { useMatchBreakpoints } from 'contexts'
import { usePhishingBanner } from 'utils/user'

const Container = styled(Flex)`
  overflow: hidden;
  height: 100%;
  align-items: center;
  // width: 100%;
  padding: 0 10px;
  margin: 0;
  background: ${({ theme }) => theme.colors.gradientBlue};
  // ${({ theme }) => theme.mediaQueries.sm} {
  //   margin: 10px 25px;
  // }
`

const InnerContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SpeechBubble = styled.div`
  border-radius: 8px;
  padding: 8px;
  width: 60%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  & ${Text} {
    flex-shrink: 0;
    margin-right: 4px;
  }
`

const domain = 'https://dexfinity.finance'

const PhishingWarningBanner: React.FC<React.PropsWithChildren> = () => {
  const [, hideBanner] = usePhishingBanner()
  const { isMobile, isMd } = useMatchBreakpoints()
  const warningTextAsParts = `please make sure you're visiting ${domain} - check the URL carefully.`.split(/(https:\/\/dexfinity.finance)/g)
  const warningTextComponent = (
    <>
      <Text as="span" color="white" small textTransform="uppercase">
        Phishing warning : 
      </Text>
      {warningTextAsParts.map((text, i) => (
        <Text
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          small
          as="span"
          color={text === domain ? '#FFFFFF' : '#ffffff'}
        >
          {text}
        </Text>
      ))}
    </>
  )
  return (
    <Container>
      {isMobile || isMd ? (
        <Flex justifyContent="center" width="100%">
          <Box>{warningTextComponent}</Box>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </Flex>
      ) : (
        <>
          <InnerContainer>
            <SpeechBubble>{warningTextComponent}</SpeechBubble>
          </InnerContainer>
          <IconButton onClick={hideBanner} variant="text">
            <CloseIcon color="#FFFFFF" />
          </IconButton>
        </>
      )}
    </Container>
  )
}

export default PhishingWarningBanner
