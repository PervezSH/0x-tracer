import { FC } from 'react';
import Image from 'next/image';

import { chainDetails, concisedUsdValue24h, formatCurrencyValue } from '@utils';
import { NetCurve } from '@components';

interface INetworkCardProps {
  chainId: number;
  isSelected?: boolean;
  value: number;
  percentage: number;
}

const NetworkCard: FC<INetworkCardProps> = ({
  chainId,
  isSelected = false,
  value = 0,
  percentage = 0,
}) => {
  return (
    <div
      className={`rounded-4 border-0 ${
        isSelected
          ? 'bg-body-bg shadow'
          : 'bg-primary text-card-color on-hover-shadow'
      } `}
      style={{ maxWidth: '222px', cursor: 'pointer' }}
    >
      <div className="d-flex rounded-4">
        <div
          className="m-3 me-0 rounded-4 overflow-hidden"
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: `${chainDetails[chainId].themeBg}`,
          }}
        >
          <Image
            src={chainDetails[chainId].logoPath}
            alt={chainDetails[chainId].name}
            width={40}
            height={40}
            style={{
              objectFit: 'cover',
              transform: 'translate(15px, 12.5px)',
            }}
          />
        </div>
        <div className="card-body p-3 align-items-center rounded-4 shadow-none">
          <div
            className="d-flex gap-1 align-items-center"
            style={{ width: '125px' }}
          >
            <h6
              className={`card-title fw-semibold m-0 text-nowrap ${
                isSelected ? 'text-primary' : 'text-card-color'
              }`}
              style={{ maxWidth: '92px' }}
            >
              {formatCurrencyValue(value)}
            </h6>
            <p
              className="text-secondary fw-semibold m-0"
              style={{ fontSize: '12px' }}
            >
              {`${percentage.toFixed()}%`}
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
