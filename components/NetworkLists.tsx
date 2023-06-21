'use client';
import { FC, useEffect } from 'react';

import { useHorizontalScroll } from '@hooks';
import { NetworkCard } from '@components';
import { useActiveChainIdContext } from '@contexts';
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
  const { activeChainId, dispatch } = useActiveChainIdContext();

  const sortedEntries = Object.entries(chainBalancePercentages).sort(
    (a, b) => b[1] - a[1]
  );

  useEffect(() => {
    if (sortedEntries.length > 0)
      dispatch({
        type: 'SET_ACTIVE_CHAIN_ID',
        payload: Number(sortedEntries[0][0]),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          isSelected={activeChainId === Number(entries[0])}
          value={balances.blockchainBalances[Number(entries[0])].totalValue}
          percentage={chainBalancePercentages[Number(entries[0])]}
          onClick={() =>
            dispatch({
              type: 'SET_ACTIVE_CHAIN_ID',
              payload: Number(entries[0]),
            })
          }
        />
      ))}
    </div>
  );
};

export default NetworkLists;
