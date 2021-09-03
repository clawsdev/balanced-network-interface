export interface PairInfo {
  readonly chainId: number;
  readonly id: number;
  readonly name: string;
  readonly baseCurrencyKey: string;
  readonly quoteCurrencyKey: string;
  readonly rewards?: number;
}

// this information contains the pairs the balanced supports
// eventually this information will saved in json file.

export const SUPPORTED_PAIRS_INFO: PairInfo[] = [
  // Mainnet
  {
    chainId: 1,
    id: 1,
    name: 'sICX/ICX',
    baseCurrencyKey: 'sICX',
    quoteCurrencyKey: 'ICX',
    rewards: 0.1,
  },
  {
    chainId: 1,
    id: 2,
    name: 'sICX/bnUSD',
    baseCurrencyKey: 'sICX',
    quoteCurrencyKey: 'bnUSD',
    rewards: 0.175,
  },
  {
    chainId: 1,
    id: 3,
    name: 'BALN/bnUSD',
    baseCurrencyKey: 'BALN',
    quoteCurrencyKey: 'bnUSD',
    rewards: 0.175,
  },
  {
    chainId: 1,
    id: 4,
    name: 'BALN/sICX',
    baseCurrencyKey: 'BALN',
    quoteCurrencyKey: 'sICX',
    rewards: 0.05,
  },
  {
    chainId: 1, //
    id: 5,
    name: 'IUSDC/bnUSD',
    baseCurrencyKey: 'IUSDC',
    quoteCurrencyKey: 'bnUSD',
  },
  {
    chainId: 1,
    id: 7,
    name: 'OMM/sICX',
    baseCurrencyKey: 'OMM',
    quoteCurrencyKey: 'sICX',
  },
  {
    chainId: 1,
    id: 6,
    name: 'OMM/IUSDC',
    baseCurrencyKey: 'OMM',
    quoteCurrencyKey: 'IUSDC',
  },
  {
    chainId: 1,
    id: 8,
    name: 'OMM/USDS',
    baseCurrencyKey: 'OMM',
    quoteCurrencyKey: 'USDS',
  },
  // YEOUIDO
  {
    chainId: 3,
    id: 1,
    name: 'sICX/ICX',
    baseCurrencyKey: 'sICX',
    quoteCurrencyKey: 'ICX',
    rewards: 0.1,
  },
  {
    chainId: 3,
    id: 2,
    name: 'sICX/bnUSD',
    baseCurrencyKey: 'sICX',
    quoteCurrencyKey: 'bnUSD',
    rewards: 0.175,
  },
  {
    chainId: 3,
    id: 3,
    name: 'BALN/bnUSD',
    baseCurrencyKey: 'BALN',
    quoteCurrencyKey: 'bnUSD',
    rewards: 0.175,
  },
  {
    chainId: 3,
    id: 4,
    name: 'BALN/sICX',
    baseCurrencyKey: 'BALN',
    quoteCurrencyKey: 'sICX',
    rewards: 0.05,
  },
  {
    chainId: 3,
    id: 22,
    name: 'OMM/IUSDC',
    baseCurrencyKey: 'OMM',
    quoteCurrencyKey: 'IUSDC',
  },
  {
    chainId: 3,
    id: 20,
    name: 'OMM/sICX',
    baseCurrencyKey: 'OMM',
    quoteCurrencyKey: 'sICX',
  },
  {
    chainId: 3,
    id: 21,
    name: 'OMM/USDS',
    baseCurrencyKey: 'OMM',
    quoteCurrencyKey: 'USDS',
  },
];
