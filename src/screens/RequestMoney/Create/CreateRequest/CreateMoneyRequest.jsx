import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  CONFIRM_MONEY_REQUEST,
  CREATE_MONEY_REQUEST,
  HOME,
  SCAN_QR_CODE,
} from '../../../../navigation/routeName/routeName';
import {useTheme} from '@react-navigation/native';
import {moneyRequestStyle} from './createRequest.style';
import TransactionStep from '../../../components/TransactionStep/TransactionStep';
import CustomInput from '../../../components/CustomInput/CustomInput';
import {
  debounceValidation,
  validateEmail,
  validationPhone,
} from '../../../utilities/Validation/Validation';
import SelectInput from '../../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../../assets/svg/rightArrow.svg';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import CustomPhoneNumberInput from '../../../components/CustomTextInput/CustomPhoneNumberInput/CustomPhoneNumberInput';
import {handleSetInfo} from '../../../utilities/handleFromData/handleFromData';
import SelectCurrencyBottomSheet from './SelectCurrencyBottomSheet/SelectCurrencyBottomSheet';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {NetworkContext} from '../../../../utils/Network/NetworkProvider';
import ErrorMessage from '../../../utilities/ErrorMessage/ErrorMessage';
import {
  checkCurrencies,
  handleCurrency,
} from './functionality/RequestMoneyCurrencies';
import {checkValidRequest} from './functionality/CheckRequestValidity';
import Loader from '../../../../utils/Loader/Loader';
import Scan from '../../../../assets/svg/scan.svg';
import { rs } from '../../../../utils/styles/responsiveSize';
const errorText = {
  email: false,
  currency: false,
  amount: false,
  addNote: false,
  phone: false,
  email_or_phone: false,
  ownIdentity: false,
};
const CreateMoneyRequest = ({navigation, route}) => {
  const receiverData = route?.params?.data;
  const initialState = {
    email: receiverData?.receiverEmail||'',
    code : receiverData?.carrierCode || '' ,
    phone : receiverData?.phone || '' ,
    countryCode : receiverData?.defaultCountry || '',
    currency: '',
    addNote: '',
    email_or_phone: '',
    amount: '',
    amount_crypto: '',
  };
  const {isConnected} = useContext(NetworkContext);
  const {colors} = useTheme();
  const currencyBottomSheetRef = useRef(null);
  const count = useRef(8);
  const [amount, setAmount] = useState('');
  const {user: {token = '', email, formattedPhone} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {preference, loading: preferenceLoading} = useSelector(
    state => state.preference,
  );
  const {processedBy: preferenceProcessed, loading: processedLoading} =
    useSelector(state => state.preferenceForProcessedType);
  const {t:trans} = useTranslation();
  let {processedBy:processedPreference} = preferenceProcessed || {};
  const getProcessedBy=(value, processed)=>{
    return value?.phone?"phone":value?.receiverEmail?'email':processed||'email';
  }
  let processedBy = getProcessedBy(receiverData,processedPreference);
  const {decimal_format_amount, decimal_format_amount_crypto} =
    preference || {};
  const styles = moneyRequestStyle(colors);
  const {data, loading} = useSelector(state => state.getCurrencies);
  const [checkAuth, setCheckAuth] = useState(true);
  const [checkValidity, setCheckValidity] = useState(true);
  const [email_or_phoneError, setEmail_Or_PhoneError] = useState(false);
  const [moneyRequest, setMoneyRequest] = useState(initialState);
  useEffect(()=>{
    if(receiverData){
      setEmail_Or_PhoneError(false)
      setMoneyRequest({...moneyRequest,
        email:receiverData?.receiverEmail||'',
        code : receiverData?.carrierCode || '' ,
        phone : receiverData?.phone || '' ,
        countryCode : receiverData?.defaultCountry || '',
      });
    }
  },[receiverData]);
  const [validNumber, setValidNumber] = useState(true);
  const [error, setError] = useState(errorText);
  const handleWalletBottomSheet = () => {
    Keyboard.dismiss();
    currencyBottomSheetRef.current?.snapToIndex(0);
  };
  const handleError = () => {
    const {email, currency, addNote, email_or_phone, phone} = moneyRequest;
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
  const dispatch = useDispatch();
  useEffect(() => {
    checkCurrencies({
      isConnected,
      dispatch,
      token,
      setCheckAuth,
      setCheckValidity,
      colors,
      setMoneyRequest,
      moneyRequest,
      trans,
    });
  }, [dispatch]);
  useEffect(()=>{
    if(receiverData){
      setMoneyRequest({...moneyRequest,
        email: receiverData?.receiverEmail||'',
        code : receiverData?.carrierCode || '' ,
        phone : receiverData?.phone || '' ,
        countryCode : receiverData?.defaultCountry || '',
      });
      
    }
  },[receiverData]);
  const doCheckValidity = value =>
    checkValidRequest({
      value,
      setMoneyRequest,
      setError,
      error,
      processedBy,
      isConnected,
      email,
      formattedPhone,
      trans,
      moneyRequest,
    });
  const HandleProceed = async () => {
    const {currency, addNote} = moneyRequest;
    if (
      moneyRequest[processedBy] &&
      addNote &&
      currency &&
      !error.ownIdentity &&
      amount > 0 &&
      validNumber &&
      !email_or_phoneError &&
      !(loading || preferenceLoading || processedLoading) &&
      isConnected &&
      checkAuth
    ) {
      navigation.navigate(CONFIRM_MONEY_REQUEST, {
        moneyRequest,
        amount,
      });
    } else {
      checkAuth && isConnected && handleError();
    }
  };
  const memorizedCurrency = item =>
    handleCurrency({item, setMoneyRequest, moneyRequest, setAmount});
  const fastLoad = useRef(false);
  const [openBottomSheet, setOpenBottomSheet]=useState(false);
  useEffect(()=>{ fastLoad.current = true;},[])
   setTimeout(() => {
    setOpenBottomSheet(true);
  },300);
  if (!fastLoad?.current) return <View style={styles.scroll_view} />;
  const handleQRScan = () => {
    !receiverData?navigation.navigate(SCAN_QR_CODE, {
      method: {
        method: trans('Request Money'),
        goToScreen: CREATE_MONEY_REQUEST,
      },
    }):null;
 };
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
                header={trans('Create Request')}
                presentStep={1}
                totalStep={2}
                description={trans('You can request for money from our registered or unregistered users.')}
                style={styles.transactionStep}
              />
              <View style={styles.email}>
                {processedBy === 'phone' ? (
                  <CustomPhoneNumberInput
                    label={trans('Phone') + '*'}
                    phnDetails={moneyRequest}
                    setPhnDetails={setMoneyRequest}
                    setIsValidNumber={setValidNumber}
                    disabled={receiverData?.phone ? true : false}
                    handlePhoneNumber={number => {
                      doCheckValidity(number);
                    }}
                    style={styles.inputWidth}
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
                    error={
                      !validNumber ||
                      (error.ownIdentity && moneyRequest.phone) ||
                      (error.phone && !moneyRequest.phone)
                    }
                    isError={
                      (!validNumber &&
                        formattedPhone &&
                        trans('This number is Invalid.')) ||
                      (error.ownIdentity && moneyRequest[processedBy]
                        ? error.ownIdentity
                        : '') ||
                      (error[processedBy] &&
                        !moneyRequest[processedBy] &&
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
                    editable={receiverData?.receiverEmail && false}
                    onChangeText={text => {
                      (
                        processedBy === 'email_or_phone'
                          ? validateEmail(text) || validationPhone(text)
                          : validateEmail(text)
                      )
                        ? (setEmail_Or_PhoneError(false), doCheckValidity(text))
                        : (setEmail_Or_PhoneError(true), doCheckValidity(text));
                    }}
                    isError={
                      (email_or_phoneError && moneyRequest[processedBy]) ||
                      (error[processedBy] && !moneyRequest[processedBy]) ||
                      (error.ownIdentity && moneyRequest[processedBy])
                    }
                    value={moneyRequest[processedBy]}
                    style={styles.contentWidth}
                    error={
                      (processedBy === 'email' &&
                        email_or_phoneError &&
                        moneyRequest[processedBy] &&
                        trans('Your email is not valid.')) ||
                      (processedBy === 'email_or_phone' &&
                        email_or_phoneError &&
                        moneyRequest[processedBy] &&
                        trans('Please enter valid email') +
                          ' (ex: user@gmail.com) ' +
                          trans('or phone') +
                          ' (ex: +12015550123)') ||
                      (error.ownIdentity && moneyRequest[processedBy]
                        ? error.ownIdentity
                        : '') ||
                      (error[processedBy] &&
                        !moneyRequest[processedBy] &&
                        trans('This field is required.'))
                    }
                    returnKeyType={'done'}
                  />
                )}
              </View>
              <View style={styles.mb_16}>
                <SelectInput
                  label={trans('Currency') + '*'}
                  onPress={() => handleWalletBottomSheet()}
                  title={moneyRequest.currency?.code}
                  style={styles.contentWidth}
                  isError={error.currency && !moneyRequest.currency?.code}
                  error={error.currency ? trans('This field is required.') : ''}
                  icon={
                    loading ? (
                      <View>
                      <Loader
                        source={require('../../../../assets/lottie/loader.json')}
                        size={styles.lottie}
                        color={colors.textTertiaryVariant}
                      />
                    </View>
                    ) : (
                      <RightIcon fill={colors.manatee} />
                    )
                  }
                />
              </View>
              <View style={styles.mb_16}>
                <CustomInput
                  label={trans('Amount') + '*'}
                  placeholder={
                    moneyRequest.currency.type == 'crypto'
                      ? `${parseFloat(0.0).toFixed(
                          decimal_format_amount_crypto,
                        )}`
                      : `${parseFloat(0.0).toFixed(decimal_format_amount)}`
                  }
                  keyboardAppearance={'dark'}
                  value={amount}
                  keyboardType={'number-pad'}
                  onChangeText={text => {
                    setAmount(
                      debounceValidation(
                        text,
                        8,
                        moneyRequest.currency.type == 'crypto'
                          ? decimal_format_amount_crypto
                          : decimal_format_amount,
                        count,
                      ),
                    );
                  }}
                  isError={
                    (error.amount && !amount) || (!(amount > 0) && amount)
                  }
                  style={styles.contentWidth}
                  returnKeyType={'done'}
                  error={
                    !(amount > 0) && amount
                      ? trans('Please enter a valid number.')
                      : error.amount
                      ? trans('This field is required.')
                      : ''
                  }
                  maxLength={Number(count.current)}
                />
              </View>
              <View style={styles.mb_20}>
                <CustomInput
                  label={trans('Add Note') + '*'}
                  placeholder={trans('Description')}
                  multiline={true}
                  numberOfLines={5}
                  style={styles.addNote}
                  value={moneyRequest.addNote}
                  onChangeText={text =>
                    handleSetInfo(
                      'addNote',
                      text,
                      setMoneyRequest,
                      moneyRequest,
                      setError,
                      error,
                    )
                  }
                  textAlignVertical={'top'}
                  isError={error.addNote && !moneyRequest.addNote}
                  error={error.addNote ? trans('This field is required.') : ''}
                  returnKeyType={'done'}
                />
              </View>
              <CustomButton
                title={trans('Proceed')}
                onPress={
                  loading || !(isConnected && checkAuth && checkValidity)
                    ? null
                    : HandleProceed
                }
                bgColor={colors.cornflowerBlue}
                style={styles.btnWidth}
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
      {data?.currencies?.length > 0 && openBottomSheet && (
        <SelectCurrencyBottomSheet
          data={{
            title: trans('Select Currency'),
            value: data?.currencies,
          }}
          bottomSheetRef={currencyBottomSheetRef}
          setSelectedItem={setMoneyRequest}
          selectedItem={moneyRequest}
          setError={setError}
          error={error}
          handleSetInfo={memorizedCurrency}
          name={'currency'}
        />
      )}
    </>
  );
};

export default CreateMoneyRequest;
