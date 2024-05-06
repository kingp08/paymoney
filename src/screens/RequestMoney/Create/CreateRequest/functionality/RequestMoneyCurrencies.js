import {getAllCurrencies} from '../../../../../features/slices/getCurrencies/getCurrencies';
import {checkProcessedPreference} from '../../../../../features/slices/preferenceSlice/preferenceForProcessedType/preferenceForProcessedType';
import {getAllPreference} from '../../../../../features/slices/preferenceSlice/preferenceSlice';
import {handleToaster} from '../../../../../utils/CustomAlert/handleAlert';
const updateCurrency = (currency, setMoneyRequest, moneyRequest) => {
  const exist = currency?.currencies.find(
    c => c?.id === Number(currency?.defaultWallet),
  );
  setMoneyRequest({
    ...moneyRequest,
    currency: exist || currency?.currencies[0],
  });
};
export const checkCurrencies = async ({
  isConnected,
  dispatch,
  token,
  setCheckAuth,
  setCheckValidity,
  colors,
  setMoneyRequest,
  moneyRequest,
  trans,
}) => {
  let isMounted = true;
  if (isMounted && isConnected) {
    const allCurrencies = await dispatch(getAllCurrencies({token}));
    dispatch(checkProcessedPreference({token}));
    dispatch(getAllPreference({token}));
    const {
      records,
      status: {code},
    } = allCurrencies?.payload?.response;
    switch (code) {
      case 400:
        return setCheckAuth(true), setCheckValidity(false);
      case 403:
        return setCheckValidity(true), setCheckAuth(false);
      case 200:
        return (
          setCheckAuth(true),
          setCheckValidity(true),
          records?.currencies?.length > 0
            ? updateCurrency(records, setMoneyRequest, moneyRequest)
            : handleToaster(
                trans('Sorry! No currency available'),
                'warning',
                colors,
              )
        );
    }
  }
  return () => {
    isMounted = false;
  };
};

export const handleCurrency = ({
  item,
  setMoneyRequest,
  moneyRequest,
  setAmount,
}) => {
  if (item?.type === 'fiat' && moneyRequest.currency?.type === 'fiat') {
    setMoneyRequest({...moneyRequest, currency: item});
  } else if (
    item?.type === 'crypto' &&
    moneyRequest.currency?.type === 'crypto'
  ) {
    setMoneyRequest({...moneyRequest, currency: item});
  } else {
    setAmount('');
    setMoneyRequest({...moneyRequest, currency: item});
  }
};
