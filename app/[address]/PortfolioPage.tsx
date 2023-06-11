import { FC } from 'react';

interface PortfolioPageProps {
  address: string;
}

const PortfolioPage: FC<PortfolioPageProps> = ({ address }) => {
  return <div>{address}</div>;
};

export default PortfolioPage;
