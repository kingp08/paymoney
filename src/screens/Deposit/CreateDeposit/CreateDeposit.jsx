import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  CONFIRM_DEPOSIT,
  DEPOSIT_USING_BANK,
  DEPOSIT_USING_STRIPE,
  HOME,
  TRANSACTION_FAILED,
} from '../../../navigation/routeName/routeName';
import {useTheme} from '@react-navigation/native';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import {crateDepositStyle} from './createDeposit.style';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import CustomInput from '../../components/CustomInput/CustomInput';
import {debounceValidation} from '../../utilities/Validation/Validation';
import CurrencyBottomSheet from './DepositBottomSheet/CurrencyBottomSheet';
import Payment_MethodBottomSheet from './DepositBottomSheet/Payment_MethodBottomSheet';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {moneyRequestStyle} from '../../RequestMoney/Create/CreateRequest/createRequest.style';
import {useContext} from 'react';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import config from '../../../../config';
import ErrorMessage from '../../utilities/ErrorMessage/ErrorMessage';
import {checkDeposit} from './DepositCurrencies';
import {checkPaymentMethod} from './DepositMethods';
import {checkAmount} from './DepositAmount';
import Loader from '../../../utils/Loader/Loader';
const payment_method_url = `${config.BASE_URL_VERSION}/deposit-money/payment-methods`;
const amount_check_url = `${config.BASE_URL_VERSION}/deposit-money/amount-limit-check`;

