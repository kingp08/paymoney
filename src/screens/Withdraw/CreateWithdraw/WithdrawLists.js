import {getAllPreference} from '../../../features/slices/preferenceSlice/preferenceSlice';
import {getAllWithdrawSettingsLists} from '../../../features/slices/WithdrawLists/getWithdrawSettingsLists';
import {SetCurrencies} from './WithdrawCurrencies';

export async function checkWithdraw(
  dispatch,
  setSelectedMethod,
  setSelectedCurrency,
  setCheckAuth,
  setCheckValidity,
  token,
  isConnected,
  currency,
  colors,
  URL,
  trans,
) {
  let isMounted = true;
  if (isMounted && isConnected) {
    const data = await dispatch(getAllWithdrawSettingsLists({token, URL}));
    dispatch(getAllPreference({token}));
    const {
      records,
      status: {code},
    } = data?.payload?.response;
    if (records.length > 0) {
      setSelectedMethod(data.payload.response.records[0]);
      SetCurrencies(
        data.payload.response.records[0],
        dispatch,
        colors,
        setSelectedCurrency,
        setCheckAuth,
        setCheckValidity,
        isConnected,
        token,
        currency,
        trans,
      );
    }
    switch (code) {
      case 400:
        return setCheckAuth(true), setCheckValidity(false);
      case 403:
        return setCheckValidity(true), setCheckAuth(false);
      case 200:
        return setCheckAuth(true), setCheckValidity(true);
    }
  }
  return () => {
    isMounted = false;
  };
}
