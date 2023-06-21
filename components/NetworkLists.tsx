'use client';
import { FC } from 'react';

import { useHorizontalScroll } from '@hooks';
import { NetworkCard } from '@components';
import type { BlockchainBalancesType } from '@types';

interface INetworkListsProps {
  chainBalancePercentages: { [chainId: number]: number };
  balances: {
    totalValue: number;
    blockchainBalances: BlockchainBalancesType;
  };
}

const NetworkLists: FC<INetworkListsProps> = ({
  chainBalancePercentages,
  balances,
}) => {
  const scrollRef = useHorizontalScroll();

  const sortedEntries = Object.entries(chainBalancePercentages).sort(
    (a, b) => b[1] - a[1]
  );

  const selectedChainId = sortedEntries.length && sortedEntries[0][0];

  return (
    <div
      ref={scrollRef}
      className="d-flex py-5 gap-3 overflow-x-auto scrollbar-none"
      style={{ margin: '-18px 0px' }}
    >
      {sortedEntries.map((entries) => (
        <NetworkCard
          key={entries[0]}
          chainId={Number(entries[0])}
          isSelected={selectedChainId === entries[0]}
          value={balances.blockchainBalances[Number(entries[0])].totalValue}
          percentage={chainBalancePercentages[Number(entries[0])]}
        />
      ))}
    </div>
  );
};

export default NetworkLists;
