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

export type BlockchainBalancesType = {
  [chainId: number]: { totalValue: number; tokenBalances: ITokenBalanceInfo[] };
};
