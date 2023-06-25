'use client';
import { FC, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { NetworkCard } from '@components';
import { useActiveChainIdContext } from '@contexts';
import type { BlockchainBalancesType, SparklineSumsType } from '@types';

interface INetworkListsProps {
  chainBalancePercentages: { [chainId: number]: number };
  chainSparklineSums: SparklineSumsType;
  blockchainBalances: BlockchainBalancesType;
}

const NetworkLists: FC<INetworkListsProps> = ({
  chainBalancePercentages,
  chainSparklineSums,
  blockchainBalances,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
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
    <div className="w-100" ref={dragRef}>
      <motion.div
        drag="x"
        dragConstraints={dragRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
        className="d-flex py-5 gap-3 overflow-x-visible w-fit"
        style={{ margin: '-18px 0px', width: 'fit-content', cursor: 'grab' }}
      >
        {sortedEntries.map((entries) => (
          <NetworkCard
            key={entries[0]}
            chainId={Number(entries[0])}
            isSelected={activeChainId === Number(entries[0])}
            value={blockchainBalances[Number(entries[0])].totalValue}
            percentage={chainBalancePercentages[Number(entries[0])]}
            sparkline={chainSparklineSums[Number(entries[0])]}
            onClick={() =>
              dispatch({
                type: 'SET_ACTIVE_CHAIN_ID',
                payload: Number(entries[0]),
              })
            }
          />
        ))}
      </motion.div>
    </div>
  );
};

export default NetworkLists;
