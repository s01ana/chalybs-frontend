import { Token } from 'libraries/swap-sdk'
import { useMemo } from 'react'
import { multiChainId } from 'state/info/constant'
import styled from 'styled-components'
import { Address } from 'viem'
// import { safeGetAddress } from 'utils'
import getTokenLogoURL from '../../../../utils/getTokenLogoURL'
import LogoLoader from './LogoLoader'

const StyledLogo = styled(LogoLoader)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

export const CurrencyLogo: React.FC<
  React.PropsWithChildren<{
    address: Address
    size?: string
    chainName?: 'ARB'
  }>
> = ({ address, size = '24px', chainName = 'ARB', ...rest }) => {
  const src = useMemo(() => {
    return getTokenLogoURL(new Token(multiChainId[chainName], address, 18, ''))
  }, [address, chainName])
  // const checkedsummedAddress = safeGetAddress(address)
  // const srcFromPCS = checkedsummedAddress
  //   ? `https://tokens.pancakeswap.finance/images/arbitrum/${checkedsummedAddress}.png`
  //   : ''
  return <StyledLogo size={size} src={src ?? ""} alt="token logo" {...rest} />
}

const DoubleCurrencyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 32px;
`

interface DoubleCurrencyLogoProps {
  address0?: Address
  address1?: Address
  size?: number
  chainName?: 'ARB'
}

export const DoubleCurrencyLogo: React.FC<React.PropsWithChildren<DoubleCurrencyLogoProps>> = ({
  address0,
  address1,
  size = 16,
  chainName = 'ARB',
}) => {
  return (
    <DoubleCurrencyWrapper>
      {address0 && <CurrencyLogo address={address0} size={`${size.toString()}px`} chainName={chainName} />}
      {address1 && <CurrencyLogo address={address1} size={`${size.toString()}px`} chainName={chainName} />}
    </DoubleCurrencyWrapper>
  )
}
