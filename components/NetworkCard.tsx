import { FC } from 'react';
import Image from 'next/image';

import { chainDetails, formatCurrencyValue, percentageChange } from '@utils';
import { NetCurve } from '@components';
import { SparklineData } from '@types';

interface INetworkCardProps {
  chainId: number;
  isSelected?: boolean;
  value: number;
  percentage: number;
  sparkline: SparklineData[];
  onClick: () => void;
}

const NetworkCard: FC<INetworkCardProps> = ({
  chainId,
  isSelected = false,
  value = 0,
  percentage = 0,
  sparkline = [],
  onClick,
}) => {
  const sparklinePercentage = percentageChange(
    sparkline[sparkline.length - 1].value,
    sparkline[0].value
  );

  return (
    <div
      className={`rounded-4 border-0 ${
        isSelected
          ? 'bg-body-bg shadow'
          : 'bg-primary text-card-color on-hover-shadow'
      } `}
      style={{ maxWidth: '222px', cursor: 'pointer' }}
      onClick={() => onClick()}
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
              className={`text-success fw-semibold m-0 ${
                sparklinePercentage.isNegative ? 'text-danger' : 'text-success'
              }`}
              style={{ fontSize: '12px' }}
            >
              {`${sparklinePercentage.changeString}`}
            </p>
            <NetCurve
              data={sparkline}
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
