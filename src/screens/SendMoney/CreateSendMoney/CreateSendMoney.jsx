import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useRef, useState, useContext, useEffect} from 'react';

import {useTheme} from '@react-navigation/native';
import {
  CONFIRM_SEND_MONEY,
  CREATE_SEND_MONEY,
  HOME,
  SCAN_QR_CODE,
} from '../../../navigation/routeName/routeName';

import CustomInput from '../../components/CustomInput/CustomInput';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import TransactionStep from '../../components/TransactionStep/TransactionStep';
import {
  debounceValidation,
  validateEmail,
  validationPhone,
} from '../../utilities/Validation/Validation';
import CustomPhoneNumberInput from '../../components/CustomTextInput/CustomPhoneNumberInput/CustomPhoneNumberInput';
import SendMoneyCurrencyBottomSheet from './SendMoneyCurrencyBottomSheet';
import {depositStyle} from './CreateSendMoneyStyle';
import {useDispatch, useSelector} from 'react-redux';
import {handleSetInfo} from '../../utilities/handleFromData/handleFromData';

import {useTranslation} from 'react-i18next';
import {moneyRequestStyle} from '../../RequestMoney/Create/CreateRequest/createRequest.style';
import {hideMessage} from 'react-native-flash-message';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import ErrorMessage from '../../utilities/ErrorMessage/ErrorMessage';
import {checkCurrency, defaultCurrency} from './SendMoneyCurrencies';
import {doCheckValidity} from './EmailPhoneValidation';
import {checkAmount} from './AmountLimit';
import Loader from '../../../utils/Loader/Loader';
import Scan from '../../../assets/svg/scan.svg'
import { rs } from '../../../utils/styles/responsiveSize';
const CreateSendMoney = ({route, navigation}) => {
  const {isConnected} = useContext(NetworkContext);
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const currency = route?.params?.currency;
  const receiverData = route?.params?.data;
  const dispatch = useDispatch();
  const styles = moneyRequestStyle(colors);
  const {user: {token = '', email, formattedPhone} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {preference} = useSelector(state => state.preference);
  const {decimal_format_amount, decimal_format_amount_crypto} =
    preference || {};
  const {processedBy: preferenceProcessed} = useSelector(
    state => state.preferenceForProcessedType,
  );
  const [validNumber, setValidNumber] = useState(true);
  const [checkAuth, setCheckAuth] = useState(true);
  const [checkValidity, setCheckValidity] = useState(true);
  const [email_or_phoneError, setEmail_Or_PhoneError] = useState(false);
  let {processedBy:processedPreference} = preferenceProcessed || {};
  const getProcessedBy=(value, processed)=>{
    return value?.phone ? "phone" : value?.receiverEmail ? 'email' : processed;
  }
  let processedBy = getProcessedBy(receiverData,processedPreference);
  const {data, loading} = useSelector(state => state.getSendMoneyCurrencies);
  const [amountLoader, setAmountLoader] = useState(false);
  const currencyBottomSheetRef = useRef(null);
  const [amount, setAmount] = useState('');
  const [currencyData, setCurrencyData] = useState([]);
  const textInput = useRef('');
  const count = useRef(8);
  const [addNote, setAddNote]=useState('');

  const initialState = {
    email: receiverData?.receiverEmail||'',
    code : receiverData?.carrierCode || '' ,
    phone : receiverData?.phone || '' ,
    countryCode : receiverData?.defaultCountry || '',
    currency: '',
    phone: '',
    userEmail: '',
    email_or_phone: '',
  };
  const errorText = {
    email: false,
    currency: false,
    amount: false,
    addNote: false,
    phone: false,
    email_or_phone: false,
    ownIdentity: false,
  };

  const [sendMoney, setSendMoney] = useState(initialState);
  const [error, setError] = useState(errorText);

  const handleCurrencyIndex = () => {
    setCurrencyData(data?.currencies);
    currencyBottomSheetRef.current?.snapToIndex(0);
  };

  const handleError = () => {
    const {email, currency, email_or_phone, phone} = sendMoney;
    const errorEmail = email === '' ? true : false;
    const errorCurrency = currency === '' ? true : false;
    const errorAmount = amount === '' ? true : false;
    const errorAddNote = addNote === '' ? true : false;
    const errorUserEmail = email_or_phone === '' ? true : false;
    const errorPhone = phone === '' ? true : false;

    setError({
      ...error,
      email: errorEmail,
      currency: errorCurrency,
      amount: errorAmount,
      addNote: errorAddNote,
      email_or_phone: errorUserEmail,
      phone: errorPhone,
    });
  };

  const handleProceed = () => {
    const { currency} = sendMoney;
    if (
      sendMoney[processedBy] &&
      addNote &&
      currency &&
      !error.ownIdentity &&
      amount > 0 &&
      validNumber &&
      !loading &&
      isConnected &&
      checkAuth &&
      !email_or_phoneError &&
      !amountLoader &&
      !error.checkAmount
    ) {
      navigation.navigate(CONFIRM_SEND_MONEY, {
        sendMoney,
        setSendMoney,
        initialState,
        amount,
        setAmount,
        setError,
        error,
        errorText,
        textInput,
        addNote,
        setAddNote
        
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
        checkAmount(
          amount,
          isConnected,
          setAmountLoader,
          setError,
          error,
          setSendMoney,
          sendMoney,
          token,
          trans,
        );
      }, 500);
    };
    handler();
    return () => clearTimeout(timeoutId);
  }, [amount, sendMoney.currency?.code]);

  useEffect(() => {
    setAmount('');
    setError({...error, checkAmount: '', amount: false});
    setSendMoney({
      ...sendMoney,
      totalFees: '',
      feesFixed: '',
      feesPercentage: '',
    });
  }, [sendMoney.currency?.type]);

  useEffect(() => {
    checkCurrency(
      dispatch,
      isConnected,
      token,
      setCheckAuth,
      setCheckValidity,
      colors,
    );
  }, [dispatch]);

  useEffect(() => {
    defaultCurrency(currency, data, setSendMoney, sendMoney);
  }, [data]);
  const [openBottomSheet, setOpenBottomSheet]=useState(false);
  setTimeout(() => {
    setOpenBottomSheet(true);
  },300);
  useEffect(()=>{
    if(receiverData){
      setEmail_Or_PhoneError(false);
      setSendMoney({...sendMoney,
        email:receiverData?.receiverEmail||'',
        code : receiverData?.carrierCode || '' ,
        phone : receiverData?.phone || '' ,
        countryCode : receiverData?.defaultCountry || '',
      });
    }
  },[receiverData]);
  const handleQRScan = () => {
    !receiverData?navigation.navigate(SCAN_QR_CODE, {
      method: {
        method: trans('Send Money'),
        goToScreen: CREATE_SEND_MONEY,
      },
    }):null;
 };
  return (
    <>
      <KeyboardAvoidingView
        style={depositStyle(colors).pageVisibility}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={depositStyle(colors).scroll_view}
          keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={depositStyle(colors).container}>
              <View style={styles.contentWidth}>
                <TransactionStep
                  currentPage={trans('{{x}} of {{y}}', {
                    x: 1,
                    y: 2,
                  })}
                  header={trans('Fill Information')}
                  presentStep={1}
                  totalStep={2}
                  description={trans('Provide necessary information to send money securely. You can also provide a note for a reference.')}
                />
              </View>
              <View style={styles.email}>
                {processedBy === 'phone' ? (
                  <CustomPhoneNumberInput
                    label={trans('Phone') + '*'}
                    phnDetails={sendMoney}
                    setPhnDetails={setSendMoney}
                    setIsValidNumber={setValidNumber}
                    handlePhoneNumber={number => {
                      doCheckValidity(
                        number,
                        setSendMoney,
                        sendMoney,
                        isConnected,
                        processedBy,
                        email,
                        setError,
                        error,
                        formattedPhone,
                        trans,
                      );
                    }}
                    rightIcon={
                      <TouchableOpacity 
                        onPress={handleQRScan} 
                        style={styles.qrButton}
                        disabled={receiverData ? true : false}>
                        <Scan 
                          fill={colors.rightArrow} 
                          height={rs(25)} 
                          width={rs(25)} 
                        />
                      </TouchableOpacity>
                    }
                    style={styles.inputWidth}
                    disabled={receiverData?.phone ? true : false}
                    error={
                      !validNumber ||
                      (error.ownIdentity && sendMoney.phone) ||
                      (error.phone && !sendMoney.phone)
                    }
                    isError={
                      (!validNumber && trans('This number is Invalid.')) ||
                      (error.ownIdentity && sendMoney[processedBy]
                        ? error.ownIdentity
                        : '') ||
                      (error[processedBy] &&
                        !sendMoney[processedBy] &&
                        trans('This field is required.'))
                    }
                  />
                ) : (
                  <CustomInput
                    label={
                      processedBy === 'email_or_phone'
                        ? trans('Email') + '/' + trans('Phone') + '*'
                        : trans('Email') + '*'
                    }
                    placeholder={
                      processedBy === 'email_or_phone'
                        ? trans('e.g, user@email.com / +1588-6500')
                        : processedBy === 'email'
                        ? trans('e.g, user@gmail.com')
                        : trans('e.g, user@gmail.com')
                    }
                    keyboardAppearance={'dark'}
                    keyboardType={'email-address'}
                    inputMode={'email'}
                    autoCapitalize={'none'}
                    value={sendMoney[processedBy]}
                    editable={receiverData?.receiverEmail && false}
                    onChangeText={text => {
                      (
                        processedBy === 'email_or_phone'
                          ? validateEmail(text, setEmail_Or_PhoneError) || validationPhone(text)
                          : validateEmail(text, setEmail_Or_PhoneError)
                      )
                        ? (setCheckValidity(true),
                          setEmail_Or_PhoneError(false),
                          doCheckValidity(
                            text,
                            setSendMoney,
                            sendMoney,
                            isConnected,
                            processedBy,
                            email,
                            setError,
                            error,
                            formattedPhone,
                            trans,
                          ))
                        : (setEmail_Or_PhoneError(true),
                          setSendMoney({
                            ...sendMoney,
                            [processedBy]: text,
                          }));
                    }}
                    rightIcon={
                      <TouchableOpacity 
                        onPress={handleQRScan} 
                        style={styles.qrButton}>
                        <Scan 
                          fill={colors.rightArrow} 
                          height={rs(25)} 
                          width={rs(25)} 
                        />
                      </TouchableOpacity>
                    }
                    isError={
                      (email_or_phoneError && sendMoney[processedBy]) ||
                      (error[processedBy] && !sendMoney[processedBy]) ||
                      (error.ownIdentity && sendMoney[processedBy])
                    }
                    style={styles.contentWidth}
                    error={
                      (processedBy === 'email' &&
                        email_or_phoneError &&
                        sendMoney[processedBy] &&
                        trans('Your email is not valid.')) ||
                      (processedBy === 'email_or_phone' &&
                        email_or_phoneError &&
                        sendMoney[processedBy] &&
                        trans('Please enter valid email') +
                        ' (ex: user@gmail.com) ' +
                        trans('or phone') +
                        ' (ex: +12015550123)') ||
                      (error.ownIdentity && sendMoney[processedBy]
                        ? error.ownIdentity
                        : '') ||
                      (error[processedBy] &&
                        !sendMoney[processedBy] &&
                        trans('This field is required.'))
                    }
                    Ref={textInput}
                    returnKeyType={'done'}
                  />
                )}
              </View>
              <View style={depositStyle(colors).currencyContainer}>
                <Text style={depositStyle(colors).inputTitle}>
                  {trans('Currency')+ '*'}
                </Text>
                <SelectInput
                  style={styles.contentWidth}
                  title={sendMoney.currency?.code}
                  onPress={() => handleCurrencyIndex('currency')}
                  icon={
                    loading ? (
                      <View>
                      <Loader
                        source={require('../../../assets/lottie/loader.json')}
                        size={styles.lottie}
                        color={colors.textTertiaryVariant}
                      />
                    </View>
                    ) : (
                      <RightIcon fill={colors.manatee} />
                    )
                  }
                />
                <Text style={depositStyle(colors).feeText}>
                  {trans('Fee')} (
                  {`${
                    sendMoney.feesPercentage
                      ? sendMoney.feesPercentage
                      : sendMoney.currency.type == 'fiat'
                      ? parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount,
                        ) + '%'
                      : parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount_crypto,
                        ) + '%'
                  }`}{' '}
                  +{' '}
                  {`${
                    sendMoney.feesFixed
                      ? sendMoney.feesFixed
                      : sendMoney.currency.type == 'fiat'
                      ? parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount,
                        )
                      : parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount_crypto,
                        )
                  }`}
                  ) {trans('Total Fee')}:{' '}
                  {`${
                    sendMoney.totalFees
                      ? sendMoney.totalFees
                      : sendMoney.currency.type == 'fiat'
                      ? parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount,
                        )
                      : parseFloat(0.0).toFixed(
                          loading ? 2 : decimal_format_amount_crypto,
                        )
                  }`}
                </Text>
              </View>
              <View style={depositStyle(colors).currencyContainer}>
                <Text style={depositStyle(colors).inputTitle}>
                  {`${trans('Amount')}*`}
                </Text>
                <View>
                  <CustomInput
                    keyboardType="number-pad"
                    style={styles.contentWidth}
                    placeholder={
                      sendMoney.currency.type == 'fiat'
                        ? `${parseFloat(0.0).toFixed(decimal_format_amount)}`
                        : `${parseFloat(0.0).toFixed(
                            decimal_format_amount_crypto,
                          )}`
                    }
                    keyboardAppearance={'dark'}
                    value={amount}
                    isError={
                      error.amount ||
                      error.checkAmount ||
                      (amount <= 0 && amount)
                    }
                    error={
                      amount <= 0 && amount
                        ? trans('Please enter a valid number.')
                        : error.amount
                        ? trans('This field is required.')
                        : error.checkAmount && error.checkAmount
                    }
                    onChangeText={text => {
                      setAmountLoader(true);
                      setAmount(
                        debounceValidation(
                          text,
                          8,
                          sendMoney.currency.type == 'fiat'
                            ? decimal_format_amount
                            : decimal_format_amount_crypto,
                          count,
                        ),
                      );
                    }}
                    maxLength={Number(count.current)}
                  />
                </View>
              </View>
              <View style={depositStyle(colors).AddnoteContainer}>
                <Text style={depositStyle(colors).inputTitle}>
                  {trans('Add note')+ '*'}
                </Text>
                <CustomInput
                  multiline={true}
                  placeholder={trans('Description')}
                  numberOfLines={5}
                  style={{
                    ...styles.contentWidth,
                    ...depositStyle(colors).AddNoteheight,
                  }}
                  textAlignVertical={'top'}
                  value={addNote}
                  onChangeText={text =>
                    setAddNote(text)
                  }
                  isError={error.addNote && !addNote}
                  error={error.addNote ? trans('This field is required.') : ''}
                  returnKeyType={'done'}
                />
              </View>
              <CustomButton
                onPress={!amountLoader ? handleProceed : null}
                style={{
                  ...styles.contentWidth,
                  ...depositStyle(colors).customButtonMargin,
                }}
                disabled={amountLoader ? true : false}
                title={trans('Proceed')}
                bgColor={colors.cornflowerBlue}
                color={colors.white}
              />

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(HOME);
                  hideMessage();
                }}>
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
      {Array.isArray(currencyData) && openBottomSheet && (
        <SendMoneyCurrencyBottomSheet
          data={{
            title: trans('Select Currency'),
            value: data?.currencies,
          }}
          bottomSheetRef={currencyBottomSheetRef}
          setSelectedItem={setSendMoney}
          selectedItem={sendMoney}
          setError={setError}
          error={error}
          handleSetInfo={handleSetInfo}
          name={'currency'}
        />
      )}
    </>
  );
};

export default CreateSendMoney;
