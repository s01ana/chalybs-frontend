import { Vault } from 'libraries/vaults'
import { Card, Flex, Skeleton, Text } from 'components'
import BigNumber from 'bignumber.js'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import CardActionsContainer from './CardActionsContainer'
import CardHeading from './CardHeading'

const StyledCard = styled(Card)`
  align-self: baseline;
  max-width: 100%;
  margin: 0 0 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 350px;
    margin: 0 12px 46px;
  }
`

const FarmCardInnerContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
`

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
`

interface BondCardProps {
  vault: Vault
  removed: boolean
  dcpPrice?: BigNumber
  account?: string
  originalLiquidity?: BigNumber
}

const BondCard: React.FC<React.PropsWithChildren<BondCardProps>> = ({
  vault,
  removed,
  account,
}) => {
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const toggleExpandableSection = useCallback(() => {
    setShowExpandableSection((prev) => !prev)
  }, [])

  return (
    <StyledCard>
      <FarmCardInnerContainer>
        <CardHeading
          token={vault.token}
          name={vault.name}
        />
        <Flex justifyContent="space-between">
          <Text>APR:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {vault?.dailyAPR ? (
              `${new BigNumber(vault?.dailyAPR).div(100)}% daily`
              ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Total Locked:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {vault?.totalLocked ? (
              `${new BigNumber(vault?.totalLocked).div(10 ** vault.token.decimals).decimalPlaces(3).toString()} ${vault.name}`
              ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Total Claimed:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {vault?.totalRewarded ? (
              `${new BigNumber(vault?.totalRewarded).div(10 ** vault.token.decimals).decimalPlaces(3).toString()} ${vault.name}`
              ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
        <CardActionsContainer
          vault={vault}
          account={account}
        />
      </FarmCardInnerContainer>
    </StyledCard>
  )
}

export default BondCard