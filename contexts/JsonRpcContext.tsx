'use client';
import { FC, createContext, ReactNode } from 'react';
import { ethers } from 'ethers';

interface IJsonRpcContextProps {
  ethereumProvider: ethers.JsonRpcProvider | null;
}

export const JsonRpcContext = createContext<IJsonRpcContextProps>({
  ethereumProvider: null,
});

interface IJsonRpcContextProviderProps {
  children: ReactNode;
}

const JsonRpcContextProvider: FC<IJsonRpcContextProviderProps> = ({
  children,
}) => {
  const ethereumProvider = new ethers.JsonRpcProvider(
    'https://rpc.ankr.com/eth'
  );
  return (
    <JsonRpcContext.Provider value={{ ethereumProvider }}>
      {children}
    </JsonRpcContext.Provider>
  );
};

export default JsonRpcContextProvider;
