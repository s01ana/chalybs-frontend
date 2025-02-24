import styled from 'styled-components'
import { Flex, Heading, Text } from 'components'
import { SerializedWrappedToken } from 'libraries/token-lists'
import { STokenImage } from 'components/TokenImage'

export interface ExpandableSectionProps {
  token: SerializedWrappedToken
  name: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

const CardHeading: React.FC<React.PropsWithChildren<ExpandableSectionProps>> = ({
  token,
  name
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="32px">
      <STokenImage token={token} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px" scale="lg" color="success">{`${name}`} Vault</Heading>
        <Text>40 days lock</Text>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
