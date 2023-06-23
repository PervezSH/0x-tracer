export interface ITokenBalanceInfo {
  name: string;
  symbol: string;
  address: string | 'NATIVE';
  price: number;
  holdings: number;
  value: number;
  percentage: number;
  change24h: number;
  logoPath: string;
  price7d: number;
  sparkline: number[];
}

interface ITokenMarketData {
  price: number;
  logoPath: string;
  change24h: number;
  price7d: number;
  sparkline: number[];
}

export interface ITokensMartketData {
  [id: string]: ITokenMarketData;
}

export type BlockchainBalancesType = {
  [chainId: number]: { totalValue: number; tokenBalances: ITokenBalanceInfo[] };
};

export type CoinGeckoTokenIdsType = {
  [tokenChainAndAddress: string]: string;
};
type SparklineData = {
  timestamp: number;
  value: number;
};

export type SparklineSumsType = {
  sparkline: SparklineData[];
  [chain: number]: SparklineData[];
};
