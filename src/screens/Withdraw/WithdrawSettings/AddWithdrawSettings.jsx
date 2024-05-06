import {
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {addWithdrawSettingsStyle} from './AddWithdrawSettings.style';
import {useTheme} from '@react-navigation/native';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {useState} from 'react';
import {useRef} from 'react';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';
import {CREATE_WITHDRAW} from '../../../navigation/routeName/routeName';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import PaypalWithdraw from './PaypalWithdraw';
import BankWithdraw from './BankWithdraw';
import CryptoWithdraw from './CryptoWithdraw';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import {useDispatch, useSelector} from 'react-redux';
import {getCryptoCurrencies} from '../../../features/slices/getCurrencies/getCryptoCurrencies';
import CryptoCurrencyBottomSheet from './CryptoCurrencyBottomSheet';
import {getWithdrawalMethods} from '../../../features/slices/getMethods/getAddWithdrawalMethods';
import AddWithdrawMethodBottomSheet from './AddWithdrawMethodBottomSheet';
import {hideMessage} from 'react-native-flash-message';
import {useTranslation} from 'react-i18next';
import {handleSetInfo} from '../../utilities/handleFromData/handleFromData';
import SelectCountryBottomSheet from '../../Profile/EditProfile/BottomSheet/SelectCountry/SelectCountryBottomSheet';
import config from '../../../../config';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import HandleChange from './HandleChange';
import useAddWithdrawSubmit from './useAddWithdrawSubmit';
import { rs } from '../../../utils/styles/responsiveSize';
import Loader from '../../../utils/Loader/Loader';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { VirtualizedList } from 'react-native';
import { memo } from 'react';

const AddWithdrawSettings = ({navigation, route}) => {
  const {t:trans} = useTranslation();
  const {isConnected} = useContext(NetworkContext);
  const {colors} = useTheme();
  const countryBottomSheetRef = useRef(null);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {cryptoData} = useSelector(
    state => state.getWithdrawCryptoCurrencies,
  );
  const {addWithdrawalMethodsData} = useSelector(
    state => state.getAddWithdrawalMethods,
  );


  const {setWithdrawMethod, setWithdrawCurrency} = route?.params || {};
  const {userInfo} = useSelector(state => state.profileReducer);

  const handleCountryBottomSheet = () => {
    setAllCountries(userInfo?.countries);
    countryBottomSheetRef.current?.snapToIndex(0);
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const style = addWithdrawSettingsStyle(colors);
  const createWithdrawstyle = CreateWithdrawStyle(colors);

  const paymentBottomSheetRef = useRef(null);
  const currencyBottomSheetRef = useRef(null);

  const [selectedMethod, setSelectedMethod] = useState({name: ''});
  const [cryptoError, setCryptoError] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [openBottomSheet, setOpenBottomSheet]=useState(false);
  const initialPaypalSettings = {
    email: '',
  };

  const initialBankSettings = {
    account_holders_name: '',
    account_number: '',
    swift_code: '',
    bank_name: '',
    branch_name: '',
    branch_city: '',
    branch_address: '',
    country: '',
  };

  const initialCryptoSettings = {
    id: '',
    code: '',
    crypto_address: '',
  };

  const errorText = {
    email: false,
    account_holders_name: false,
    account_number: false,
    swift_code: false,
    bank_name: false,
    branch_name: false,
    branch_city: false,
    branch_address: false,
    country: false,
    code: false,
    crypto_address: false,
    valid_account_holders_name:true,
    valid_account_number:true,
    valid_swift_code:true,
    valid_bank_name: true,
    valid_branch_name: true,
    valid_branch_city: true,
  };

  const [error, setError] = useState(errorText);

  const [withdrawOptionPaypal, setWithdrawOptionPaypal] = useState(
    initialPaypalSettings,
  );

  const [withdrawOptionBank, setWithdrawOptionBank] =
    useState(initialBankSettings);

  const [withdrawOptionCrypto, setWithdrawOptionCrypto] = useState(
    initialCryptoSettings,
  );

  const [useHandleChange] = HandleChange(
    {setError,
    error,
    setWithdrawOptionPaypal,
    withdrawOptionPaypal,
    setValidEmail,
    setWithdrawOptionBank,
    withdrawOptionBank,
    setWithdrawOptionCrypto,
    withdrawOptionCrypto,
    selectedMethod,
    setCryptoError,}
  );
  const [HandleSubmit] = useAddWithdrawSubmit(
    setError,
    error,
    withdrawOptionPaypal,
    withdrawOptionBank,
    withdrawOptionCrypto,
    selectedMethod,
    validEmail,
    setLoading,
    selectedCountry,
    setWithdrawMethod,
    setWithdrawCurrency,
    cryptoError
  );

  const handlePaymentIndex = () => {
    if (isConnected) {
      hideMessage();
      Keyboard.dismiss();
      setTimeout(() => {
        paymentBottomSheetRef.current?.snapToIndex(0);
      }, 300);
    }
  };

  const handleCurrencyIndex = () => {
    hideMessage();
    Keyboard.dismiss();
    setTimeout(() => {
      currencyBottomSheetRef.current?.snapToIndex(0);
    }, 300);
  };

  const getData=()=>{
    const URL = `${config.BASE_URL_VERSION}/withdrawal-setting/crypto-currencies`;
    const url = `${config.BASE_URL_VERSION}/withdrawal-setting/payment-methods`;
      Promise.all([dispatch(getCryptoCurrencies({ token, URL })), dispatch(getWithdrawalMethods({ token, url }))]);
  }
  useEffect(()=>{openBottomSheet && getData()},[dispatch , openBottomSheet]);
  setTimeout(() => {
    setOpenBottomSheet(true);
  }, 1000);
  const data = new Array(1).fill().map((_, index) => ({key: index.toString()}));
  return (
    <>
      <KeyboardAvoidingView style={style.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <VirtualizedList
        keyboardShouldPersistTaps={'always'}
        data={data}
        style={style.pageContainer}
        showsVerticalScrollIndicator={false}
        renderItem={()=>(<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={style.elememtsContainer}>
              <View style={createWithdrawstyle.methodContainer}>
                <Text style={depositStyle(colors).inputTitle}>
                  {trans('Method')}
                </Text>
                <SelectInput
                  style={createWithdrawstyle.transactionStepContainer}
                  title={selectedMethod?.name}
                  onPress={handlePaymentIndex}
                  icon={<RightIcon fill={colors.manatee} />}
                />
              </View>
              {openBottomSheet && <View>
                {selectedMethod?.name.toLowerCase() ===
                  'Paypal'.toLowerCase() && (
                  <PaypalWithdraw
                    withdrawOptionPaypal={withdrawOptionPaypal}
                    handleChange={useHandleChange}
                    error={error}
                    validEmail={validEmail}
                  />
                )}
                {selectedMethod?.name.toLowerCase() ===
                  'Bank'.toLowerCase() && (
                  <BankWithdraw
                    withdrawOptionBank={withdrawOptionBank}
                    handleChange={useHandleChange}
                    error={error}
                    setError={setError}
                    setWithdrawOptionBank={setWithdrawOptionBank}
                    handleCountryBottomSheet={handleCountryBottomSheet}
                    selectedCountry={selectedCountry}
                  />
                )}
                {selectedMethod?.name.toLowerCase() ===
                  'Crypto'.toLowerCase() && (
                  <CryptoWithdraw
                    withdrawOptionCrypto={withdrawOptionCrypto}
                    handleChange={useHandleChange}
                    error={error}
                    cryptoError={cryptoError}
                    handleCurrencyIndex={handleCurrencyIndex}
                  />
                )}
              </View>}
            </View>
            <View style={style.btnContainer}>
              <CustomButton
                disabled={cryptoError && selectedMethod?.name ==='Crypto' ? true : false}
                style={createWithdrawstyle.customButton}
                onPress={!loading ? HandleSubmit : null}
                title={
                  !loading ? (
                    trans('Add')
                  ) : (
                    <View>
                      <Loader
                        source={require('../../../assets/lottie/loader.json')}
                        size={{width: rs(65), height: rs(55)}}
                        color={colors.white}
                      />
                    </View>
                  )
                }
                bgColor={colors.cornflowerBlue}
                color={colors.white}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate(CREATE_WITHDRAW)}>
                <Text style={depositStyle(colors).cancelBtn}>
                  {trans('Cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>)}
         getItemCount={() => data.length}
         getItem={(data, index) => data[index]}
         keyExtractor={item => item}
        />
      </KeyboardAvoidingView>
      {addWithdrawalMethodsData?.length > 0 && openBottomSheet && (
        <AddWithdrawMethodBottomSheet
          data={{
            title: trans('Select Payment Method'),
            value: addWithdrawalMethodsData,
          }}
          bottomSheetRef={paymentBottomSheetRef}
          setSelectedItem={setSelectedMethod}
          selectedItem={selectedMethod}
          error={error}
          setError={setError}
          handleSetInfo={useHandleChange}
        />
      )}
      {cryptoData?.length > 0 && openBottomSheet && (
        <CryptoCurrencyBottomSheet
          data={{
            title: trans('Select Currency'),
            value: cryptoData,
          }}
          bottomSheetRef={currencyBottomSheetRef}
          setSelectedItem={setWithdrawOptionCrypto}
          selectedItem={withdrawOptionCrypto}
          error={error}
          setError={setError}
          handleSetInfo={useHandleChange}
        />
      )}
      {userInfo?.countries?.length > 0 && (
        <SelectCountryBottomSheet
          data={allCountries}
          bottomSheetRef={countryBottomSheetRef}
          setSelectedItem={setSelectedCountry}
          selectedItem={selectedCountry}
          label={trans('Select Country')}
          name={'defaultCountry'}
          handleSetInfo={handleSetInfo}
        />
      )}
    </>
  );
};

export default memo(AddWithdrawSettings);