const CreateDeposit = ({navigation, route}) => {
  const {isConnected} = useContext(NetworkContext);
  const dispatch = useDispatch();
  const currency = route?.params?.currency;
  let paymentBottomsheetArray = [];
  const {t:trans} = useTranslation();
  const [paymentBottomSheetData, setPaymentBottomSheetData] = useState([]);
  const [checkAuth, setCheckAuth] = useState(true);
  const [checkValidity, setCheckValidity] = useState(true);
  const {paymentLoading} = useSelector(state => state.getDepositMoneyMethods);
  const {data, loading} = useSelector(state => state.getDepositMoneyCurrencies);
  const [amountLoader, setAmountLoader] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
 
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {preference} = useSelector(state => state.preference);
  const {decimal_format_amount, decimal_format_amount_crypto} =
    preference || {};
  const initialState = {
    currency: '',
    payment_method: '',
  };
  const errorText = {
    currency: false,
    payment_method: false,
    amount: false,
    checkAmount: false,
  };
  const {colors} = useTheme();
  const moneyReqStyle = moneyRequestStyle(colors);
  const count = useRef(8);
  const styles = crateDepositStyle(colors);
  const [depositInfo, setDepositInfo] = useState(initialState);
  const [error, setError] = useState(errorText);
  const currencyBottomSheetRef = useRef(null);
  const paymentBottomSheetRef = useRef(null);
  const [amount, setAmount] = useState('');
  const [amountInfo, setAmountInfo] = useState({
    formatted_percentageFees: 0,
    formatted_fixedFees: 0,
    formatted_totalFees: 0,
  });

  const openCurrencyBottomSheetModal = () => {
    Keyboard.dismiss();
    currencyBottomSheetRef.current?.snapToIndex(0);
  };

  const openPaymentBottomSheetModal = () => {
    Keyboard.dismiss();
    paymentBottomSheetRef.current?.snapToIndex(0);
  };
  useEffect(() => {
    checkDeposit(
      dispatch,
      token,
      setDepositInfo,
      depositInfo,
      currency,
      setCheckAuth,
      setCheckValidity,
      colors,
      trans,
      isConnected,
    );
  }, [dispatch, currency]);

  useEffect(() => {
    checkPaymentMethod(
      isConnected,
      dispatch,
      setDepositInfo,
      depositInfo,
      setPaymentBottomSheetData,
      paymentBottomsheetArray,
      payment_method_url,
      token,
      setPageLoader
    );
  }, [depositInfo?.currency?.id]);
  useEffect(() => {
    let timeoutId;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkAmount(
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
        );
      }, 500);
    };
    handler();
    return () => clearTimeout(timeoutId);
  }, [amount, depositInfo?.currency?.code, depositInfo?.payment_method?.id]);

  useEffect(() => {
    setAmount('');
    setError({...error, checkAmount: '', amount: false});
    setAmountInfo({
      ...amountInfo,
      formatted_percentageFees: '',
      formatted_fixedFees: '',
      formatted_totalFees: '',
    });
  }, [depositInfo.currency?.type]);

  const handleError = () => {
    const {currency, payment_method} = depositInfo;
    const errorCurrency = currency === '' ? true : false;
    const errorPayment_Method = payment_method === '' ? true : false;
    const errorAmount = amount === '' ? true : false;
    setError({
      ...error,
      currency: errorCurrency,
      payment_method: errorPayment_Method,
      amount: errorAmount,
    });
  };
  const HandleProceed = () => {
    const {currency, payment_method} = depositInfo;
    const {
      formatted_totalFees,
      formatted_totalAmount,
      formatted_amount,
      totalAmount,
      totalFees,
    } = amountInfo;

    if (
      currency &&
      payment_method &&
      amount &&
      !error.checkAmount &&
      !amountLoader &&
      isConnected &&
      checkAuth
    ) {
      navigation.navigate(CONFIRM_DEPOSIT, {
        data: {
          currency,
          amount,
          formatted_totalFees,
          formatted_totalAmount,
          formatted_amount,
          payment_method,
        }
      })
      /* if (payment_method?.name === 'Stripe') {
        navigation.navigate(DEPOSIT_USING_STRIPE, {
          data: {
            currency,
            amount,
            formatted_totalFees,
            formatted_totalAmount,
            formatted_amount,
            payment_method,
          },
          setDepositInfo,
          initialState,
          amount,
          setAmount,
          setError,
          errorText,
        });
      } else if (payment_method?.name === 'Paypal') {
        navigation.navigate(TRANSACTION_FAILED, {
          data: {
            currency,
            amount,
            formatted_totalFees,
            formatted_totalAmount,
            formatted_amount,
            totalAmount,
            totalFees,
            payment_method,
            paypal_amount: totalAmount.toFixed(2),
          },
          setDepositInfo,
          initialState,
          setAmount,
          setError,
          errorText,
        });
      } else if (payment_method?.name === 'Bank') {
        navigation.navigate(DEPOSIT_USING_BANK, {
          data: {
            currency,
            amount,
            formatted_totalFees,
            formatted_totalAmount,
            formatted_amount,
            totalAmount,
            totalFees,
            payment_method,
          },
          setDepositInfo,
          initialState,
          setAmount,
          setError,
          errorText,
        });
      } */
    } else {
      checkAuth && isConnected && handleError();
    }
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
                  x: 1,
                  y: 3,
                })}
                header={trans('Create Deposit')}
                presentStep={1}
                totalStep={3}
                description={trans('You can deposit to your wallets using popular payment methods.')}
                style={[
                  {
                    ...styles.mb_20,
                    ...styles.transactionStep,
                    ...styles.contentWidth,
                  },
                ]}
              />
              <View style={styles.mb_16}>
                <SelectInput
                  label={trans('Currency')}
                  onPress={() => openCurrencyBottomSheetModal()}
                  title={depositInfo?.currency?.code}
                  style={styles.contentWidth}
                  isError={error.currency && !depositInfo.currency}
                  error={error.currency ? trans('This field is required.') : ''}
                  icon={
                    loading ? (
                      <View>
                        <Loader
                          source={require('../../../assets/lottie/loader.json')}
                          size={moneyReqStyle.lottie}
                          color={colors.textTertiaryVariant}
                        />
                    </View>
                    ) : (
                      <RightIcon fill={colors.manatee} />
                    )
                  }
                />
                <Text style={styles.feeText}>
                  {trans('Fee')} (
                  {`${
                    amountInfo.formatted_percentageFees
                      ? amountInfo.formatted_percentageFees
                      : depositInfo.currency.type == 'fiat'
                      ? parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount,
                        ) + '%'
                      : parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount_crypto,
                        ) + '%'
                  }`}{' '}
                  +{' '}
                  {`${
                    amountInfo.formatted_fixedFees
                      ? amountInfo.formatted_fixedFees
                      : depositInfo.currency.type == 'fiat'
                      ? parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount,
                        )
                      : parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount_crypto,
                        )
                  }`}
                  ) {trans('Total Fee')}:{' '}
                  {`${
                    amountInfo.formatted_totalFees
                      ? amountInfo.formatted_totalFees
                      : depositInfo.currency.type == 'fiat'
                      ? parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount,
                        )
                      : parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount_crypto,
                        )
                  }`}
                </Text>
              </View>
              <View style={styles.mb_16}>
                <CustomInput
                  label={trans('Amount')}
                  placeholder={
                    depositInfo.currency.type == 'fiat'
                      ? `${parseFloat(0.0).toFixed( loading ? 2 :decimal_format_amount)}`
                      : `${parseFloat(0.0).toFixed(
                        loading ? 2 :decimal_format_amount_crypto,
                        )}`
                  }
                  keyboardAppearance={'dark'}
                  value={amount}
                  keyboardType={'number-pad'}
                  style={styles.contentWidth}
                  returnKeyType={'done'}
                  maxLength={Number(count.current)}
                  isError={error.amount || error.checkAmount}
                  error={
                    (error.amount &&
                      !error.checkAmount &&
                      trans('This field is required.')) ||
                      error.checkAmount
                  }
                  onChangeText={text => {
                    setAmountLoader(true);
                    setAmount(
                      debounceValidation(
                        text,
                        8,
                        depositInfo.currency.type == 'fiat'
                        ? decimal_format_amount
                        : decimal_format_amount_crypto,
                        count,
                      ),
                    );
                  }}
                />
              </View>
              <View>
                {
                  pageLoader ?
                  <View style={styles.mb_20}>
                    <SelectInput
                      label={trans('Payment Method')}
                      style={styles.contentWidth}
                      isError={
                        error.payment_method && !depositInfo.payment_method
                      }
                      error={
                        error.payment_method ? trans('This field is required.') : ''
                      }
                      icon={
                          <RightIcon fill={colors.manatee} />}
                    />
                  </View>
                  
                    :
                    paymentBottomSheetData.length > 0 ? (
                      <View style={styles.mb_20}>
                        <SelectInput
                          label={trans('Payment Method')}
                          onPress={() => openPaymentBottomSheetModal()}
                          title={depositInfo?.payment_method?.name}
                          style={styles.contentWidth}
                          isError={
                            error.payment_method && !depositInfo.payment_method
                          }
                          error={
                            error.payment_method ? trans('This field is required.') : ''
                          }
                          icon={
                            paymentLoading ? (
                              <View>
                              <Loader
                                source={require('../../../assets/lottie/loader.json')}
                                size={moneyReqStyle.lottie}
                                color={colors.textTertiaryVariant}
                              />
                          </View>
                            ) : (
                              <RightIcon fill={colors.manatee} />
                            )
                          }
                        />
                      </View>
                    ) : (
                      <Text style={{...styles.feesLimitText, ...styles.mb_20}}>
                        {trans('Fees Limit and Payment Method settings are both inactive.')}
                      </Text>
                    )
                }
              </View>

              <CustomButton
                disabled={amountLoader ? true : false}
                title={trans('Proceed')}
                onPress={
                  !amountLoader && !error.checkAmount ? HandleProceed : null
                }
                bgColor={colors.cornflowerBlue}
                style={styles.processed}
                color={colors.white}
              />
              <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
                <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
      {!checkAuth && isConnected && (
        <ErrorMessage
          message={trans('You are not permitted for this transaction!')}
        />
      )}
      {!checkValidity && isConnected && checkAuth && (
        <ErrorMessage message={trans('Your account has been suspended!')} />
      )}
      <CurrencyBottomSheet
        data={{
          title: trans('Select Currency'),
          value: data?.currencies,
        }}
        bottomSheetRef={currencyBottomSheetRef}
        setSelectedItem={setDepositInfo}
        selectedItem={depositInfo}
        setError={setError}
        error={error}
        name={'currency'}
      />
      {paymentBottomSheetData.length > 0 && (
        <Payment_MethodBottomSheet
          data={{
            title: trans('Select Payment Method'),
            value: paymentBottomSheetData,
          }}
          bottomSheetRef={paymentBottomSheetRef}
          setSelectedItem={setDepositInfo}
          selectedItem={depositInfo}
          setError={setError}
          error={error}
          name={'payment_method'}
        />
      )}
    </>
  );
};

export default CreateDeposit;
