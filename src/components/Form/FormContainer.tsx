import styled from 'styled-components'
import { Column} from '../Column'

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
`

const FormContainer: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <Wrapper>
      <Column>
        {children}
      </Column>
    </Wrapper>
  )
}

export default FormContainer
