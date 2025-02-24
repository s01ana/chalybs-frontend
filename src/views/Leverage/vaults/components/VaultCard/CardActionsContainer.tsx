import { Flex, Text } from 'components'
import ConnectWalletButton from 'components/ConnectWalletButton'
import styled from 'styled-components'
import { Vault } from 'libraries/vaults'
import { HarvestActionContainer } from '../VaultTable/Actions/HarvestAction'
import HarvestAction from './HarvestAction'
import StakeAction, { StakedContainer } from '../VaultTable/Actions/StakedAction'

const Action = styled.div`
  padding-top: 16px;
`

interface BondCardActionsProps {
  vault: Vault
  account?: string
}

const CardActions: React.FC<React.PropsWithChildren<BondCardActionsProps>> = ({
  vault,
  account,
}) => {
  return (
    <Action>
      <Flex>
        <Text textTransform="uppercase" color="textSubtle" fontSize="12px">
          Pending Reward
        </Text>
      </Flex>
      <HarvestActionContainer
        vault={vault}
      >
        {(props) => <HarvestAction {...props} />}
      </HarvestActionContainer>
      {!account ? (
        <ConnectWalletButton />
      ) : 
      (<StakedContainer vault={vault}>
        {(props) => <StakeAction {...props} />}
      </StakedContainer>)}
    </Action>
  )
}

export default CardActions
