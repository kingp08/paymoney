import {depositMoneyCurrencies} from '../../../features/slices/getCurrencies/getDepositMoneyCurrencies';
import {getAllPreference} from '../../../features/slices/preferenceSlice/preferenceSlice';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';

export async function checkDeposit(
  dispatch,
  token,
  setDepositInfo,
  depositInfo,
  currency,
  setCheckAuth,
  setCheckValidity,
  colors,
  trans,
  isConnected,
) {
  let isMounted = true;
  if (isMounted && isConnected) {
    const data = await dispatch(depositMoneyCurrencies({token}));
    dispatch(getAllPreference({token}));
    const {
      records,
      status: {code},
    } = data?.payload?.response;
    if (records?.currencies?.length > 0) {
      if (currency) {
        setDepositInfo({
          ...depositInfo,
          currency: currency,
        });
      } else {
        checkDefaults(
          data.payload.response.records,
          setDepositInfo,
          depositInfo,
        );
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

const checkDefaults = (data, setDepositInfo, depositInfo) => {
  if (data?.currencies?.length > 0) {
    const exist = data?.currencies.find(
      currency => currency?.id == data?.default,
    );
    if (exist) {
      setDepositInfo({
        ...depositInfo,
        currency: exist,
      });
    } else {
      setDepositInfo({
        ...depositInfo,
        currency: data.currencies[0],
      });
    }
  }
};
