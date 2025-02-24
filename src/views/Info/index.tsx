// import { ChainId } from 'config/chains'
// import { useAccount } from 'wagmi'
// import { useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { useActiveChainId } from 'hooks/useActiveChainId'
import InfoNav from './components/InfoNav'

export const InfoPageLayout = ({ children }) => {
  // const { address: account } = useAccount()
  // const { chainId } = useActiveChainId()
  // const router = useRouter()

  // useEffect(() => {
  //   if (account && chainId === ChainId.MAINNET && router.query.chainName === 'arb')
  //     router.replace('/info', undefined, { shallow: true })
  //   else if (account && chainId === ChainId.MAINNET && router.query.chainName !== 'arb')
  //     router.replace('/info/arb', undefined, { shallow: true })
  // }, [chainId, account, router])

  return (
    <>
      <InfoNav isStableSwap={false} />
      {children}
    </>
  )
}
