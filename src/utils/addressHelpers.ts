import { ChainId } from 'config/chains'
import addresses from 'config/constants/contracts'
import { Address } from 'viem'

export type Addresses = {
  [chainId in ChainId]?: Address
}

export const getAddressFromMap = (address: Addresses, chainId?: number): `0x${string}` => {
  return chainId && address[chainId] ? address[chainId] : address[ChainId.MAINNET]
}

export const getAddressFromMapNoFallback = (address: Addresses, chainId?: number): `0x${string}` | null => {
  return chainId ? address[chainId] : null
}

export const getMasterChefAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.masterChef, chainId)
}
export const getMulticallAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.multiCall, chainId)
}

export const getMultiSenderAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.multisender, chainId)
}

export const getLockerAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.locker, chainId)
}

export const getLaunchpadFactoryAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.launchpadFactory, chainId)
}

export const getContributionAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.contribution, chainId)
}

export const getSmartRouterAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.smartRouter, chainId)
}

export const getTreasuryAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.treasury, chainId)
}

export const getPresaleAddress = (chainId?: number) => {
  return getAddressFromMap(addresses.presale, chainId)
}
