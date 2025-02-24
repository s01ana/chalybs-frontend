import { memo } from 'react'
import { isChainSupported } from 'utils/wagmi'
import { HelpIcon } from '../Svg'

export const ChainLogo = memo(
  ({ chainId, width = 24, height = 24 }: { chainId: number; width?: number; height?: number }) => {
    if (isChainSupported(chainId)) {
      return (
        <img
          alt={`chain-${chainId}`}
          style={{ maxHeight: `${height}px` }}
          src={`/images/chains/${chainId === 42161 ? "42161-1" : chainId}.png`}
          width={width}
          height={height}
        />
      )
    }

    return <HelpIcon width={width} height={height} />
  },
)
