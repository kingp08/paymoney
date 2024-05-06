import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import React, {useState} from 'react';
import {depositUsingStripeStyle} from '../../Stripe/depositUsingStripe.style';
import TransactionStep from '../../../../components/TransactionStep/TransactionStep';
import DepositUsingBankDetails from '../Details/DepositUsingBankDeatils';
import {useTheme} from '@react-navigation/native';
import MoneyAmountCard from '../../../../components/MoneyAmountCard/MoneyAmountCard';
import {depositUsingBankStyle} from '../depositUsingBank.style';
import BankInfoDetails from './Details/BankInfoDetails';
import {DEPOSIT_SUCCESS} from '../../../../../navigation/routeName/routeName';
import BottomButton from '../../../../components/BottomButton/BottomButton';
import { postInfoUsingFormData} from '../../../../../features/auth/login/loginApi';
import {useDispatch, useSelector} from 'react-redux';
import {handleToaster} from '../../../../../utils/CustomAlert/handleAlert';
import {getAllTransactions} from '../../../../../features/slices/transactions/transactions';
import {useContext} from 'react';
import {NetworkContext} from '../../../../../utils/Network/NetworkProvider';
import config from '../../../../../../config';
import {depoBankConfirmStyle} from './confirmDepositUsingBank.style';
import {useTranslation} from 'react-i18next';
import {getProfileSummary} from '../../../../../features/slices/user/getProfile/getProfile';
import Loader from '../../../../../utils/Loader/Loader';
import { rs } from '../../../../../utils/styles/responsiveSize';
import { getMyWallets } from '../../../../../features/slices/myWallets/myWallets';
const payment_confirm_url = `${config.BASE_URL_VERSION}/deposit-money/payment-confirm`;

const ConfirmDepositUsingBank = ({
  navigation,
  route: {
    params: {
      data: {paymentInfo = {}, bankInfo = {}} = {},
      setDepositInfo = {},
      initialState = {},
      setAmount = {},
      setError = {},
      errorText = {},
    },
  },
}) => {
  const {colors} = useTheme();
  const [loading, setLoading] = useState(false);
  const confirmStyle = depoBankConfirmStyle();
  const {t:trans} = useTranslation();
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );


  const dispatch = useDispatch();
  const {isConnected} = useContext(NetworkContext);
  const handleProceed = async () => {
    if (isConnected) {
      setLoading(true);
      const {amount, currency, payment_method, fee} = paymentInfo;
      const {bankId,attachFile} = bankInfo;
      const URL = payment_confirm_url;
      const totalAmount = parseFloat(amount) + parseFloat(fee);
      const formData = new FormData();
      formData.append('file', attachFile);
      formData.append('gateway', payment_method.name);
      formData.append('bank_id', bankId);
      formData.append('currency_id', currency.id);
      formData.append('payment_method_id', payment_method.id);
      formData.append('amount', paymentInfo.amount);
      formData.append('total_amount', paymentInfo.totalAmount);
      const res = await postInfoUsingFormData(formData, URL, token, 'POST');
      const {records, status} = res.response;
      if (status.code === 200) {
        setLoading(false);
        dispatch(getAllTransactions({token}));
        dispatch(getProfileSummary({token}));
        dispatch(getMyWallets({token}));
        navigation.navigate(DEPOSIT_SUCCESS, {
          records,
          totalAmount,
          setDepositInfo,
          initialState,
          setAmount,
          setError,
          errorText,
          paymentInfo,
          amount: paymentInfo.formatted_amount,
        });
      } else {
        setLoading(false);
        switch(status?.code){
          case 403:
            return handleToaster(trans('You are not permitted for this transaction!'), 'error', colors);
          case 400:
            return handleToaster(trans('Your account has been suspended!'), 'error', colors);
          default:
            return handleToaster(trans(status?.message), 'warning', colors);
        }
      }
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={depositUsingStripeStyle(colors).onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          style={depositUsingStripeStyle(colors).scroll_view}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              ...depositUsingStripeStyle(colors).container,
              ...confirmStyle.horizontal_padding,
            }}>
            <TransactionStep
               currentPage={trans('{{x}} of {{y}}', {
                x: 3,
                y: 3,
              })}
              header={trans('Confirm Your Deposit')}
              presentStep={3}
              totalStep={3}
              description={trans('Please review your bank details before confirming')}
              style={[
                depositUsingStripeStyle(colors).mb_20,
                confirmStyle.transactionStep,
              ]}
            />
            <View>
              <MoneyAmountCard
                amount={`${paymentInfo.formatted_totalAmount} ${paymentInfo.currency.code}`}
                header={trans('Depositing Amount')}
                style={[
                  depositUsingStripeStyle(colors).mb_16,
                  confirmStyle.contentWidth,
                ]}
              />
            </View>
            <BankInfoDetails
              data={{paymentInfo, bankInfo}}
              style={{
                header: depositUsingBankStyle(colors).header,
                container: confirmStyle.contentWidth,
              }}
            />
            <DepositUsingBankDetails
              data={paymentInfo}
              style={{
                header: depositUsingBankStyle(colors).header,
                container: {
                  ...depositUsingStripeStyle(colors).mb_16,
                  ...confirmStyle.contentWidth,
                },
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton
        no={trans('Cancel')}
        yes={
          !loading ? (
            trans('Deposit Now')
          ) : (
            <View>
              <Loader
                source={require('../../../../../assets/lottie/loader.json')}
                size={{width: rs(65), height: rs(55)}}
                color={colors.white}
              />
            </View>
          )
        }
        onPress={handleProceed}
      />
    </>
  );
};

export default ConfirmDepositUsingBank;
