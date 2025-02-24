import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const disclaimerAtom = atomWithStorage<number>('dexfinity:disclaimer', 0)

const hideDisclaimerAtom = atom(
  (get) => {
    const last = get(disclaimerAtom)
    return last === 0
  },
  (_, set) => set(disclaimerAtom, Date.now()),
)

export function useDisclaimer() {
  return useAtom(hideDisclaimerAtom)
}
