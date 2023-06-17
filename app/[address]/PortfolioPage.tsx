import { FC } from 'react';

import { Profile, Search, Hero, NetworkLists, OverviewCard } from '@components';

interface PortfolioPageProps {
  address: string;
}

const PortfolioPage: FC<PortfolioPageProps> = ({ address }) => {
  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3 ">
      <Hero />
      <Search />
      <Profile address={address} />
      <NetworkLists />
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <OverviewCard />
      </div>
    </main>
  );
};

export default PortfolioPage;
