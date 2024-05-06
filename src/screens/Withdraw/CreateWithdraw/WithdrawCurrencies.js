import config from '../../../../config';
import {getWithdrawalCurrencies} from '../../../features/slices/getCurrencies/getWithdrawalCurrencies';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';

export const SetCurrencies = (
  selectedPayment,
  dispatch,
  colors,
  setSelectedCurrency,
  setCheckAuth,
  setCheckValidity,
  isConnected,
  token,
  currency,
  trans,
  payment_method_withdraw
) => {
  let data = {};
  if (selectedPayment && isConnected) {
    if (
      selectedPayment?.payment_method?.toString() === payment_method_withdraw?.Paypal?.toString() ||
      selectedPayment?.payment_method?.toString() === payment_method_withdraw?.Bank?.toString()
    ) {
      data = {
        payment_method: selectedPayment?.payment_method,
      };
    } else if (selectedPayment?.payment_method?.toString() === payment_method_withdraw?.Crypto?.toString()) {
      data = {
        payment_method: selectedPayment?.payment_method,
        currency_id: selectedPayment?.currency?.id,
      };
    }
    if (Object.keys(data).length > 0) {
      GetCurrencies(
        data,
        dispatch,
        colors,
        setSelectedCurrency,
        setCheckAuth,
        setCheckValidity,
        token,
        currency,
        trans,
      );
    }
  }
};

export async function GetCurrencies(
  data,
  dispatch,
  colors,
  setSelectedCurrency,
  setCheckAuth,
  setCheckValidity,
  token,
  currency,
  trans,
) {
  const URL = `${config.BASE_URL_VERSION}/withdrawal/get-currencies`;
  const currenciesData = await dispatch(
    getWithdrawalCurrencies({URL, data, token, method: 'POST'}),
  );
  const {
    records,
    status: {code},
  } = currenciesData?.payload?.response;

  const defaultCurrency = currenciesData.payload.response.records.find(
    currency => currency.default_wallet === 'Yes',
  );
  const activeCurrency =
    currency &&
    currenciesData.payload.response.records.find(c => c.id == currency.id);
  if (activeCurrency) {
    setSelectedCurrency(activeCurrency);
  } else {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    } else {
      setSelectedCurrency(currenciesData.payload.response.records[0]);
    }
  }
  switch (code) {
    case 400:
      return setCheckAuth(true), setCheckValidity(false);
    case 403:
      return setCheckValidity(true), setCheckAuth(false);
    case 200:
      return (
        setCheckAuth(true),
        setCheckValidity(true),
        records?.length < 0
          ? handleToaster(trans('Sorry! No currency available'), 'warning', colors)
          : null
      );
  }
}
