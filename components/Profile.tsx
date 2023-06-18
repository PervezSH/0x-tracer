import { FC, cache } from 'react';
import Image from 'next/image';
import { ethers } from 'ethers';

import NetCurve from './NetCurve';
import { usdValue24h } from '@utils';

const getEns = cache(async (address: string) => {
  try {
    const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/eth');
    const name = await provider.lookupAddress(address);
    const avatar = await provider.getAvatar(name!);
    return {
      name,
      avatar,
    };
  } catch (err) {
    console.error(err);
    return {
      name: null,
      avatar: null,
    };
  }
});

interface ProfileProps {
  address: string;
}

const Profile: FC<ProfileProps> = async ({ address }) => {
  const ens = await getEns(address);

  return (
    <div className="d-flex flex-column flex-lg-row  gap-3 mt-4 align-items-center">
      <div>
        <Image
          src={'/assets/frames/avatar.svg'}
          alt={'avatar-wrapper'}
          width={96}
          height={96}
          style={{ position: 'absolute' }}
        />
        {ens.avatar ? (
          <img src={ens.avatar} alt={'ens-avatar'} width={96} height={96} />
        ) : (
          <div
            className="bg-primary"
            style={{ width: '96px', height: '96px' }}
          ></div>
        )}
      </div>
      <section className="d-flex flex-column justify-content-center align-items-center align-items-lg-start">
        {ens.name && <h6 className="fw-semibold m-0">{ens.name}</h6>}
        <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
          <p className="fs-6 text-secondary m-0">{address}</p>
          <span className="badge d-flex align-items-center gap-1 bg-badge-bg text-primary py-2 px-3 rounded-4">
            <Image
              src={'/assets/icons/calender.svg'}
              alt={'calendar'}
              width={16}
              height={16}
            />
            {`156 days`}
          </span>
        </div>
      </section>
      <NetCurve data={usdValue24h} />
    </div>
  );
};

export default Profile;
