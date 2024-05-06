import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useContext, useRef} from 'react';
import {
  CONFIRM_WITHDRAW,
  HOME,
  WITHDRAW_SETTINGS,
} from '../../../navigation/routeName/routeName';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import CustomInput from '../../components/CustomInput/CustomInput';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import ButtonOutline from '../../components/Buttons/ButtonOutline/ButtonOutline';
import {CreateWithdrawStyle} from './CreateWithdraw.style';
import {useEffect} from 'react';
import {debounceValidation} from '../../utilities/Validation/Validation';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import {useDispatch, useSelector} from 'react-redux';
import WithdrawPaymentBottomSheet from './WithdrawPaymentBottomSheet';
import WithdrawalCurrencyBottomsheet from './WithdrawalCurrencyBottomsheet';
import {useTranslation} from 'react-i18next';
import {moneyRequestStyle} from '../../RequestMoney/Create/CreateRequest/createRequest.style';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import config from '../../../../config';
import ErrorMessage from '../../utilities/ErrorMessage/ErrorMessage';
import {SetCurrencies} from './WithdrawCurrencies';
import {checkWithdraw} from './WithdrawLists';
import {checkAmount} from './WithdrawAmount';
import Loader from '../../../utils/Loader/Loader';
import { getWithdrawalMethods } from '../../../features/slices/getMethods/getAddWithdrawalMethods';

