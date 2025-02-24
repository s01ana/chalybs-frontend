import { FC } from 'react'
import { AppHeader } from 'components/App'

export const FormHeader: FC<{
  title: string
  backTo?: any
}> = ({ title, backTo }) => {
  return (
    <AppHeader backTo={backTo} title={title} noConfig />
  )
}
