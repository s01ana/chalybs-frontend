import { useMemo } from 'react'
import {
  Box,
  ButtonMenu,
  ButtonMenuItem,
  Flex,
  NextLinkFromReactRouter,
} from 'components'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Search from 'views/Info/components/InfoSearch'
import { useMultiChainPath } from 'state/info/hooks'

const NavWrapper = styled(Flex)`
  // background: ${({ theme }) => theme.colors.gradientCardHeader};
  justify-content: space-between;
  padding: 20px 16px;
  flex-direction: column;
  gap: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 40px;
    flex-direction: row;
  }
`

const InfoNav: React.FC<{ isStableSwap: boolean }> = ({ isStableSwap }) => {
  const router = useRouter()
  const chainPath = useMultiChainPath()
  const stableSwapQuery = isStableSwap ? '?type=stableSwap' : ''
  const activeIndex = useMemo(() => {
    if (router?.pathname?.includes('/pairs')) {
      return 1
    }
    if (router?.pathname?.includes('/tokens')) {
      return 2
    }
    return 0
  }, [router.pathname])
  return (
    <NavWrapper>
      <Flex>
        <Box>
          <ButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}${stableSwapQuery}`}>
              Overview
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}/pairs${stableSwapQuery}`}>
              Pairs
            </ButtonMenuItem>
            <ButtonMenuItem as={NextLinkFromReactRouter} to={`/info${chainPath}/tokens${stableSwapQuery}`}>
              Tokens
            </ButtonMenuItem>
          </ButtonMenu>
        </Box>
      </Flex>
      <Box width={['100%', '100%', '250px']}>
        <Search />
      </Box>
    </NavWrapper>
  )
}

export default InfoNav
