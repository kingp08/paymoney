import {
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {accountInformationStyle} from './accountInformation.style';
import TransactionStep from '../../../../components/TransactionStep/TransactionStep';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import {DEPOSIT_SUCCESS} from '../../../../../navigation/routeName/routeName';
import SelectInput from '../../../../components/CustomTextInput/SelectInput/SelectInput';
import {useRef} from 'react';
import RightIcon from '../../../../../assets/svg/rightArrow.svg';
import MonthBottomSheet from './BottomSheet/MonthBottomSheet';
import BottomButton from '../../../../components/BottomButton/BottomButton';
import {useDispatch, useSelector} from 'react-redux';
import {postInfo} from '../../../../../features/auth/login/loginApi';
import {getAllTransactions} from '../../../../../features/slices/transactions/transactions';
import {hideMessage} from 'react-native-flash-message';
import {handleToaster} from '../../../../../utils/CustomAlert/handleAlert';
import {useContext} from 'react';
import {NetworkContext} from '../../../../../utils/Network/NetworkProvider';
import config from '../../../../../../config';
import {useTranslation} from 'react-i18next';
import {getProfileSummary} from '../../../../../features/slices/user/getProfile/getProfile';
import Loader from '../../../../../utils/Loader/Loader';
import { rs } from '../../../../../utils/styles/responsiveSize';
import { getMyWallets } from '../../../../../features/slices/myWallets/myWallets';

const AccountInformation = ({
  navigation,
  route: {
    params: {
      data,
      setDepositInfo = {},
      setAmount = {},
    },
  },
}) => {
  const initialState = {
    cardNumber: '',
    month: '',
    year: '',
    cvc: '',
  };
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const dispatch = useDispatch();
  const {isConnected} = useContext(NetworkContext);
  const errorText = {cardNumber: false, month: false, year: false, cvc: false};
  const {colors} = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const styles = accountInformationStyle(colors);
  const {t:trans} = useTranslation();
  const [accountInfo, setAccountInfo] = useState(initialState);
  const [error, setError] = useState(errorText);
  const paymentInfo = {};
  const [paymentInfoData, setPaymentInfoData] = useState(paymentInfo);
  const [validInfoLoader, setValidInfoLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleError = () => {
    const {cardNumber, month, year, cvc} = accountInfo;

    const errorCardNumber = cardNumber === '' ? true : false;
    const errorMonth = month === '' ? true : false;
    const errorYear = year === '' ? true : false;
    const errorCVC = cvc === '' ? true : false;
    setError({
      ...error,
      cardNumber: errorCardNumber,
      month: errorMonth,
      year: errorYear,
      cvc: errorCVC,
      checkCardNumber: false,
      checkMonth: false,
      checkYear: false,
      checkCvc: false,
    });
  };
  const handleProceed = async () => {
    const {cardNumber, month, year, cvc} = accountInfo;
    if (
      cardNumber &&
      month &&
      year &&
      cvc &&
      !error.stripeError &&
      isConnected
    ) {
      Keyboard.dismiss();
      setLoader(true);
      if (paymentInfoData.data) {
        const URL = `${config.BASE_URL_VERSION}/deposit-money/payment-confirm`;
        const stripe_confirm_data = {
          payment_intent: paymentInfoData.data.payment_intent,
          payment_method: paymentInfoData.data.payment_method,
          gateway: paymentInfoData.data.gateway,
          currency_id: paymentInfoData.data.currency_id,
          payment_method_id: paymentInfoData.data.payment_method_id,
          amount: paymentInfoData.data.amount,
          total_amount: paymentInfoData.data.total_amount,
        };

        const res = await postInfo(stripe_confirm_data, URL, token, 'POST');
        const {records, status} = res.response;
        if (status.code === 200) {
          hideMessage();
          dispatch(getAllTransactions({token}));
          navigation.navigate(DEPOSIT_SUCCESS, {
            records,
            setDepositInfo,
            initialState,
            setAmount,
            setError,
            errorText,
            currency: data.currency.code,
            amount: data.formatted_amount,
          });
          dispatch(getProfileSummary({token}));
          dispatch(getMyWallets({token}));
        } else {
          setLoader(false);
          handleToaster(trans(status.message), 'warning', colors);
        }
      }
    } else {
      handleError();
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      hideMessage();
    });
  }, [navigation]);

  useEffect(() => {
    setValidInfoLoader(false);
    let timeoutId;
    const {cardNumber, month, year, cvc} = accountInfo;
    const URL = `${config.BASE_URL_VERSION}/deposit-money/stripe-make-payment`;
    async function checkPayment() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async() => {
        if (cardNumber && month && year && cvc) {
          setValidInfoLoader(false);
          const stripe_payment_data = {
            amount: data.amount,
            currency_id: data.currency.id,
            payment_method_id: data.payment_method.id,
            card: cardNumber,
            month: month.value,
            year: year,
            cvc: cvc,
          };
          const res = await postInfo(stripe_payment_data, URL, token, 'POST');
          const {records, status} = res.response;
          handleStripePayment(records, status);
        }
      }, 500);
    }
    checkPayment();
    return () => clearTimeout(timeoutId);
    
  }, [accountInfo]);

  const handleStripePayment = (records, status) => {
    if (status.code === 200) {
      setValidInfoLoader(true);
      setError({
        ...error,
        checkCardNumber: false,
        checkMonth: false,
        checkYear: false,
        checkCvc: false,
        stripeError: false,
      });
      paymentInfo['data'] = records;
      handleConfirm(paymentInfo);
    } else {
      setValidInfoLoader(false);
      setPaymentInfoData({});
      if (records && status.code !== 200) {
        setError({
          ...error,
          stripeError: records,
        });
      }
    }
  };

  const handleConfirm = paymentInfo => {
    setPaymentInfoData(paymentInfo);
  };
  const monthBottomSheet = useRef(null);
  const openMonthBottomSheet = () => {
    Keyboard.dismiss();
    monthBottomSheet.current?.snapToIndex(0);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          style={styles.scroll_view}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <TransactionStep
                 currentPage={trans('{{x}} of {{y}}', {
                  x: 3,
                  y: 3,
                })}
                header={trans('Account Information')}
                presentStep={3}
                totalStep={3}
                description={trans('Please provide your stripe account information')}
                style={[styles.mb_20, styles.stepAlignment]}
              />
              <View style={styles.mb_16}>
                <CustomInput
                  label={trans('Card Number')}
                  keyboardAppearance={'dark'}
                  placeholder={'4242 4242 4242 4242'}
                  onChangeText={text =>
                    setAccountInfo({
                      ...accountInfo,
                      cardNumber: text
                        .replace(/\s?/g, '')
                        .replace(/(\d{4})/g, '$1 ')
                        .replace(/[^0-9+ ]/g, '')
                        .trim(),
                    })
                  }
                  value={accountInfo?.cardNumber}
                  keyboardType={'number-pad'}
                  style={styles.contentWidth}
                  maxLength={19}
                  returnKeyType={'done'}
                  isError={
                    (error.cardNumber && !accountInfo.cardNumber) ||
                    error.checkCardNumber
                  }
                  error={
                    error.checkCardNumber && accountInfo.cardNumber
                      ? error.checkCardNumber
                      : trans('This field is required.')
                  }
                />
              </View>
              <View style={styles.flexCont}>
                <SelectInput
                  label={trans('Month')}
                  onPress={() => openMonthBottomSheet()}
                  title={accountInfo.month?.month}
                  style={styles.selectButton}
                  isError={
                    (error.month && !accountInfo.month) || error.checkMonth
                  }
                  error={
                    error.checkMonth && accountInfo.month
                      ? error.checkMonth
                      : trans('This field is required.')
                  }
                  icon={<RightIcon fill={colors.manatee} />}
                />
                <CustomInput
                  label={trans('Year')}
                  placeholder={'24'}
                  keyboardAppearance={'dark'}
                  keyboardType={'number-pad'}
                  onChangeText={text =>
                    setAccountInfo({
                      ...accountInfo,
                      year: text
                        .replace(/\s?/g, '')
                        .replace(/[^0-9]/g, '')
                        .trim(),
                    })
                  }
                  maxLength={2}
                  value={accountInfo?.year}
                  style={styles.selectButton}
                  returnKeyType={'done'}
                  isError={(error.year && !accountInfo.year) || error.checkYear}
                  error={
                    error.checkYear && accountInfo.year
                      ? error.checkYear
                      : trans('This field is required.')
                  }
                />
              </View>
              <View style={styles.mb_20}>
                <View style={styles.cvcCont}>
                <CustomInput
                  label={trans('CVC')}
                  keyboardAppearance={'dark'}
                  placeholder={'123'}
                  onChangeText={text =>
                    setAccountInfo({
                      ...accountInfo,
                      cvc: text
                        .replace(/\s?/g, '')
                        .replace(/[^0-9]/g, '')
                        .trim(),
                    })
                  }
                  value={accountInfo?.cvc}
                  keyboardType={'number-pad'}
                  style={styles.contentWidth}
                  maxLength={4}
                  returnKeyType={'done'}
                  isError={
                    (error.cvc && !accountInfo.cvc) ||
                    error.checkCvc
                  }
                  error={
                    accountInfo.cvc && error.checkCvc
                      ? error.checkCvc
                      : trans('This field is required.')
                  }
                />
                </View>
              </View>
              {error.stripeError &&
                accountInfo.cardNumber &&
                accountInfo.month &&
                accountInfo.year &&
                accountInfo.cvc && (
                  <View>
                    <Text style={styles.stripeError}>
                      {trans(error.stripeError)}
                    </Text>
                  </View>
                )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomButton
        disable={!validInfoLoader ? true : false}
        no={trans('Cancel')}
        yes={
          !loader ? (
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
        onPress={!loader ? handleProceed : null}
      />
      <MonthBottomSheet
        bottomSheetRef={monthBottomSheet}
        setSelectedItem={setAccountInfo}
        selectedItem={accountInfo}
        setError={setError}
        error={error}
        name={'month'}
      />
    </>
  );
};

export default AccountInformation;
