import { ChainId } from 'config/chains'
import { CHAIN_IDS } from 'utils/wagmi'
import Farms from 'views/Farms'

const FarmsPage = () => <Farms />

FarmsPage.chains = [ChainId.KAI]

export default FarmsPage
