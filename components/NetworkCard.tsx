import { FC } from 'react';
import Image from 'next/image';

import { chainDetails, concisedUsdValue24h } from '@utils';
import { NetCurve } from '@components';

const NetworkCard: FC = () => {
  return (
    <div
      className="card bg-body-bg text-body-color rounded-4 shadow border-0"
      style={{ maxWidth: '222px', cursor: 'pointer' }}
    >
      <div className="d-flex">
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
        <div className="card-body p-0 py-3 align-items-center">
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