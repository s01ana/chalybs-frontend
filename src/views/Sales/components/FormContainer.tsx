import { PropsWithChildren, memo } from 'react'
import { Column, Flex } from 'components'
import styled from 'styled-components'

export const Wrapper = styled(Flex)`
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 1rem 1rem 1rem;
`

export const FormContainer = memo(function FormContainer({ children }: PropsWithChildren) {
  return (
    <Wrapper>
      <Column gap="lg" pl="8px" pr="8px" pb="8px" pt="0px">
        {children}
      </Column>
    </Wrapper>
  )
})
