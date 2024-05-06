import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { sendRequestedMoneyStyle } from '../../../RequestMoney/Accept/SendRequestedMoney/sendRequestedMoneyStyle';
import { NetworkContext } from '../../../../utils/Network/NetworkProvider';
import BottomButton from '../../../components/BottomButton/BottomButton';
import Loader from '../../../../utils/Loader/Loader';
import MoneyAmountCard from '../../../components/MoneyAmountCard/MoneyAmountCard';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import { useTranslation } from 'react-i18next';
import DetailsCard from '../../StandardMerchant/DetailsCard/DetailsCad';
import { rs } from '../../../../utils/styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { FAILED_MERCHANT_PAYMENT, SUCCESS_MERCHANT_PAYMENT } from '../../../../navigation/routeName/routeName';
import config from '../../../../../config';
import { postInfo } from '../../../../features/auth/login/loginApi';
import { getAllTransactions } from '../../../../features/slices/transactions/transactions';

const ConfirmExpressPayment = ({route:{params:{data={}, currency='', merchant_id=''}={}}, navigation}) => {
  const {merchantPaymentAmount,merchantBusinessName,merchantUserId,merchantCurrencyId,merchantActualFee}=data
  const {colors} = useTheme();
  const styles = sendRequestedMoneyStyle(colors);
  const [loading, setLoading] = useState(false);
  const {isConnected} = useContext(NetworkContext);
  const [fastLoad, setFastLoad]=useState(true);
  const {user: {token, user_id} = {}} = useSelector(state => state.loginUserReducer) || {};
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  const handleConfirm=async()=>{
    setLoading(true);
    const URL = `${config.BASE_URL_VERSION}/qr-code/standard-merchant-payment-submit`;
    const obj = {
      merchant_user_id: merchantUserId,
      merchant_id,
      user_id,
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
        amount: merchantPaymentAmount+" "+currency
      }})
    }else{
      navigation.navigate(FAILED_MERCHANT_PAYMENT)
    }
   }
  }
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  if (fastLoad) return <View style={styles.scroll_view} />;
  return (
    <>
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}>
        <View style={styles.container}>
          <TransactionStep
            currentPage={trans('{{x}} of {{y}}', {
              x: 2,
              y: 2,
            })}
            header={trans('Review & Confirm')}
            presentStep={2}
            totalStep={2}
            description={trans('Review the information below before confirming')}
          />
          <View style={styles.moneyCard}>
            <MoneyAmountCard
              style={styles.width_40}
              header={trans('Payment Amount')}
              amount={`${merchantPaymentAmount} ${currency}`}
            />
          </View><View>
          <DetailsCard
                style={{
                  container: styles.cardCont,
                  headerText: styles.headerText,
                }}
                data={{ merchantBusinessName,merchantPaymentAmount, currency_code:currency
                }}
              /></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <BottomButton
      no={trans('Cancel')}
      yes={
        !loading ? (
          trans('Confirm Payment')
        ) : (
          <View>
            <Loader
              source={require('../../../../assets/lottie/loader.json')}
              size={{width: rs(65), height: rs(55)}}
              color={colors.white}
            />
          </View>
        )
      }
      onPress={!loading && isConnected ? handleConfirm : null}
    />
  </>
  )
}

export default ConfirmExpressPayment