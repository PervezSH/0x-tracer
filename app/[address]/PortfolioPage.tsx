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
import {
  ankrBlockchainToId,
  coinGeckoPlatformToId,
  coinGeckoPlatforms,
  coinGeckoNativeIds,
} from '@utils';
import type {
  ITokenBalanceInfo,
  BlockchainBalancesType,
  CoinGeckoTokenIdsType,
  ITokensMartketData,
} from '@types';

const getTokenCoinGeckcoIds = async (): Promise<CoinGeckoTokenIdsType> => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/list?include_platform=true`,
      options
    );
    const data = await res.json();
    if (!data)
      throw new Error(
        'getTokenCoinGeckcoIds: No data returned from CoinGecko API'
      );

    let tokenIds: CoinGeckoTokenIdsType = {};
    const allowedPlatforms = new Set(coinGeckoPlatforms);
    for (let token of data) {
      for (let platform in token.platforms) {
        if (allowedPlatforms.has(platform)) {
          let tokenChainAndAddress = `${coinGeckoPlatformToId[platform]}-${token.platforms[platform]}`;
          tokenIds[tokenChainAndAddress] = token.id;
        }
      }
    }
    Object.keys(coinGeckoNativeIds).forEach((chainId) => {
      const tokenChainAndAddress = `${chainId}-NATIVE`;
      tokenIds[tokenChainAndAddress] = coinGeckoNativeIds[Number(chainId)];
    });
    return tokenIds;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const getAddressBalances = async (
  address: string
): Promise<{
  totalValue: number;
  blockchainBalances: BlockchainBalancesType;
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
    if (!data)
      throw new Error('getAddressBalances: No data returned from Ankr API');

    const totalValue = data.result.totalBalanceUsd as number;
    const blockchainBalances: BlockchainBalancesType =
      data.result.assets.reduce((acc: BlockchainBalancesType, asset: any) => {
        const chainId = ankrBlockchainToId[asset.blockchain];
        if (!acc[chainId]) {
          acc[chainId] = {
            totalValue: 0,
            tokenBalances: [],
          };
        }
        if (asset.balanceUsd <= 0.0099) return acc;
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
      }, {});
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

const getCoinGeckoTokensMarketData = async (
  coinGeckoIds: CoinGeckoTokenIdsType,
  blockchainBalances: BlockchainBalancesType
): Promise<ITokensMartketData> => {
  try {
    let tokenIds: string[] = [];
    Object.keys(blockchainBalances).forEach((chainId) => {
      blockchainBalances[Number(chainId)].tokenBalances.forEach((token) => {
        if (token.address !== 'NATIVE') {
          if (coinGeckoIds[`${chainId}-${token.address}`])
            tokenIds.push(coinGeckoIds[`${chainId}-${token.address}`]);
        } else {
          tokenIds.push(coinGeckoIds[`${chainId}-NATIVE`]);
        }
      });
    });
    let tokenIdsSet = new Set(tokenIds);
    tokenIds = Array.from(tokenIdsSet);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokenIds.join(
        ','
      )}&order=market_cap_desc&per_page=250&page=1&sparkline=true`,
      options
    );
    const data: any[] = await res.json();
    if (!data)
      throw new Error(
        'getCoinGeckoTokenMarketData: No data returned from CoinGecko API'
      );
    let tokensMarketData: ITokensMartketData = {};
    data.forEach((tokenMarketData: any) => {
      tokensMarketData[tokenMarketData.id] = {
        price: tokenMarketData.current_price,
        logoPath: tokenMarketData.image,
        change24h: tokenMarketData.price_change_percentage_24h,
        sparkline: tokenMarketData.sparkline_in_7d,
      };
    });
    return tokensMarketData;
  } catch (err) {
    console.error(err);
    return {};
  }
};

interface PortfolioPageProps {
  address: string;
}

const PortfolioPage: FC<PortfolioPageProps> = async ({ address }) => {
  const coinGeckoIdsPromise = getTokenCoinGeckcoIds();
  const balancesPromise = getAddressBalances(address);
  const [coinGeckoIds, balances] = await Promise.all([
    coinGeckoIdsPromise,
    balancesPromise,
  ]);
  const tokensMarketData = await getCoinGeckoTokensMarketData(
    coinGeckoIds,
    balances.blockchainBalances
  );

  const chainBalancePercentages = Object.keys(
    balances.blockchainBalances
  ).reduce(
    (
      accumulator: {
        [chainId: number]: number;
      },
      chainId
    ) => {
      const percentage =
        (balances.blockchainBalances[Number(chainId)].totalValue /
          balances.totalValue) *
        100;
      accumulator[Number(chainId)] = percentage;
      return accumulator;
    },
    {}
  );

  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3 ">
      <Hero />
      <Search />
      <Profile address={address} />
      <NetworkLists
        chainBalancePercentages={chainBalancePercentages}
        balances={balances}
      />
      <div className="d-flex flex-column gap-4 flex-lg-row align-items-center justify-content-between">
        <OverviewCard blockchainBalances={balances.blockchainBalances} />
        <PerformanceCard />
      </div>
      <AssetsCard blockchainBalances={balances.blockchainBalances} />
    </main>
  );
};

export default PortfolioPage;
