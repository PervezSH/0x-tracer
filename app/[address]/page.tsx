import { FC } from 'react';
import { isAddress } from 'ethers';
import { redirect } from 'next/navigation';

import PortfolioPage from './PortfolioPage';

interface Props {
  params: { address: string };
}

const Page: FC<Props> = ({ params }) => {
  if (!isAddress(params.address)) redirect('/');
  return <PortfolioPage address={params.address} />;
};

export default Page;
