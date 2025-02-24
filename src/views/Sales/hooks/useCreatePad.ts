import { useCallback } from 'react'
import { createLaunchpad, createFairLaunchpad } from 'utils/calls/launchpad'
import { useLaunchpadFactory } from 'hooks/useContracts'

const useCreateLaunchpad = () => {
    const launchpad = useLaunchpadFactory()
  
    const handleCreateLaunchpad = useCallback(
      async (values: string[], addresses: string[], strings: string[], options: boolean[], value: bigint) => {
        return createLaunchpad(launchpad, values, addresses, strings, options, value)
      },
      [launchpad],
    )
  
    const handleCreateFairLaunchpad = useCallback(
      async (values: string[], addresses: string[], strings: string[], options: boolean[], value: bigint) => {
        return createFairLaunchpad(launchpad, values, addresses, strings, options, value)
      },
      [launchpad],
    )
  
    return { onCreateLaunchpad: handleCreateLaunchpad, onCreateFairLaunchpad: handleCreateFairLaunchpad }
  }
  
  export default useCreateLaunchpad
