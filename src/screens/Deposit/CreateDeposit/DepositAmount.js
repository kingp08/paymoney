import {postInfo} from '../../../features/auth/login/loginApi';

export async function checkAmount(
  amount,
  setAmountLoader,
  setError,
  depositInfo,
  error,
  setAmountInfo,
  amountInfo,
  amount_check_url,
  token,
  trans,
) {
  if (amount) {
    setAmountLoader(true);
    setError({...error, amount: false});
    const URL = amount_check_url;
    const data = {
      currency_id: depositInfo?.currency?.id,
      amount: amount,
      payment_method: depositInfo?.payment_method?.id,
    };
    const res = await postInfo(data, URL, token, 'POST');
    const {records, status} = res.response;
    handleAmount(
      records,
      status,
      setAmountLoader,
      setError,
      error,
      setAmountInfo,
      amountInfo,
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
  setAmountInfo,
  amountInfo,
  trans,
) => {
  if (status.code != 200) {
    setAmountLoader(false);
    if (
      (Array.isArray(records) && records.length > 0) ||
      !Array.isArray(records)
    ) {
      setError({...error, checkAmount: records?.message});
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
      formattedFeesPercentage,
      formattedFeesFixed,
      formattedTotalFees,
      formattedTotalAmount,
      formattedAmount,
      totalAmount,
      totalFees,
    } = records;
    setAmountInfo({
      ...amountInfo,
      formatted_percentageFees: formattedFeesPercentage,
      formatted_fixedFees: formattedFeesFixed,
      formatted_totalFees: formattedTotalFees,
      formatted_totalAmount: formattedTotalAmount,
      formatted_amount: formattedAmount,
      totalAmount,
      totalFees,
    });
  }
};
