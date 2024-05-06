import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {FAILED_MERCHANT_PAYMENT, HOME, SUCCESS_MERCHANT_PAYMENT} from '../../../navigation/routeName/routeName';
import {useTheme} from '@react-navigation/native';
import {resetPasswordStyle} from '../../../authentication/signin/ResetPassword/ResetPassword.style';
import {qrPayStyle} from '../../QrPay/qRPay.style';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import MoneyAmountCard from '../../components/MoneyAmountCard/MoneyAmountCard';
import {confirmMoneyRequestStyle} from '../../RequestMoney/Create/ConfirmRequst/confirmMoneyRequestStyle';
import DetailsCard from './DetailsCard/DetailsCad';
import {rs} from '../../../utils/styles/responsiveSize';
import BottomButton from '../../components/BottomButton/BottomButton';
import Loader from '../../../utils/Loader/Loader';
import { postInfo } from '../../../features/auth/login/loginApi';
import config from '../../../../config';
import { getAllTransactions } from '../../../features/slices/transactions/transactions';

const ConfirmStandardPayment = ({route, navigation}) => {
  useEffect(() => {
    if (
      Object.keys(route?.params?.data)?.length === 0 ||
      !route?.params?.data
    ) {
      navigation.navigate(HOME);
    }
  }, [route?.params?.data]);
  const {
    data, currency_code, merchantId
  } = route?.params||{};
  const {merchantBusinessName,merchantPaymentAmount,merchantCurrencyId,merchantUserId,merchantActualFee}=data
  const {colors} = useTheme();
  const resetStyles = resetPasswordStyle(colors);
  const styles = qrPayStyle(colors);
  const {user: {token,user_id} = {}} =
    useSelector(state => state.loginUserReducer) || {};
  const {t: trans} = useTranslation();
  const requestMoneyStyles = confirmMoneyRequestStyle(colors);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handlePayment = async() => {
    setLoading(true);
    const URL = `${config.BASE_URL_VERSION}/qr-code/standard-merchant-payment-submit`;
    const obj = {
      merchant_user_id: merchantUserId,
      merchant_id: merchantId,
      user_id: user_id,
      currency_id: merchantCurrencyId,
      amount: merchantPaymentAmount,
      fee: merchantActualFee,
    };
    const res = await postInfo(obj, URL, token, 'POST');
   if(res){
    setLoading(false);
    dispatch(getAllTransactions({token}));
    const {status}=res?.response;
    if(status?.code===200){
      navigation.navigate(SUCCESS_MERCHANT_PAYMENT, {data:{
        merchantBusinessName,
        amount: merchantPaymentAmount+" "+currency_code
      }})
    }else{
      navigation.navigate(FAILED_MERCHANT_PAYMENT)
    }
   }
  };
  return (
    <KeyboardAvoidingView
      style={resetStyles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}
        keyboardShouldPersistTaps={'always'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={[resetStyles.textPos, resetStyles.resetText]}>
              {trans('Review & Confirm')}
            </Text>
            <Text
              style={[resetStyles.textPos, resetStyles.associatedEmailText]}>
              {trans('Please review the information below before confirm payment.',)}
            </Text>
            <View style={{marginBottom: rs(16)}}>
              <MoneyAmountCard
                style={requestMoneyStyles.contentWidth}
                header={trans('Payment Amount')}
                amount={
                  merchantPaymentAmount + ' ' + currency_code
                }
              />
            </View>
            <View>
              <DetailsCard
                style={{
                  container: requestMoneyStyles.detailsCardCont,
                  headerText: requestMoneyStyles.headerText,
                }}
                data={{ merchantBusinessName,merchantPaymentAmount, currency_code
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <BottomButton
        no={trans('Cancel')}
        yes={
          loading ? (
            <View>
              <Loader
                source={require('../../../assets/lottie/loader.json')}
                size={{width: rs(65), height: rs(55)}}
                color={colors.white}
              />
            </View>
          ) : (
            trans('Send Request')
          )
        }
        onPress={!loading ? handlePayment : null}
      />
    </KeyboardAvoidingView>
  );
};

export default ConfirmStandardPayment;
