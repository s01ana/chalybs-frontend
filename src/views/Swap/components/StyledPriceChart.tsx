import { Box } from 'components'
import styled from 'styled-components'

const StyledPriceChart = styled(Box)<{
  $isDark: boolean
  $isExpanded: boolean
  $isDesktop: boolean
  $isFullWidthContainer?: boolean
}>`
  border: none;
  // border-radius: 32px;
  width: 100%;
  padding-top: 36px;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 40px;
    // background: ${({ $isDark }) => ($isDark ? 'rgba(39, 38, 44, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
    // border: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
    // border-radius: ${({ $isExpanded }) => ($isExpanded ? '0' : '16px')};
    width: ${({ $isExpanded, $isFullWidthContainer }) => ($isFullWidthContainer || $isExpanded ? '100%' : '50%')};
    height: ${({ $isDesktop }) => ($isDesktop ? '516px' : '100%')};
  }
`

export default StyledPriceChart
