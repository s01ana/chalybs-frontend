// import { useAppKit } from '@reown/appkit/react'
// import { useActiveChainId } from 'hooks/useActiveChainId'
// import { useAccount } from 'wagmi'
// import { Button } from './Button'

// const accountEllipsis = (address?: string) => {
//   return address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : null
// }

const ConnectWalletButton = () => {
  // const { open } = useAppKit()
  // const { address, isConnected } = useAccount()
  // const { isWrongNetwork } = useActiveChainId()
  // if (isConnected)
  //   return <Button
  //     onClick={() => { 
  //         if (isWrongNetwork) 
  //           return open({view: 'Networks'})
  //         return open()
  //       }
  //     }
  //     height="32px"
  //     px="15px"
  //     style={{borderRadius: "12px"}}
  //     variant={isWrongNetwork ? 'danger' : 'secondary'}
  //   >
  //     {accountEllipsis(address)}
  //   </Button>
  return <w3m-button size="sm" />
}

export default ConnectWalletButton