const CreateWithdraw = ({route, navigation}) => {
  const {isConnected} = useContext(NetworkContext);
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const currency = route?.params?.currency;
  const [withdrawalList, setWithdrawalList] = useState([]);
  const [withdrawalCurrency, setWithdrawlCurrency] = useState([]);
  const [openBottomSheet, setOpenBottomSheet]=useState(false)
  const {withdrawSettingsList, settingsListsLoader} = useSelector(
    state => state.getWithdrawSettingsLists,
  );

  const {withdrawalCurrencyData, withdrawalCurrencyLoader} = useSelector(
    state => state.withdrawalCurrenciesSlice,
  );
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {payment_method_withdraw = {}} = useSelector(
    state => state.getAddWithdrawalMethods|| {},
  );
  const {preference} = useSelector(state => state.preference);

  const {decimal_format_amount, decimal_format_amount_crypto} =
    preference || {};
  const dispatch = useDispatch();
  const paymentBottomSheetRef = useRef(null);
  const currencyBottomSheetRef = useRef(null);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [checkAuth, setCheckAuth] = useState(true);
  const [checkValidity, setCheckValidity] = useState(true);
  const [withdrawInfo, setWithdrawInfo] = useState({});
  const [amount, setAmount] = useState('');
  const [amountLoader, setAmountLoader] = useState(false);
  const count = useRef(8);
  const initialState = {
    email: '',
    currency: '',
    addNote: '',
  };
  const errorText = {
    email: false,
    currency: false,
    method: false,
  };

  const [error, setError] = useState(errorText);
  const moneyReqStyle = moneyRequestStyle(colors);
  const style = CreateWithdrawStyle(colors);

  const handleCurrencyIndex = () => {
    setWithdrawlCurrency(withdrawalCurrencyData);
    Keyboard.dismiss();
    setTimeout(() => {
      currencyBottomSheetRef.current?.snapToIndex(0);
    }, 300);
  };

  const handlePaymentIndex = () => {
    setWithdrawalList(withdrawSettingsList);
    Keyboard.dismiss();
    setTimeout(() => {
      paymentBottomSheetRef.current?.snapToIndex(0);
    }, 300);
  };
  setTimeout(() => {
    setOpenBottomSheet(true);
  }, 500);
  const handleError = () => {
    const errorAmount = amount === '' || 'undefined' ? true : false;
    const errorCurrency = selectedCurrency === '' || 'undefined' ? true : false;
    const errorMethod = selectedMethod === '' || 'undefined' ? true : false;
    setError({
      ...error,
      currency: errorCurrency,
      method: errorMethod,
      amount: errorAmount,
    });
  };

  const handleProceed = () => {
    if (
      amount &&
      !error.checkAmount &&
      !withdrawalCurrencyLoader &&
      !settingsListsLoader &&
      isConnected &&
      checkAuth &&
      !amountLoader
    ) {
      navigation.navigate(CONFIRM_WITHDRAW, {
        withdrawInfo,
        setWithdrawInfo,
        initialState,
        selectedCurrency,
        selectedMethod,
        amount,
        setAmount,
      });
    } else {
      checkAuth && isConnected && handleError();
    }
  };

  useEffect(() => {
    const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
    checkWithdraw(
      dispatch,
      setSelectedMethod,
      setSelectedCurrency,
      setCheckAuth,
      setCheckValidity,
      token,
      isConnected,
      currency,
      colors,
      URL,
    );
    const withdrawMethodsURL = `${config.BASE_URL_VERSION}/withdrawal-setting/payment-methods`;
    if(Object.keys(payment_method_withdraw)?.length===0){
      dispatch(getWithdrawalMethods({token, withdrawMethodsURL}));
    }
  }, [dispatch]);

  useEffect(() => {
    SetCurrencies(
      selectedMethod,
      dispatch,
      colors,
      setSelectedCurrency,
      setCheckAuth,
      setCheckValidity,
      isConnected,
      token,
      currency,
      trans,
      payment_method_withdraw
    );
  }, [selectedMethod?.id]);

  useEffect(() => {
    let timeoutId;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkAmount(
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
        );
      }, 500);
    };
    handler();
    return () => clearTimeout(timeoutId);
  }, [amount, selectedMethod?.id, selectedCurrency?.id]);


  return (
    <>
      <KeyboardAvoidingView
        style={style.KeyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={depositStyle(colors).scroll_view}
          keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={depositStyle(colors).container}>
              <View style={style.transactionStepContainer}>
                <TransactionStep
                  currentPage={trans('{{x}} of {{y}}', {
                    x: 1,
                    y: 2,
                  })}
                  header={trans('Create Withdrawal')}
                  presentStep={1}
                  totalStep={2}
                  description={trans('Accumulated wallet funds can simply be withdrawn at any time, to your saved accounts')}
                />
              </View>
              <View style={style.methodContainer}>
                <Text style={depositStyle(colors).inputTitle}>
                  {trans('Method')}
                </Text>
                <SelectInput
                  style={style.contentWidth}
                  title={
                    (selectedMethod?.payment_method?.toString() === payment_method_withdraw?.Paypal?.toString() &&
                      `Paypal (${selectedMethod?.email})`) ||
                    (selectedMethod?.payment_method?.toString() === payment_method_withdraw?.Bank?.toString() &&
                      `Bank (${selectedMethod?.account_name})`) ||
                    (selectedMethod?.payment_method?.toString() === payment_method_withdraw?.Crypto?.toString() &&
                      `Crypto ${selectedMethod?.currency?.code}-${selectedMethod?.crypto_address}`)
                  }
                  onPress={handlePaymentIndex}
                  isError={error.method && !selectedMethod}
                  error={error.method ? trans('This field is required.') : ''}
                  icon={
                    settingsListsLoader ? (
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
              <View style={style.currencyContainer}>
                <Text style={depositStyle(colors).inputTitle}>
                  {trans('Currency')}
                </Text>
                <SelectInput
                  style={style.contentWidth}
                  title={selectedCurrency?.code}
                  onPress={handleCurrencyIndex}
                  isError={error.currency && !selectedCurrency}
                  error={error.currency ? trans('This field is required.') : ''}
                  icon={
                    withdrawalCurrencyLoader ? (
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
                <Text style={style.feeContainer}>
                  {trans('Fee')} (
                  {withdrawInfo.feesPercentage
                    ? withdrawInfo.feesPercentage
                    : selectedMethod?.payment_method?.toString() !== payment_method_withdraw?.Crypto?.toString()
                    ? `${parseFloat(0.0).toFixed(
                        withdrawalCurrencyLoader || settingsListsLoader
                          ? 2
                          : decimal_format_amount,
                      )}%`
                    : `${parseFloat(0.0).toFixed(
                        withdrawalCurrencyLoader || settingsListsLoader
                          ? 2
                          : decimal_format_amount_crypto,
                      )}%`}
                  +{' '}
                  {withdrawInfo.feesFixed
                    ? withdrawInfo.feesFixed
                    : selectedMethod?.payment_method?.toString() !== payment_method_withdraw?.Crypto?.toString()
                    ? `${parseFloat(0.0).toFixed(
                        withdrawalCurrencyLoader || settingsListsLoader
                          ? 2
                          : decimal_format_amount,
                      )}`
                    : `${parseFloat(0.0).toFixed(
                        withdrawalCurrencyLoader || settingsListsLoader
                          ? 2
                          : decimal_format_amount_crypto,
                      )}`}
                  ) {trans('Total Fee')}:{' '}
                  {withdrawInfo.total_fees
                    ? withdrawInfo.total_fees
                    : selectedMethod?.payment_method?.toString() !== payment_method_withdraw?.Crypto?.toString()
                    ? `${parseFloat(0.0).toFixed(
                        withdrawalCurrencyLoader || settingsListsLoader
                          ? 2
                          : decimal_format_amount,
                      )}`
                    : `${parseFloat(0.0).toFixed(
                        withdrawalCurrencyLoader || settingsListsLoader
                          ? 2
                          : decimal_format_amount_crypto,
                      )}`}
                </Text>
              </View>
              <View style={style.currencyContainer}>
                <Text style={depositStyle(colors).inputTitle}>
                  {`${trans('Amount')}*`}{' '}
                </Text>
                <View>
                  <CustomInput
                    keyboardType="number-pad"
                    style={style.contentWidth}
                    placeholder={
                      selectedMethod?.payment_method?.toString() !== payment_method_withdraw?.Crypto?.toString()
                        ? `${parseFloat(0.0).toFixed(decimal_format_amount)}`
                        : `${parseFloat(0.0).toFixed(
                            decimal_format_amount_crypto,
                          )}`
                    }
                    keyboardAppearance={'dark'}
                    value={amount}
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
                          selectedMethod?.payment_method?.toString() !== payment_method_withdraw?.Crypto?.toString()?
                          decimal_format_amount: decimal_format_amount_crypto
                          ,
                          count,
                        ),
                      );
                    }}
                    maxLength={Number(count.current)}
                  />
                </View>
              </View>
              <CustomButton
                onPress={handleProceed}
                style={style.customButton}
                disabled={amountLoader && amount > 0 ? true : false}
                title={trans('Proceed')}
                bgColor={colors.cornflowerBlue}
                color={colors.white}
              />
              <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
                <Text style={depositStyle(colors).cancelBtn}>
                  {trans('Cancel')}
                </Text>
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
      <View style={style.setUpBtnContainer}>
        <ButtonOutline
          onPress={() =>
            navigation.navigate(WITHDRAW_SETTINGS, {
              setSelectedMethod,
              setSelectedCurrency,
            })
          }
          style={style.bottomButton}
          title={trans('Withdrawal Setup')}
          bgColor={colors.btnSecondary}
          color={colors.textQuinary}
        />
      </View>
      {openBottomSheet && <WithdrawPaymentBottomSheet
        data={{
          title: trans('Select Payment Method'),
          value: withdrawalList,
        }}
        bottomSheetRef={paymentBottomSheetRef}
        setSelectedItem={setSelectedMethod}
        selectedItem={selectedMethod}
        error={error}
        setError={setError}
      />}
      {withdrawSettingsList.length > 0 && openBottomSheet &&  (
        <WithdrawalCurrencyBottomsheet
          data={{
            title: trans('Select Currency'),
            value: withdrawalCurrency,
          }}
          bottomSheetRef={currencyBottomSheetRef}
          setSelectedItem={setSelectedCurrency}
          selectedItem={selectedCurrency}
          error={error}
          setError={setError}
        />
      )}
    </>
  );
};

export default CreateWithdraw;
