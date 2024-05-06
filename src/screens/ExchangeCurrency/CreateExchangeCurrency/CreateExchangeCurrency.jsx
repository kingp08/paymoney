import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {createExchangeCurrencyStyle} from './createExchangeCurrency.style';
import {useTheme} from '@react-navigation/native';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import moment from 'moment';
import {useRef} from 'react';
import {debounceValidation} from '../../utilities/Validation/Validation';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {useEffect} from 'react';
import {CONFIRM_EXCHANGE_CURRENCY, HOME} from '../../../navigation/routeName/routeName';
import SelectExCurrencyBottomSheet from './SelectExCurrencyBottomSheet/SelectExCurrencyBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {getExchangeCurrencies} from '../../../features/slices/exchangeCurrencySlice/exchangeCurrencies';
import ExchangeField from './ExchangeField/ExchangeField';
import {postInfo} from '../../../features/auth/login/loginApi';
import {useTranslation} from 'react-i18next';
import {getAllPreference} from '../../../features/slices/preferenceSlice/preferenceSlice';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import config from '../../../../config';
import {useContext} from 'react';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import ErrorMessage from '../../utilities/ErrorMessage/ErrorMessage';
const initialState = {
  fromCurrency: '',
  toCurrency: '',
  fee: '',
  feesPercentage: '',
  feesFixed: '',
  totalFeesDisplay: '',
};
const errorState = {
  fromCurrency: false,
  toCurrency: false,
  amount: false,
  validAmount: false,
};
const CreateExchangeCurrency = ({navigation}) => {
  const {colors} = useTheme();
  const styles = createExchangeCurrencyStyle(colors);
  const formCurrencyBottomSheetRef = useRef(null);
  const toCurrencyBottomSheetRef = useRef(null);
  const [fromCurrency, setFromCurrency] = useState({});
  const {isConnected} = useContext(NetworkContext);
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer);
  const [exchangeCurrencyInfo, setExchangeCurrencyInfo] =
    useState(initialState);
  const [error, setError] = useState(errorState);
  const [amountLimit, setAmountLimit] = useState(null);
  const [checkAuth, setCheckAuth] = useState(true);
  const [checkValidity, setCheckValidity] = useState(true);
  const dispatch = useDispatch();
  const todayDate = new Date();
  const {currencies, loading} = useSelector(state => state.exchangeCurrencies);
  const {preference, loading: preferenceLoading} = useSelector(
    state => state.preference,
  );
  const [amountCharges, setAmountCharges] = useState(null);
  const [convertLoading, setConvertLoading] = useState(false);
  const count = useRef(8);
  const [amount, setAmount] = useState('');
  const [toCurrencies, setToCurrencies] = useState([]);
  const handleFromCurrencyBottomSheet = () => {
    Keyboard.dismiss();
    formCurrencyBottomSheetRef.current?.snapToIndex(0);
  };
  const handleToCurrencyBottomSheet = () => {
    Keyboard.dismiss();
    toCurrencyBottomSheetRef.current?.snapToIndex(0);
  };
  const [toWalletLoading, setToWalletLoading] = useState(false);
  const {t:trans} = useTranslation();
  useEffect(() => {
    async function fetchData() {
      let isMounted = true;
      if (isMounted && isConnected) {
        const res = await dispatch(getExchangeCurrencies({token}));
        dispatch(getAllPreference({token}));
        const {
          records,
          status: {code},
        } = res?.payload?.response;
        switch (code) {
          case 400:
            return setCheckAuth(true), setCheckValidity(false);
          case 403:
            return setCheckValidity(true), setCheckAuth(false);
          case 200:
            return (
              setCheckAuth(true),
              setCheckValidity(true),
              records?.currencies?.length > 0
                ? getFromCurrencies(records)
                : handleToaster(
                    trans('Sorry! No currency available'),
                    'warning',
                    colors,
                  )
            );
        }
      }
      return () => {
        isMounted = false;
      };
    }
    fetchData();
  }, [dispatch]);
  const getFromCurrencies = res => {
    const exist =
      res?.currencies.find(currency => currency?.id == res.default) ||
      res?.currencies[0];
    if (exist) {
      setFromCurrency(exist);
      getToCurrencies(exist);
    }
  };
  const getToCurrencies = async value => {
    if (isConnected) {
      setToWalletLoading(true);
      const URL = `${config.BASE_URL_VERSION}/exchange-money/get-destination-wallets`;
      const obj = {
        currency_id: value?.id,
      };
      setToCurrencies([]);
      setAmountCharges({total_amount: 0});
      setExchangeCurrencyInfo({...exchangeCurrencyInfo, toCurrency: ''});
      const res = await postInfo(obj, URL, token, 'POST');
      const {
        records,
        status: {code, message},
      } = res?.response;
      switch (code) {
        case 400:
          return (
            setToWalletLoading(false),
            setCheckAuth(true),
            setCheckValidity(false)
          );
        case 403:
          return (
            setToWalletLoading(false),
            setCheckValidity(true),
            setCheckAuth(false)
          );
        case 200:
          return (
            setCheckAuth(true),
            setCheckValidity(true),
            setToWalletLoading(false),
            setExchangeCurrencyInfo({
              ...exchangeCurrencyInfo,
              toCurrency: records[0],
            }),
            setToCurrencies(records),
            checkLimit(amount, value.id),
            checkRate(amount, value.id, records[0].id)
          );
        default:
          return (
            setCheckAuth(true),
            setToWalletLoading(false),
            setCheckValidity(true),
            handleToaster(trans(message), 'warning', colors)
          );
      }
    }
  };
  const checkLimit = async (value, fromCurrency) => {
    if (value > 0 && fromCurrency && isConnected && checkAuth) {
      const URL = `${config.BASE_URL_VERSION}/exchange-money/amount-limit-check`;
      const obj = {
        amount: value,
        currency_id: Number(fromCurrency),
      };
      const res = await postInfo(obj, URL, token, 'POST');
      const {
        records: {
          formattedFeesFixed,
          formattedFeesPercentage,
          formattedTotalFees,
          formattedTotalAmount,
        } = {},
        status: {code, message},
      } = res?.response;
      switch (code) {
        case 400:
          return (
            setCheckAuth(true),
            setCheckValidity(false),
            setError({...error, validAmount: ''})
          );
        case 403:
          return (
            setCheckValidity(true),
            setCheckAuth(false),
            setError({...error, validAmount: ''})
          );
        case 200:
          return (
            setCheckAuth(true),
            setCheckValidity(true),
            setError({...error, validAmount: ''}),
            setAmountLimit({
              formattedFeesPercentage,
              formattedFeesFixed,
              formattedTotalFees,
              formattedTotalAmount,
            })
          );
        default:
          return (
            setCheckAuth(true),
            setCheckValidity(true),
            message.includes('Maximum') || message.includes('Minimum')
              ? setError({
                  ...error,
                  validAmount: `${
                    trans(message.substring(0, message.lastIndexOf(' '))) +
                    ' ' +
                    message.split(' ').pop()
                  }`,
                })
              : setError({...error, validAmount: trans(message)})
          );
      }
    }
  };
  const checkRate = async (value, fromCurrency, toCurrency) => {
    if (!value && isConnected && checkAuth) {
      setAmountCharges({total_amount: 0});
    } else if (value > 0 && fromCurrency && toCurrency && isConnected) {
      setConvertLoading(true);
      const URL = `${config.BASE_URL_VERSION}/exchange-money/get-exchange-rate`;
      const obj = {
        to_currency_id: Number(toCurrency),
        from_currency_id: Number(fromCurrency),
        amount: value,
      };
      const res = await postInfo(obj, URL, token, 'POST');
      if (res) {
        setConvertLoading(false);
        const {
          records: {
            code: currencyCode,
            formatted_amount,
            rate,
            total_amount,
          } = {},
          status: {code, message},
        } = res?.response;

        switch (code) {
          case 400:
            return setCheckAuth(true), setCheckValidity(false);
          case 403:
            return setCheckValidity(true), setCheckAuth(false);
          case 200:
            return (
              setCheckAuth(true),
              setCheckValidity(true),
              setAmountCharges({
                code: currencyCode,
                formatted_amount,
                rate,
                total_amount,
              })
            );
          default:
            return (
              setCheckAuth(true),
              setCheckValidity(true),
              handleToaster(trans(message), 'warning', colors)
            );
        }
      }
    } else {
      setConvertLoading(false);
    }
  };
  const handleError = () => {
    const {toCurrency} = exchangeCurrencyInfo;
    const errorToCurrency = toCurrency === '' ? true : false;
    const errorAmount = amount === '' ? true : false;
    const errorFromCurrency = fromCurrency === '' ? true : false;
    setError({
      ...error,
      toCurrency: errorToCurrency,
      amount: errorAmount,
      fromCurrency: errorFromCurrency,
    });
  };
  const handleSubmit = () => {
    if (
      amount > 0 &&
      exchangeCurrencyInfo.toCurrency &&
      fromCurrency &&
      !error.validAmount &&
      isConnected &&
      checkAuth
    ) {
      navigation.navigate(CONFIRM_EXCHANGE_CURRENCY, {
        amount,
        exchangeCurrencyInfo,
        fromCurrency,
        rate: amountCharges?.rate,
        subTotal: amountCharges?.total_amount,
        toFixed: preference?.decimal_format_amount,
        totalAmountDisplay: amountLimit?.formattedTotalAmount,
        totalFeesDisplay: amountLimit?.formattedTotalFees,
      });
    } else {
      checkAuth && isConnected && handleError();
    }
  };
  useEffect(() => {
    let timeoutId;
    const handler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        checkLimit(amount, fromCurrency.id);
        checkRate(amount, fromCurrency.id, exchangeCurrencyInfo.toCurrency.id);
      }, 500);
    };
    handler();
    return () => clearTimeout(timeoutId);
  }, [amount]);
  const handleFormCurrency = item => {
    setFromCurrency(item);
    getToCurrencies(item);
  };
  const handleToCurrency = item => {
    setAmountLimit(null);
    setAmountCharges({total_amount: 0});
    checkLimit(amount, fromCurrency.id);
    checkRate(amount, fromCurrency.id, item?.id);
    setExchangeCurrencyInfo({...exchangeCurrencyInfo, toCurrency: item});
  };
  const [fastLoad, setFastLoad] = useState(true);
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
          style={styles.scroll_view}
          keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <TransactionStep
                currentPage={trans('{{x}} of {{y}}', {
                  x: 1,
                  y: 2,
                })}
                header={trans('Set Your Currencies')}
                presentStep={1}
                totalStep={2}
                description={trans('The exchange rate is based on the international banking system and GMT standard.')}
                style={styles.width_80}
              />
              <View style={styles.convertContainer}>
                <ExchangeField
                  balance={`${parseFloat(fromCurrency?.balance).toFixed(
                    preference?.decimal_format_amount,
                  )} ${fromCurrency?.code}`}
                  selectLabel={trans('From')}
                  inputLabel={trans('Amount')}
                  maxLength={count}
                  value={amount}
                  formCurrency={fromCurrency}
                  onChangeText={text => {
                    setConvertLoading(true);
                    setAmount(
                      debounceValidation(
                        text,
                        8,
                        preference?.decimal_format_amount,
                        count,
                      ),
                    );
                  }}
                  handleBottomSheet={handleFromCurrencyBottomSheet}
                  isError={
                    (!(amount > 0) && amount) ||
                    error.validAmount ||
                    (error.amount && !amount)
                  }
                  currencyError={
                    error.fromCurrency && !exchangeCurrencyInfo.fromCurrency
                  }
                  loadingToWallet={loading || preferenceLoading}
                  error={
                    !(amount > 0) && amount
                      ? trans('Please enter a valid number.')
                      : error.validAmount
                      ? error.validAmount
                      : trans('This field is required.')
                  }
                />
                <ExchangeField
                  selectLabel={trans('To')}
                  inputLabel={trans('Converted Amount')}
                  style={styles.mt_24}
                  loadingToWallet={toWalletLoading}
                  toCurrency={exchangeCurrencyInfo.toCurrency}
                  value={amount ? amountCharges?.total_amount : 0}
                  handleBottomSheet={handleToCurrencyBottomSheet}
                  isConvertible={true}
                  isEditable={false}
                  currencyError={
                    error.toCurrency && !exchangeCurrencyInfo.toCurrency
                  }
                  error={amountCharges?.error}
                  isError={amountCharges?.error}
                />
                <View style={styles.exchangeRateContainer}>
                  {amountLimit?.formattedFeesFixed &&
                    amountCharges?.rate &&
                    amount &&
                    !error.validAmount && (
                      <>
                        <Text style={styles.exchangeDate}>
                          {moment(todayDate).format('DD MMM, yyyy')}
                        </Text>
                        <Text style={styles.exchangeText}>
                          {`${trans('Exchange Rate') + ': 1'} ${
                            fromCurrency?.code
                          } = ${amountCharges?.rate} ${
                            exchangeCurrencyInfo.toCurrency?.code
                          }`}
                        </Text>
                      </>
                    )}
                  {amountLimit?.formattedFeesFixed &&
                    amountCharges?.rate &&
                    amount &&
                    !error.validAmount && (
                      <Text style={[styles.exchangeText, styles.mt_8]}>
                        {`${trans('Fee')}: ${
                          amountLimit?.formattedFeesPercentage
                        } + ${amountLimit?.formattedFeesFixed}`}
                      </Text>
                    )}
                </View>
                <CustomButton
                  title={trans('Exchange')}
                  disabled={convertLoading && amount > 0 ? true : false}
                  onPress={
                    (convertLoading &&
                      amount > 0 &&
                      isConnected &&
                      checkAuth &&
                      checkValidity) ||
                    loading ||
                    toWalletLoading
                      ? null
                      : handleSubmit
                  }
                  style={styles.customButton}
                />
              <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
                <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
              </TouchableOpacity>
              </View>
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
      {currencies?.currencies?.length > 0 && (
        <SelectExCurrencyBottomSheet
          data={currencies?.currencies}
          label={trans('Select Currency')}
          bottomSheetRef={formCurrencyBottomSheetRef}
          selectedItem={fromCurrency}
          setError={setError}
          error={error}
          handleSetInfo={handleFormCurrency}
          name={'fromCurrency'}
        />
      )}
      {toCurrencies?.length > 0 && (
        <SelectExCurrencyBottomSheet
          data={toCurrencies}
          label={trans('Select Currency')}
          bottomSheetRef={toCurrencyBottomSheetRef}
          selectedItem={exchangeCurrencyInfo.toCurrency}
          setError={setError}
          error={error}
          handleSetInfo={handleToCurrency}
          name={'toCurrency'}
        />
      )}
    </>
  );
};

export default CreateExchangeCurrency;
