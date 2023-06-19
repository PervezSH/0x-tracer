'use client';
import { FC, useContext, useEffect, useState } from 'react';

import { JsonRpcContext } from '@contexts';

interface IEnsNameProps {
  address: string;
}

const EnsName: FC<IEnsNameProps> = ({ address }) => {
  const { ethereumProvider } = useContext(JsonRpcContext);

  const [ensName, setEnsName] = useState<string | null>(null);

  useEffect(() => {
    async function getEnsName() {
      try {
        const name = await ethereumProvider!.lookupAddress(address);
        setEnsName(name);
      } catch (err) {
        console.error('Something went wrong while fetching ENS Name: ', err);
      }
    }
    if (ethereumProvider) getEnsName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethereumProvider]);
  return <h6 className="fw-semibold m-0">{ensName}</h6>;
};

export default EnsName;
