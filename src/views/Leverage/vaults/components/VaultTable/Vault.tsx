import { STokenImage, STokenPairImage, TokenImage, TokenPairImage } from 'components/TokenImage'
import { Vault } from 'libraries/vaults'
import VaultTokenInfo from './VaultTokenInfo'

interface VaultTableFarmTokenInfoProps {
  vault?: Vault
}

const VaultInfo: React.FunctionComponent<React.PropsWithChildren<VaultTableFarmTokenInfoProps>> = ({
  vault
}) => {

  return (
    <VaultTokenInfo
    vault={vault}
    >
      <STokenImage width={40} height={40} token={vault?.token} />
    </VaultTokenInfo>
  )
}

export default VaultInfo
