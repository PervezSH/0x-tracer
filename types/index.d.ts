export interface ITokenBalanceInfo {
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

interface ITokenMarketData {
  price: number;
  logoPath: string;
  change24h: number;
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
