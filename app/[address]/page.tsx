import { FC } from 'react';
import { isAddress } from 'ethers';
import { redirect } from 'next/navigation';

import PortfolioPage from './PortfolioPage';
import { ActiveChainIdContextProvider } from '@contexts';

interface Props {
  params: { address: string };
}

const Page: FC<Props> = ({ params }) => {
  if (!isAddress(params.address)) redirect('/');
  return (
    <ActiveChainIdContextProvider>
      <PortfolioPage address={params.address} />
    </ActiveChainIdContextProvider>
  );
};

export default Page;
