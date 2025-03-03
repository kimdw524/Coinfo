import { useMemo } from 'react';

import { Atom, useAtom, useStore } from 'jotai';

const useAtomAsync = <T extends Atom<unknown>>(atom: Atom<T>) => {
  const [atomValue, setAtomValue] = useAtom<T>(atom);
  const store = useStore();

  if (!atomValue) {
    throw new Promise((resolve) => {
      const unsub = store.sub(atom, () => {
        resolve(true);
        unsub();
      });
    });
  }

  return useMemo(() => [atomValue, setAtomValue], [atomValue, setAtomValue]);
};

export default useAtomAsync;
