import { FC } from 'react';

import { Profile } from '@components';

interface PortfolioPageProps {
  address: string;
}

const PortfolioPage: FC<PortfolioPageProps> = ({ address }) => {
  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3">
      <Profile address={address} />
    </main>
  );
};

export default PortfolioPage;
