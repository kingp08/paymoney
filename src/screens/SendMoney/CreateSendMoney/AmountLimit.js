import config from '../../../../config';
import {postInfo} from '../../../features/auth/login/loginApi';

export async function checkAmount(
  amount,
  isConnected,
  setAmountLoader,
  setError,
  error,
  setSendMoney,
  sendMoney,
  token,
  trans,
) {
  if (amount > 0 && isConnected) {
    setAmountLoader(true);
    setError({...error, amount: false});
    const URL = `${config.BASE_URL_VERSION}/send-money/check-amount-limit`;
    const data = {
      send_currency: sendMoney.currency.id,
      send_amount: amount,
    };
    const res = await postInfo(data, URL, token, 'POST');
    const {records, status} = res.response;
    handleAmount(
      records,
      status,
      setAmountLoader,
      setError,
      error,
      setSendMoney,
      sendMoney,
      trans,
    );
  }
}

const handleAmount = (
  records,
  status,
  setAmountLoader,
  setError,
  error,
  setSendMoney,
  sendMoney,
  trans,
) => {
  if (status.code != 200) {
    setAmountLoader(false);
    if (Array.isArray(records) && records.length > 0) {
      setError({...error, checkAmount: records?.message});
    } else if (!Array.isArray(records)) {
      setError({...error, checkAmount: Object.values(records)[0][0]});
    } else {
      if (
        status.message.includes('Maximum') ||
        status.message.includes('Minimum')
      ) {
        const amount = status.message.split(' ').pop();
        const lastIndex = status.message.lastIndexOf(' ');
        const errorText = status.message.substring(0, lastIndex);
        setError({...error, checkAmount: trans(errorText) + ` ${amount}`});
      } else {
        if(status.code===400){
          setError({...error, checkAmount: trans('Your account has been suspended!')});
        }
        else if(status.code===403){
          setError({...error, checkAmount: trans('You are not permitted for this transaction!')});
        }
        else{
          setError({...error, checkAmount: trans(status?.message)});
        }
      }
    }
  } else {
    setAmountLoader(false);
    setError({...error, checkAmount: '', amount: false});
    const {
      totalFees,
      feesPercentage,
      formattedAmount,
      formattedTotalFees,
      formattedTotalAmount,
      formattedFeesPercentage,
      formattedFeesFixed,
      amount,
    } = records;
    setSendMoney({
      ...sendMoney,
      totalFees: formattedTotalFees,
      feesFixed: formattedFeesFixed,
      feesPercentage: formattedFeesPercentage,
      calTotalFees: totalFees,
      calFeesPercent: feesPercentage,
      sendAmountDisplay: formattedAmount,
      totalAmountDisplay: formattedTotalAmount,
      sendAmount: amount,
    });
  }
};
