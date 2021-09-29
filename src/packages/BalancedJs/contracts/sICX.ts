import BigNumber from 'bignumber.js';
import { IconConverter } from 'icon-sdk-js';

import addresses from '../addresses';
import ContractSettings from '../contractSettings';
import IRC2 from './IRC2';

export default class sICX extends IRC2 {
  constructor(contractSettings: ContractSettings) {
    super(contractSettings);
    this.address = addresses[this.nid].sicx;
  }

  depositAndBorrow(value: BigNumber) {
    const data = { _asset: '', _amount: 0 };
    return this.transfer(addresses[this.nid].loans, value, JSON.stringify(data));
  }

  swap(value: BigNumber, outputSymbol: string, minimumReceive: BigNumber) {
    const data = {
      method: '_swap',
      params: { toToken: addresses[this.nid][outputSymbol.toLowerCase()], minimumReceive: minimumReceive.toFixed() },
    };

    return this.transfer(addresses[this.nid].dex, value, JSON.stringify(data));
  }

  swapToICX(value: BigNumber) {
    const data = { method: '_swap_icx' };

    return this.transfer(addresses[this.nid].dex, value, JSON.stringify(data));
  }

  transfer(to: string, value: BigNumber, data?: string) {
    const callParams = this.transactionParamsBuilder({
      method: 'transfer',
      params: {
        _to: to,
        _value: IconConverter.toHex(value),
        _data: data && IconConverter.toHex(data),
      },
    });

    return this.callICONPlugins(callParams);
  }

  unstake(value: BigNumber) {
    return this.transfer(
      addresses[this.nid].staking,
      IconConverter.toHex(value),
      JSON.stringify({ method: 'unstake' }),
    );
  }
}
