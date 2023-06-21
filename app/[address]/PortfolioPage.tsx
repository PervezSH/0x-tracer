import { FC } from 'react';

import {
  Profile,
  Search,
  Hero,
  NetworkLists,
  OverviewCard,
  PerformanceCard,
  AssetsCard,
} from '@components';
import { ankrBlockchainToId } from '@utils';

interface ITokenBalanceInfo {
  name: string;
  symbol: string;
  address: string | 'NATIVE';
  price: number;
  holdings: number;
  value: number;
  percentage: number;
  change24h: number | null;
  logoPath: string;
}

type IBlockchainBalances = {
  [chainId: number]: { totalValue: number; tokenBalances: ITokenBalanceInfo[] };
};

const getAddressBalances = async (
  address: string
): Promise<{
  totalValue: number;
  blockchainBalances: IBlockchainBalances;
}> => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'ankr_getAccountBalance',
        params: {
          nativeFirst: true,
          onlyWhitelisted: true,
          walletAddress: `${address}`,
        },
        id: 1,
      }),
    };
    const res = await fetch(
      `https://rpc.ankr.com/multichain/${process.env.ANKR_ENDPOINT_KEY}/?ankr_getAccountBalance=`,
      options
    );
    const data = await res.json();
    if (!data) throw new Error('No data returned from Ankr API');

    const totalValue = data.result.totalBalanceUsd as number;
    const blockchainBalances: IBlockchainBalances = data.result.assets.reduce(
      (acc: IBlockchainBalances, asset: any) => {
        const chainId = ankrBlockchainToId[asset.blockchain];
        if (!acc[chainId]) {
          acc[chainId] = {
            totalValue: 0,
            tokenBalances: [],
          };
        }
        acc[chainId].totalValue += parseFloat(asset.balanceUsd);
        acc[chainId].tokenBalances.push({
          name: asset.tokenName,
          symbol: asset.tokenSymbol,
          address: asset.contractAddress ? asset.contractAddress : 'NATIVE',
          price: asset.tokenPrice,
          holdings: asset.balance,
          value: asset.balanceUsd,
          percentage: 0,
          change24h: null,
          logoPath: asset.thumbnail,
        });
        acc[chainId].tokenBalances.sort(
          (a: ITokenBalanceInfo, b: ITokenBalanceInfo) => b.value - a.value
        );
        return acc;
      },
      {}
    );
    for (let chainId in blockchainBalances) {
      blockchainBalances[chainId].tokenBalances = blockchainBalances[
        chainId
      ].tokenBalances.map((tokenBalance) => ({
        ...tokenBalance,
        percentage:
          (tokenBalance.value / blockchainBalances[chainId].totalValue) * 100,
      }));
    }
    return {
      totalValue,
      blockchainBalances,
    };
  } catch (err) {
    console.error(err);
    return {
      totalValue: 0,
      blockchainBalances: {},
    };
  }
};

interface PortfolioPageProps {
  address: string;
}

const PortfolioPage: FC<PortfolioPageProps> = async ({ address }) => {
  const balance = await getAddressBalances(address);

  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3 ">
      <Hero />
      <Search />
      <Profile address={address} />
      <NetworkLists />
      <div className="d-flex flex-column gap-4 flex-lg-row align-items-center justify-content-between">
        <OverviewCard />
        <PerformanceCard />
      </div>
      <AssetsCard />
    </main>
  );
};

export default PortfolioPage;
