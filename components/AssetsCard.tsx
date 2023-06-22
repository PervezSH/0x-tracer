'use client';
import { FC } from 'react';

import { formatCurrencyValue } from '@utils';
import type { BlockchainBalancesType } from '@types';
import { useActiveChainIdContext } from '@contexts';

const AssetsCard: FC<{
  blockchainBalances: BlockchainBalancesType;
}> = ({ blockchainBalances }) => {
  const { activeChainId } = useActiveChainIdContext();

  return (
    <div className="d-flex flex-column shadow p-4 gap-3 border-0 rounded-5 m-0 mt-2 w-100">
      <h5 className="m-0 fw-semibold">Assets</h5>
      <div className="d-flex flex-column gap-3 overflow-y-hidden overflow-x-scroll">
        <div className="d-flex mt-2 gap-1 w-100">
          <h6
            className="fw-bold text-secondary m-0 p-0 w-100"
            style={{ fontSize: '12px', minWidth: '160px', maxWidth: '300px' }}
          >
            Name
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '12px', minWidth: '80px', maxWidth: '200px' }}
          >
            Price
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '12px', minWidth: '80px', maxWidth: '200px' }}
          >
            Holdings
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '12px', minWidth: '80px', maxWidth: '200px' }}
          >
            Value
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '12px', minWidth: '80px', maxWidth: '200px' }}
          >
            Percentage
          </h6>
          <h6
            className="fw-bold text-secondary m-0 p-0 text-end w-100"
            style={{ fontSize: '12px', minWidth: '56px', maxWidth: '100px' }}
          >
            24h
          </h6>
        </div>
        {blockchainBalances[activeChainId] &&
          blockchainBalances[activeChainId].tokenBalances.map(
            (token, index) => {
              return (
                <div
                  key={`${index}-${token.name}`}
                  className="d-flex gap-1 w-100 align-items-center"
                >
                  <div
                    className="d-flex w-100 align-items-center gap-2 text-nowrap"
                    style={{ minWidth: '160px', maxWidth: '300px' }}
                  >
                    {/* <Image
                    className="object-fit-cover"
                    src={token.logoPath}
                    alt={`${token.name}-logo`}
                    width={24}
                    height={24}
                  /> */}
                    <p
                      className="fw-semibold text-primary m-0 p-0 text-truncate"
                      style={{ fontSize: '14px' }}
                    >
                      {token.name}
                    </p>
                    <span
                      className="fw-semibold text-secondary"
                      style={{ fontSize: '12px' }}
                    >
                      {token.symbol}
                    </span>
                  </div>
                  <p
                    className="fw-semibold text-primary m-0 p-0 text-end w-100 text-truncate"
                    style={{
                      fontSize: '14px',
                      minWidth: '80px',
                      maxWidth: '200px',
                    }}
                  >
                    {formatCurrencyValue(token.price, 2)}
                  </p>
                  <p
                    className="fw-semibold text-primary m-0 p-0 text-end w-100 text-truncate"
                    style={{
                      fontSize: '14px',
                      minWidth: '80px',
                      maxWidth: '200px',
                    }}
                  >
                    {formatCurrencyValue(token.holdings, 2, false, '')}
                    <span
                      className="text-primary ms-1"
                      style={{ fontSize: '12px' }}
                    >
                      {token.symbol}
                    </span>
                  </p>
                  <p
                    className="fw-semibold text-primary m-0 p-0 text-end w-100 text-truncate"
                    style={{
                      fontSize: '14px',
                      minWidth: '80px',
                      maxWidth: '200px',
                    }}
                  >
                    {formatCurrencyValue(token.value, 2)}
                  </p>
                  <div
                    className="d-flex w-100 justify-content-end position-relative"
                    style={{ minWidth: '80px', maxWidth: '200px' }}
                  >
                    <p
                      className="fw-semibold text-primary m-0 p-0 text-end z-1"
                      style={{ fontSize: '14px' }}
                    >
                      {`${token.percentage.toFixed(2)}%`}
                    </p>
                    <div
                      className="h-100 rounded-3 position-absolute bg-success opacity-50 z-0"
                      style={{ width: `${token.percentage}%` }}
                    ></div>
                  </div>
                  <p
                    className={`fw-semibold m-0 p-0 text-end w-100 ${
                      token.change24h! > 0 ? 'text-success' : 'text-danger'
                    }`}
                    style={{
                      fontSize: '14px',
                      minWidth: '56px',
                      maxWidth: '100px',
                    }}
                  >
                    {`${token.change24h}%`}
                  </p>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default AssetsCard;
