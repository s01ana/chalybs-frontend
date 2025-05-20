import React from "react";
import { useAppKitNetwork } from "@reown/appkit/react";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { ChainId, kaichain } from "config/chains";
import { useSwitchNetwork } from "hooks/useSwitchNetwork";

interface NetworkCheckProps {
  pageSupportedChains?: number[]
}

const NetworkCheck: React.FC<React.PropsWithChildren<NetworkCheckProps>> = ({
  pageSupportedChains = [],
}) => {
  const { switchNetwork } = useAppKitNetwork()
  const { switchNetworkAsync } = useSwitchNetwork()
  const { chainId } = useActiveWeb3React()
  const isSupported = pageSupportedChains.length === 0 || pageSupportedChains.includes(chainId)

  if (!isSupported) {
    // switchNetwork(kaichain)
    switchNetworkAsync(ChainId.KAI)
  }
  return null
}

export default NetworkCheck