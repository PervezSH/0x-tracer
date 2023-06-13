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
};
