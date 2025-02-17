import { CurrencyAmount, Token } from '@balancednetwork/sdk-core';
import { useIconReact } from 'packages/icon-react';
import { useDispatch, useSelector } from 'react-redux';

import bnJs from 'bnJs';
import { SUPPORTED_TOKENS_MAP_BY_ADDRESS } from 'constants/tokens';
import useInterval from 'hooks/useInterval';
import { AppState } from 'store';

import { setFees } from './actions';

export function useUnclaimedFees(): { [key: string]: CurrencyAmount<Token> } {
  return useSelector((state: AppState) => state.fees.fees);
}

export function useFetchUnclaimedDividends(): void {
  const dispatch = useDispatch();
  const { account } = useIconReact();

  useInterval(async () => {
    if (account) {
      const data = await bnJs.Dividends.getUnclaimedDividends(account);
      const fees: { [address in string]: CurrencyAmount<Token> } = Object.keys(data).reduce((prev, address) => {
        const currency = SUPPORTED_TOKENS_MAP_BY_ADDRESS[address];
        prev[address] = CurrencyAmount.fromRawAmount(currency, data[address]);
        return prev;
      }, {});

      dispatch(setFees({ fees }));
    }
  }, 5000);
}
