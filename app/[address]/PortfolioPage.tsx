import { FC } from 'react';

import { Profile, Search, Hero, NetworkCard } from '@components';

interface PortfolioPageProps {
  address: string;
}

const PortfolioPage: FC<PortfolioPageProps> = ({ address }) => {
  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3">
      <Hero />
      <Search />
      <Profile address={address} />
      <NetworkCard />
    </main>
  );
};

export default PortfolioPage;
