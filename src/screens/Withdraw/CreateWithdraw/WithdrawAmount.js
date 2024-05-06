import config from '../../../../config';
import {postInfo} from '../../../features/auth/login/loginApi';

export async function checkAmount(
  amount,
  token,
  setAmountLoader,
  setError,
  setWithdrawInfo,
  error,
  selectedCurrency,
  withdrawInfo,
  selectedMethod,
  trans,
) {
  if (amount && selectedMethod && selectedCurrency) {
    setAmountLoader(true);
    setError({...error, amount: false});
    const URL = `${config.BASE_URL_VERSION}/withdrawal/amount-limit-check`;
    const data = {
      currency_id: selectedCurrency?.id,
      payment_method: selectedMethod?.payment_method,
      payout_settings: selectedMethod?.id,
      amount: amount,
    };

    const res = await postInfo(data, URL, token, 'POST');
    const {records, status} = res.response;
    handleAmount(
      records,
      status,
      setAmountLoader,
      setError,
      setWithdrawInfo,
      error,
      withdrawInfo,
      trans,
    );
  }
}

const handleAmount = (
  records,
  status,
  setAmountLoader,
  setError,
  setWithdrawInfo,
  error,
  withdrawInfo,
  trans,
) => {
  if (status.code != 200) {
    setAmountLoader(false);
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
  } else {
    setAmountLoader(false);
    setError({...error, checkAmount: '', amount: false});
    const {
      totalFees,
      feesFixed,
      feesPercentage,
      formattedTotalFees,
      formattedFeesPercentage,
      formattedFeesFixed,
      formattedTotalAmount,
      formattedAmount,
    } = records;
    setWithdrawInfo({
      ...withdrawInfo,
      total_fees: formattedTotalFees,
      feesFixed: formattedFeesFixed,
      feesPercentage: formattedFeesPercentage,
      total_amount: formattedTotalAmount,
      calTotalFees: totalFees,
      calFeesFixed: feesFixed,
      calFeesPercentage: feesPercentage,
      display_amount: formattedAmount,
    });
  }
};
