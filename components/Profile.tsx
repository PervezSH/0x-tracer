import { FC } from 'react';
import Image from 'next/image';

import NetCurve from './NetCurve';
import { EnsAvatar, EnsName } from '@components';
import type { SparklineData } from '@types';

const getFirstTransfer = async (address: string) => {
  try {
    const res = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&page=1&offset=1&startblock=0&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}}`
    );
    const data = await res.json();
    if (data.status !== '1') return null;
    const blockNumber = data.result[0].blockNumber;
    const timestamp = data.result[0].timeStamp;
    const currentDate = new Date();
    const timestampDate = new Date(timestamp * 1000);
    const timeDiff = currentDate.getTime() - timestampDate.getTime();
    const daysAgo = Math.floor(timeDiff / (1000 * 3600 * 24));
    return {
      blockNumber,
      daysAgo,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

interface ProfileProps {
  address: string;
  sparkline: SparklineData[];
}

const Profile: FC<ProfileProps> = async ({ address, sparkline }) => {
  const firstTransfer = await getFirstTransfer(address);

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
        <EnsAvatar address={address} />
      </div>
      <section className="d-flex flex-column justify-content-center align-items-center align-items-lg-start">
        <EnsName address={address} />
        <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
          <p className="fs-6 text-secondary m-0">{address}</p>
          <span className="badge d-flex align-items-center gap-1 bg-badge-bg text-primary py-2 px-3 rounded-4">
            <Image
              src={'/assets/icons/calender.svg'}
              alt={'calendar'}
              width={16}
              height={16}
            />
            {`${firstTransfer ? firstTransfer.daysAgo : '0'} days`}
          </span>
        </div>
      </section>
      <NetCurve data={sparkline} />
    </div>
  );
};

export default Profile;
