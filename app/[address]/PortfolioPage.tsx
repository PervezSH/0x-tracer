import { FC } from 'react';

import { Profile, Search, Hero, NetworkCard } from '@components';
import { chainIds } from '@utils';

interface PortfolioPageProps {
  address: string;
}

const PortfolioPage: FC<PortfolioPageProps> = ({ address }) => {
  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3">
      <Hero />
      <Search />
      <Profile address={address} />
      <div className="d-flex mt-4 gap-3 overflow-x-scroll">
        {chainIds.map((chainId) => (
          <NetworkCard key={chainId} chainId={chainId} />
        ))}
      </div>
    </main>
  );
};

export default PortfolioPage;
