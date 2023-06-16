'use client';
import { FC } from 'react';

import { useHorizontalScroll } from '@hooks';
import { chainIds } from '@utils';
import { NetworkCard } from '@components';

const NetworkLists: FC = () => {
  const scrollRef = useHorizontalScroll();

  const selectedChainId = chainIds[0];

  return (
    <div
      ref={scrollRef}
      className="d-flex py-5 gap-3 overflow-x-auto scrollbar-none"
      style={{ margin: '-18px 0px' }}
    >
      {chainIds.map((chainId) => (
        <NetworkCard
          key={chainId}
          chainId={chainId}
          isSelected={selectedChainId === chainId}
        />
      ))}
    </div>
  );
};

export default NetworkLists;
