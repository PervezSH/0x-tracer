'use client';
import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { OverviewChart } from '@components';

import { useActiveChainIdContext } from '@contexts';
import { chainDetails, formatCurrencyValue } from '@utils';
import type { BlockchainBalancesType, ITokenBalanceInfo } from '@types';

interface IOverviewCardProps {
  address: string;
  blockchainBalances: BlockchainBalancesType;
}

const OverviewCard: FC<IOverviewCardProps> = ({
  address,
  blockchainBalances,
}) => {
  const { activeChainId } = useActiveChainIdContext();
  const [pieChartData, setPieChartData] = useState<
    {
      id: number;
      symbol: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const transformData = (tokenBalances: ITokenBalanceInfo[]) => {
      const processedData: {
        id: number;
        symbol: string;
        value: number;
      }[] = [];
      const totalValue = blockchainBalances[activeChainId].totalValue;

      if (tokenBalances.length < 5) {
        tokenBalances.forEach((token, index) => {
          processedData.push({
            id: index,
            symbol: token.symbol,
            value: (token.value / totalValue) * 100,
          });
        });
        return processedData;
      }

      let remainingPercentage = 100;
      const topTokens = tokenBalances.slice(0, 4);
      topTokens.forEach((token, index) => {
        processedData.push({
          id: index,
          symbol: token.symbol,
          value: (token.value / totalValue) * 100,
        });

        remainingPercentage -= (token.value / totalValue) * 100;
      });
      processedData.push({
        id: 4,
        symbol: 'OTHERS',
        value: remainingPercentage,
      });
      return processedData;
    };
    if (
      blockchainBalances[activeChainId] &&
      blockchainBalances[activeChainId].tokenBalances.length > 0
    ) {
      setPieChartData(
        transformData(blockchainBalances[activeChainId].tokenBalances)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChainId]);

  return (
    <div className="card m-0 p-4 gap-4 border-0 rounded-5 shadow">
      <div className="card-body p-0 m-0">
        <div className="d-flex justify-content-between">
          <p className="card-text fs-5 fw-semibold p-0 m-0">Overview</p>
          <Image
            src="assets/icons/open.svg"
            alt="open-icon"
            width={24}
            height={24}
            style={{ cursor: 'pointer' }}
            onClick={() =>
              window.open(
                `${chainDetails[activeChainId].explorerURL}/address/${address}`
              )
            }
          />
        </div>
        <h4 className="card-title m-0 pt-1 fw-bold">
          <span className="fs-5">$</span>
          {blockchainBalances[activeChainId] &&
            formatCurrencyValue(
              blockchainBalances[activeChainId].totalValue,
              2,
              false,
              '',
              10000000000,
              2
            )}
        </h4>
      </div>
      <div className="d-flex justify-content-center align-items-center px-4 px-lg-5">
        <div className="d-flex position-relative">
          <OverviewChart pieChartData={pieChartData} />
          <div
            className="m-3 me-0 rounded-4 overflow-hidden bg-primary position-absolute"
            style={{
              width: '50px',
              height: '50px',
              bottom: '0',
              right: '0',
            }}
          >
            <Image
              src={chainDetails[activeChainId].logoPath}
              alt={'netowrk-logo'}
              width={40}
              height={40}
              style={{
                objectFit: 'cover',
                transform: 'translate(15px, 12.5px)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
