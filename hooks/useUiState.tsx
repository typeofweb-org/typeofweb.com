import { useContext, createContext, useMemo, useState } from 'react';

import type { SetStateAction, Dispatch, PropsWithChildren } from 'react';

export interface UIStateValue {
  readonly isMenuOpen: boolean;
}

interface UIStateContextValue {
  readonly uiState: UIStateValue;
  readonly setUIState: Dispatch<SetStateAction<UIStateValue>>;
}

const UIStateContext = createContext<UIStateContextValue | null>(null);
UIStateContext.displayName = 'UIStateContext';

export const UIStateProvider = ({ children }: PropsWithChildren<{}>) => {
  const [uiState, setUIState] = useState<UIStateValue>({ isMenuOpen: false });

  const value = useMemo(() => {
    return { setUIState, uiState };
  }, [setUIState, uiState]);

  return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
};

export const useUIState = () => {
  const ctx = useContext(UIStateContext);

  if (!ctx) {
    throw new Error('Missing UIStateProvider!');
  }

  return ctx;
};
