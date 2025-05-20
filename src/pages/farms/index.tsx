import { ChainId } from 'config/chains'
import { CHAIN_IDS } from 'utils/wagmi'
import Farms from 'views/Farms'

const FarmsPage = () => {
	return <Farms />
}

FarmsPage.chains = [ChainId.KAI]

export default FarmsPage
