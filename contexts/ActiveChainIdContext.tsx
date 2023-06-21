'use client';
import { createContext, FC, useReducer, useContext } from 'react';

type Action = {
  type: 'SET_ACTIVE_CHAIN_ID';
  payload: number;
};

const ActiveChainIdContext = createContext<
  { activeChainId: number; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const reducer = (state: number, action: Action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CHAIN_ID':
      return action.payload;
    default:
      throw new Error('Invalid action type');
  }
};

export const ActiveChainIdContextProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [activeChainId, dispatch] = useReducer(reducer, 1);
  return (
    <ActiveChainIdContext.Provider value={{ activeChainId, dispatch }}>
      {children}
    </ActiveChainIdContext.Provider>
  );
};

export const useActiveChainIdContext = () => {
  const context = useContext(ActiveChainIdContext);
  if (context === undefined) {
    throw new Error(
      'useActiveChainIdContext must be used within a ActiveChainIdContextProvider'
    );
  }
  return {
    activeChainId: context.activeChainId,
    dispatch: context.dispatch,
  };
};
