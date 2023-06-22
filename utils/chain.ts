export const chainIds = [1, 137, 56, 43114, 250, 10, 42161];

export const ankrBlockchainToId: {
  [blockchain: string]: number;
} = {
  eth: 1,
  polygon: 137,
  bsc: 56,
  avalanche: 43114,
  fantom: 250,
  optimism: 10,
  arbitrum: 42161,
  polygon_zkevm: 1101,
};

export const coinGeckoPlatforms = [
  'ethereum',
  'polygon-pos',
  'binance-smart-chain',
  'avalanche',
  'fantom',
  'optimistic-ethereum',
  'arbitrum-one',
  'polygon-zkevm',
];

export const coinGeckoNativeIds: {
  [id: number]: string;
} = {
  1: 'ethereum',
  137: 'matic-network',
  56: 'binancecoin',
  43114: 'avalanche-2',
  250: 'fantom',
  10: 'ethereum',
  42161: 'ethereum',
  1101: 'ethereum',
};

export const coinGeckoPlatformToId: {
  [platform: string]: number;
} = {
  ethereum: 1,
  'polygon-pos': 137,
  'binance-smart-chain': 56,
  avalanche: 43114,
  fantom: 250,
  'optimistic-ethereum': 10,
  'arbitrum-one': 42161,
  'polygon-zkevm': 1101,
};

export interface IChainDetail {
  name: string;
  symbol: string;
  logoPath: string;
  themeBg: string;
}

export const chainDetails: {
  [chainId: number]: IChainDetail;
} = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
    logoPath: 'assets/logos/ethereum.svg',
    themeBg: 'rgba(81, 123, 231, 0.25)',
  },
  137: {
    name: 'Polygon',
    symbol: 'MATIC',
    logoPath: 'assets/logos/polygon.svg',
    themeBg: 'rgba(121, 80, 221, 0.25)',
  },
  56: {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    logoPath: 'assets/logos/binance.svg',
    themeBg: 'rgba(239, 185, 11, 0.25)',
  },
  43114: {
    name: 'Avalanche',
    symbol: 'AVAX',
    logoPath: 'assets/logos/avalanche.svg',
    themeBg: 'rgba(232, 65, 66, 0.25)',
  },
  250: {
    name: 'Fantom',
    symbol: 'FTM',
    logoPath: 'assets/logos/fantom.svg',
    themeBg: 'rgba(3, 98, 249, 0.25)',
  },
  10: {
    name: 'Optimism',
    symbol: 'ETH',
    logoPath: 'assets/logos/optimism.svg',
    themeBg: 'rgba(254, 5, 33, 0.25)',
  },
  42161: {
    name: 'Arbitrum',
    symbol: 'ETH',
    logoPath: 'assets/logos/arbitrum.svg',
    themeBg: 'rgba(18, 170, 255, 0.25)',
  },
  324: {
    name: 'zkSync Era',
    symbol: 'ETH',
    logoPath: 'assets/logos/zksync.svg',
    themeBg: 'rgba(140, 141, 252, 0.25)',
  },
  1101: {
    name: 'Polygon ZK-EVM',
    symbol: 'ETH',
    logoPath: 'assets/logos/polygon.svg',
    themeBg: 'rgba(121, 80, 221, 0.25)',
  },
};
