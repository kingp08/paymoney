import {depositMoneyMethods} from '../../../features/slices/getPaymentMethods/getDepositMoneyMethods';

export async function checkPaymentMethod(
  isConnected,
  dispatch,
  setDepositInfo,
  depositInfo,
  setPaymentBottomSheetData,
  paymentBottomsheetArray,
  payment_method_url,
  token,
  setPageLoader
) {
  let isMounted = true;
  if (isMounted && isConnected) {
    const postPaymentMethod = {
      transaction_type: 1,
      currency_id: depositInfo?.currency?.id,
      currency_type: depositInfo?.currency?.type,
      URL: payment_method_url,
      token: token,
    };
    if (depositInfo?.currency?.id) {
      const payment_method_data = await dispatch(
        depositMoneyMethods({postPaymentMethod}),
      );
      if (payment_method_data) {
        setMethod(
          Object.values(payment_method_data.payload.response.records)[0],
          payment_method_data.payload.response.records,
          setDepositInfo,
          depositInfo,
          setPaymentBottomSheetData,
          paymentBottomsheetArray,
          setPageLoader
        );
      }
    }
  }
  return () => {
    isMounted = false;
  };
}

const setMethod = async (
  initialPayment,
  payment_method_data,
  setDepositInfo,
  depositInfo,
  setPaymentBottomSheetData,
  paymentBottomsheetArray,
  setPageLoader
) => {
  const getPaymentArray=()=>{
    const array=[];
    for (const i in payment_method_data) {
      array.push(payment_method_data[i]);
    };
    return array;
  }
  const getPaymentMethod=getPaymentArray().find((item)=>item?.name===depositInfo?.payment_method?.name);
  setDepositInfo({
    ...depositInfo,
    payment_method: getPaymentMethod||initialPayment,
  });
  paymentBottomsheetArray=getPaymentArray();
  setPaymentBottomSheetData(paymentBottomsheetArray);
  setPageLoader(false);
};
