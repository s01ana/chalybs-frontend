import styled from 'styled-components'
import { Card } from '../Card'

export const BodyWrapper = styled(Card)`
  // background: none;
  border-radius: 8px;
  // border: 1px solid ${({ theme }) => theme.colors.dropdown};
  max-width: 464px;
  width: 100%;
  z-index: 1;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper padding="12px">{children}</BodyWrapper>
}
