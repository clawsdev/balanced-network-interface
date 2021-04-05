import React from 'react';

import BigNumber from 'bignumber.js';
import { convertLoopToIcx } from 'packages/icon-react/utils';
import { useDispatch, useSelector } from 'react-redux';

import bnJs from 'bnJs';
import { useRatioValue } from 'store/ratio/hooks';
import { useAllTransactions } from 'store/transactions/hooks';

import { AppState } from '../index';
import { adjust, cancel, changeBalance, changeDepositedAmount, type, Field } from './actions';

export function useChangeDepositedAmount(): (depositedAmount: BigNumber) => void {
  const dispatch = useDispatch();

  return React.useCallback(
    (depositedAmount: BigNumber) => {
      dispatch(changeDepositedAmount({ depositedAmount }));
    },
    [dispatch],
  );
}

export function useChangeBalance(): (balance: BigNumber) => void {
  const dispatch = useDispatch();

  return React.useCallback(
    (balance: BigNumber) => {
      dispatch(changeBalance({ balance }));
    },
    [dispatch],
  );
}

export function useAvailableAmount() {
  const ICXAmount = useSelector((state: AppState) => state.collateral.balance);
  return ICXAmount;
}

export function useFetchCollateralInfo(account?: string | null) {
  const changeStakedICXAmount = useChangeDepositedAmount();
  const changeUnStackedICXAmount = useChangeBalance();
  const transactions = useAllTransactions();

  const fetchCollateralInfo = React.useCallback(
    (account: string) => {
      Promise.all([
        bnJs.Loans.eject({ account }).getAccountPositions(),
        bnJs.contractSettings.provider.getBalance(account).execute(),
      ]).then(([stakedICXResult, balance]: Array<any>) => {
        const stakedICXVal = stakedICXResult['assets']
          ? convertLoopToIcx(new BigNumber(parseInt(stakedICXResult['assets']['sICX'], 16)))
          : new BigNumber(0);
        const unStakedVal = convertLoopToIcx(balance);

        changeStakedICXAmount(stakedICXVal);
        changeUnStackedICXAmount(unStakedVal);
      });
    },
    [changeUnStackedICXAmount, changeStakedICXAmount],
  );

  React.useEffect(() => {
    if (account) {
      fetchCollateralInfo(account);
    }
  }, [fetchCollateralInfo, account, transactions]);
}

export function useCollateralState() {
  const state = useSelector((state: AppState) => state.collateral.state);
  return state;
}

export function useCollateralType(): (payload: {
  independentField?: Field;
  typedValue?: string;
  inputType?: 'slider' | 'text';
}) => void {
  const dispatch = useDispatch();

  return React.useCallback(
    payload => {
      dispatch(type(payload));
    },
    [dispatch],
  );
}

export function useCollateralAdjust(): (isAdjust: boolean) => void {
  const dispatch = useDispatch();

  return React.useCallback(
    isAdjust => {
      if (isAdjust) {
        dispatch(adjust());
      } else {
        dispatch(cancel());
      }
    },
    [dispatch],
  );
}

export function useDepositedAmount() {
  const sICXAmount = useSelector((state: AppState) => state.collateral.depositedAmount);
  return sICXAmount;
}

export function useDepositedAmountInICX() {
  const sICXAmount = useDepositedAmount();

  const ratio = useRatioValue();

  return React.useMemo(() => {
    return sICXAmount.multipliedBy(ratio.sICXICXratio);
  }, [sICXAmount, ratio.sICXICXratio]);
}

export function useTotalICXAmount() {
  const ICXAmount = useAvailableAmount();

  const stakedICXAmount = useDepositedAmountInICX();

  return React.useMemo(() => {
    const totalICXAmount = stakedICXAmount.plus(ICXAmount);
    return totalICXAmount;
  }, [stakedICXAmount, ICXAmount]);
}

export function useCollateralInputAmount() {
  const { independentField, typedValue } = useCollateralState();
  const dependentField: Field = independentField === Field.LEFT ? Field.RIGHT : Field.LEFT;

  const totalICXAmount = useTotalICXAmount();

  //  calculate dependentField value
  const parsedAmount = {
    [independentField]: new BigNumber(typedValue || '0'),
    [dependentField]: totalICXAmount.minus(new BigNumber(typedValue || '0')),
  };

  return parsedAmount[Field.LEFT];
}

export function useCollateralInputAmountInUSD() {
  const collateralInputAmount = useCollateralInputAmount();
  const ratio = useRatioValue();

  return React.useMemo(() => {
    return collateralInputAmount.multipliedBy(ratio.ICXUSDratio);
  }, [collateralInputAmount, ratio.ICXUSDratio]);
}
