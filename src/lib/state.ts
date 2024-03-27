import { Atom, atom, Getter, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithReset, atomWithStorage, useResetAtom } from 'jotai/utils'

export function atomicSelector<Value>(read: (get: Getter) => Value): Atom<Value> {
  return atom<Value>(read)
}

export const atomic = atom

export const atomicStorage = atomWithStorage

export const atomicReset = atomWithReset

export const useAtomic = useAtom

export const useAtomicValue = useAtomValue

export const useAtomicSetter = useSetAtom

export const useAtomicReset = useResetAtom
