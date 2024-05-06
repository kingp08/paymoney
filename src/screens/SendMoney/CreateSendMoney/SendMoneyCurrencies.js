import config from '../../../../config';
import {sendMoneyCurrencies} from '../../../features/slices/getCurrencies/getSendMoneyCurrencies';
import {checkProcessedPreference} from '../../../features/slices/preferenceSlice/preferenceForProcessedType/preferenceForProcessedType';
import {getAllPreference} from '../../../features/slices/preferenceSlice/preferenceSlice';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';

export async function checkCurrency(
  dispatch,
  isConnected,
  token,
  setCheckAuth,
  setCheckValidity,
  colors,
) {
  let isMounted = true;
  if (isMounted && isConnected) {
    const URL = `${config.BASE_URL_VERSION}/send-money/get-currencies`;
    const data = await dispatch(sendMoneyCurrencies({token, URL}));
    dispatch(checkProcessedPreference({token}));
    dispatch(getAllPreference({token}));
    const {
      records,
      status: {code},
    } = data?.payload?.response;

    switch (code) {
      case 400:
        return setCheckAuth(true), setCheckValidity(false);
      case 403:
        return setCheckValidity(true), setCheckAuth(false);
      case 200:
        return (
          setCheckAuth(true),
          setCheckValidity(true),
          records?.currencies?.length < 0
            ? handleToaster(
                trans('Sorry! No currency available'),
                'warning',
                colors,
              )
            : null
        );
    }
  }
  return () => {
    isMounted = false;
  };
}

export const defaultCurrency = (currency, data, setSendMoney, sendMoney) => {
  const activeCurrency =
    currency && data?.currencies.find(c => c.id === currency.id);
  if (currency && activeCurrency) {
    setSendMoney({
      ...sendMoney,
      currency: currency,
    });
  } else if (data?.currencies?.length > 0) {
    const exist = data?.currencies.find(
      currency => currency.is_default === 'Yes',
    );
    if (exist) {
      setSendMoney({
        ...sendMoney,
        currency: exist,
      });
    } else {
      setSendMoney({
        ...sendMoney,
        currency: data.currencies[0],
      });
    }
  }
};
