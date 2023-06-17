import { FC } from 'react';
import Image from 'next/image';

import { assetsEthereum, formatCurrencyValue } from '@utils';

const AssetsCard: FC = () => {
  return (
    <div className="d-flex flex-column shadow p-4 gap-3 border-0 rounded-5 m-0 mt-2 w-100">
      <h5 className="m-0 fw-semibold">Assets</h5>
      <div className="d-flex flex-column gap-3 overflow-y-hidden overflow-x-scroll">
        <div className="d-flex mt-2 gap-1 w-100">
          <h6
            className="fw-bold text-secondary m-0 p-0 w-100"
            style={{ fontSize: '14px', minWidth: '160px', maxWidth: '300px' }}
          >
            Name
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '14px', minWidth: '80px', maxWidth: '200px' }}
          >
            Price
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '14px', minWidth: '80px', maxWidth: '200px' }}
          >
            Holdings
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '14px', minWidth: '80px', maxWidth: '200px' }}
          >
            Value
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '14px', minWidth: '80px', maxWidth: '200px' }}
          >
            Percentage
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '14px', minWidth: '40px', maxWidth: '100px' }}
          >
            24h
          </h6>
        </div>
        {assetsEthereum.map((asset, index) => (
          <div
            key={`${index}-${asset.name}`}
            className="d-flex gap-1 w-100 align-items-center"
          >
            <div
              className="d-flex w-100 align-items-center gap-2 text-nowrap"
              style={{ minWidth: '160px', maxWidth: '300px' }}
            >
              <Image
                className="object-fit-cover"
                src={asset.logoPath}
                alt={`${asset.name}-logo`}
                width={24}
                height={24}
              />
              <p className="text-primary m-0 p-0 text-truncate">{asset.name}</p>
              <span className="text-secondary" style={{ fontSize: '12px' }}>
                {asset.symbol}
              </span>
            </div>
            <p
              className="text-primary m-0 p-0 text-end w-100"
              style={{ minWidth: '80px', maxWidth: '200px' }}
            >
              {formatCurrencyValue(asset.price, 2)}
            </p>
            <p
              className="text-primary m-0 p-0 text-end w-100"
              style={{ minWidth: '80px', maxWidth: '200px' }}
            >
              {formatCurrencyValue(asset.holdings, 2, false, '')}
            </p>
            <p
              className="text-primary m-0 p-0 text-end w-100"
              style={{ minWidth: '80px', maxWidth: '200px' }}
            >
              {formatCurrencyValue(asset.value, 2)}
            </p>
            <p
              className="text-primary m-0 p-0 text-end w-100"
              style={{ minWidth: '80px', maxWidth: '200px' }}
            >
              {`${asset.percentage}%`}
            </p>
            <p
              className={`m-0 p-0 text-end w-100 ${
                asset.change24h > 0 ? 'text-success' : 'text-danger'
              }`}
              style={{ minWidth: '40px', maxWidth: '100px' }}
            >
              {`${asset.change24h}%`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsCard;
