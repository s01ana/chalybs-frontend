import { useState } from 'react'
import styled from 'styled-components'
import { Card } from 'components'
import Page from 'components/Layout/Page'
import { FinishData, LockFormView } from './types'
import { VerifyTokenForm } from './components/VerifyTokenForm'
import { FinishForm } from './components/FinishForm'

export const StyledAppBody = styled(Card)`
  margin: auto;  
  border-radius: 8px;
  max-width: 690px;
  padding: 4px 8px 16px 8px;
  width: 100%;
  z-index: 1;
`
const CreateLock: React.FC<React.PropsWithChildren> = () => {
  const [modalView, setModalView] = useState<LockFormView>(LockFormView.Create)

  const [finishData, setFinishData] = useState<FinishData>({
    id: "",
    token: "",
    hash: "",
    chainId: 148
  })

  return (
    <Page>
      <StyledAppBody mb="24px">
        {
          modalView === LockFormView.Create && 
          <VerifyTokenForm
            setModalView={setModalView}
            setFinishData={setFinishData}
          />
        }
        {
          modalView === LockFormView.Finish && 
          <FinishForm
            setModalView={setModalView}
            finishData={finishData}
            setFinishData={setFinishData}
          />
        }
      </StyledAppBody>
    </Page>
  )
}

export default CreateLock