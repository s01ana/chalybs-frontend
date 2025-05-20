import { useTooltip } from "hooks"
import { useActiveChainId, useLocalNetworkChain } from "hooks/useActiveChainId"
import { useNetworkConnectorUpdater } from "hooks/useActiveWeb3React"
import { NATIVE } from "libraries/swap-sdk"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { chains } from "utils/wagmi"
import { UserMenu, UserMenuDivider, UserMenuItem } from "widgets/Menu"
import { Box, Flex } from "components/Box"
import { useSwitchNetwork } from "hooks/useSwitchNetwork"
import { ChainLogo } from "components/Logo/ChainLogo"
import { Text } from "components/Text"
import { useWeb3React } from "libraries/wagmi"
import { useSessionChainId } from "hooks/useSessionChainId"
import { useHover } from "hooks/useHover"
import { ArrowDownIcon, ArrowUpIcon, InfoIcon } from "components/Svg"
import { Button } from "components/Button"
import { ChainId } from "config/chains"

const NetworkSelect = ({ switchNetwork, chainId, targetChainId, setTargetChain, isTargetChain }) => {
  const handleChangeNetwork = (chain) => {
    if (isTargetChain && chainId === ChainId.BSC) {
      if (chain.id !== ChainId.BSC) {
        setTargetChain(chain.id)
      } else {
        switchNetwork(targetChainId)
      }
    }
    console.log(isTargetChain)
    if (!isTargetChain) {
      switchNetwork(chain.id)
    }
  }
  return (
    <>
      {chains
        .filter((chain) => !chain.testnet || chain.id === chainId)
        .map((chain) => (
          <UserMenuItem
            key={chain.id}
            style={{ justifyContent: 'flex-start' }}
            onClick={() => handleChangeNetwork(chain)}
          >
            <ChainLogo chainId={chain.id} />
            <Text color='text' pl="12px">
              {chain.name}
            </Text>
          </UserMenuItem>
        ))}
    </>
  )
}
  
  const WrongNetworkSelect = ({ switchNetwork, chainId }) => {
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
    	`'The URL you are accessing (Chain id: ${chainId}) belongs to ${chains.find((c) => c.id === chainId)?.name ?? 'Unknown network'}; mismatching your wallet’s network. Please switch the network to continue.'`,
      {
        placement: 'auto-start',
        hideTimeout: 0,
      },
    )
    const { chain } = useWeb3React()
    const localChainId = useLocalNetworkChain() || ChainId.BSC
    const [, setSessionChainId] = useSessionChainId()
  
    const localChainName = chains.find((c) => c.id === localChainId)?.name ?? 'BSC'
  
    const [ref1, isHover] = useHover<HTMLButtonElement>()
  
    return (
      <>
        <Flex ref={targetRef} alignItems="center" px="16px" py="8px">
          <InfoIcon color="textSubtle" />
          <Text color="textSubtle" pl="6px">
            Please switch network
          </Text>
        </Flex>
        {tooltipVisible && tooltip}
        <UserMenuDivider />
        {chain && (
          <UserMenuItem ref={ref1} onClick={() => setSessionChainId(chain.id)} style={{ justifyContent: 'flex-start' }}>
            <ChainLogo chainId={chain.id} />
            <Text color="secondary" bold pl="12px">
              {chain.name}
            </Text>
          </UserMenuItem>
        )}
        <Box px="16px" pt="8px">
          {isHover ? <ArrowUpIcon color="text" /> : <ArrowDownIcon color="text" />}
        </Box>
        <UserMenuItem onClick={() => switchNetwork(localChainId)} style={{ justifyContent: 'flex-start' }}>
          <ChainLogo chainId={localChainId} />
          <Text pl="12px">{localChainName}</Text>
        </UserMenuItem>
        <Button mx="16px" my="8px" scale="sm" onClick={() => switchNetwork(localChainId)}>
          Switch network in wallet
        </Button>
      </>
    )
  }

export const NetworkSwitcher = ({targetChainId, setTargetChain, isTargetChain}) => {
    const { chainId, isNotMatched } = useActiveChainId()
    const { canSwitch, switchNetworkAsync } = useSwitchNetwork()
    const router = useRouter()
  
    useNetworkConnectorUpdater()
  
    const foundChain = useMemo(() => chains.find((c) => c.id === chainId), [chainId])
    const targetChain = useMemo(() => chains.find((c) => c.id === targetChainId), [targetChainId])
    const symbol = foundChain?.id ? NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol : undefined
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
      'Unable to switch network. Please try it on your wallet',
      { placement: 'bottom' },
    )
  
    const cannotChangeNetwork = !canSwitch
  
		if (!chainId || router.pathname.includes('/info')) {
			return null
		}

    const avatarSrc = isTargetChain ?
      `/images/chains/${targetChainId === 42161 ? "42161-1" : targetChainId === 11451 ? "11451-1" : targetChainId}.png`
      : `/images/chains/${chainId === 42161 ? "42161-1" : chainId === 11451 ? "11451-1" : chainId}.png`
  
    return (
      <Box ref={cannotChangeNetwork ? targetRef : null} height="100%">
        <>{cannotChangeNetwork && tooltipVisible && tooltip}</>
        <UserMenu
          placement="bottom"
          variant='default'
          avatarSrc={avatarSrc}
          disabled={chainId !== ChainId.BSC && isTargetChain}
          text={
            targetChain && foundChain ? isTargetChain ? (
              <>
                <Box display={['none', null, null, null, null, 'block']}>{targetChain.name}</Box>
                <Box display={['block', null, null, null, null, 'none']}>{targetChainId === 42161 ? "ARB" : targetChainId === 11451 ? "eGold" : targetChain.nativeCurrency.symbol}</Box>
              </>
            ) : (
              <>
                <Box display={['none', null, null, null, null, 'block']}>{foundChain.name}</Box>
                <Box display={['block', null, null, null, null, 'none']}>{chainId === 42161 ? "ARB" : chainId === 11451 ? "eGold" : foundChain.nativeCurrency.symbol}</Box>
              </>
            ) : (
              'Select a Network'
            )
          }
          // onClick={handleClick}
        >
          {() =>
            // isNotMatched ? (
            //   <WrongNetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
            // ) : 
            (
              <NetworkSelect
                switchNetwork={switchNetworkAsync} 
                chainId={chainId}
                targetChainId={targetChainId}
                setTargetChain={setTargetChain}
                isTargetChain={isTargetChain}
              />
            )
          }
        </UserMenu>
      </Box>
    )
  }