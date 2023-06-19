'use client';
import { FC, useContext, useEffect, useState } from 'react';

import { JsonRpcContext } from '@contexts';

interface IEnsAvatarProps {
  address: string;
}

const EnsAvatar: FC<IEnsAvatarProps> = ({ address }) => {
  const { ethereumProvider } = useContext(JsonRpcContext);

  const [ensAvatar, setEnsAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function getEnsAvatar() {
      try {
        const name = await ethereumProvider!.lookupAddress(address);
        if (!name) return;
        const avatar = await ethereumProvider!.getAvatar(name);
        setEnsAvatar(avatar);
      } catch (err) {
        console.error('Something went wrong while fetching ENS Avatar: ', err);
      }
    }
    if (ethereumProvider) getEnsAvatar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethereumProvider]);

  return ensAvatar ? (
    <img src={ensAvatar} alt={'ens-avatar'} width={96} height={96} />
  ) : (
    <div className="bg-primary" style={{ width: '96px', height: '96px' }}></div>
  );
};

export default EnsAvatar;
