import { FC } from 'react';
import Image from 'next/image';

import { chainDetails, concisedUsdValue24h } from '@utils';
import { NetCurve } from '@components';

interface INetworkCardProps {
  isSelected?: boolean;
}

const NetworkCard: FC<INetworkCardProps> = ({ isSelected = false }) => {
  return (
    <div
      className={`card network-card rounded-4 border-0 ${
        isSelected
          ? 'bg-body-bg shadow'
          : 'bg-primary text-card-color on-hover-shadow'
      } `}
      style={{ maxWidth: '222px', cursor: 'pointer' }}
    >
      <div className="d-flex rounded-4">
        <div
          className="m-3 rounded-4 overflow-hidden"
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: `${chainDetails[43114].themeBg}`,
          }}
        >
          <Image
            src={chainDetails[43114].logoPath}
            alt={chainDetails[43114].name}
            width={40}
            height={40}
            style={{
              objectFit: 'cover',
              transform: 'translate(15px, 12.5px)',
            }}
          />
        </div>
        <div className="card-body p-0 py-3 align-items-center rounded-4 shadow-none">
          <div className="d-flex gap-1 align-items-center">
            <h6
              className="card-title fw-semibold m-0 text-nowrap"
              style={{ maxWidth: '92px' }}
            >{`$18,966,580`}</h6>
            <p
              className="text-secondary fw-semibold m-0"
              style={{ fontSize: '12px' }}
            >
              {`88%`}
            </p>
          </div>
          <div
            className="d-flex flex-row align-items-center p-0"
            style={{ width: '125px' }}
          >
            <p
              className="text-success fw-semibold m-0"
              style={{ fontSize: '12px' }}
            >
              {`+10.50%`}
            </p>
            <NetCurve
              data={concisedUsdValue24h}
              tooltip={false}
              xAxis={false}
              height={25}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkCard;
