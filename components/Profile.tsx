import { FC } from 'react';
import Image from 'next/image';

import NetCurve from './NetCurve';

interface ProfileProps {
  address: string;
}

const Profile: FC<ProfileProps> = ({ address }) => {
  return (
    <div className="d-flex flex-column flex-lg-row  gap-3 mt-2 align-items-center">
      <div>
        <Image
          src={'/assets/frames/avatar.svg'}
          alt={'avatar-wrapper'}
          width={96}
          height={96}
          style={{ position: 'absolute' }}
        />
        <Image
          src={'/assets/images/boredApe.webp'}
          alt={'avatar'}
          width={96}
          height={96}
        />
      </div>
      <section className="d-flex flex-column justify-content-center align-items-center align-items-lg-start">
        <h6 className="fw-semibold m-0">{`0x_per.eth`}</h6>
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
      <NetCurve />
    </div>
  );
};

export default Profile;
