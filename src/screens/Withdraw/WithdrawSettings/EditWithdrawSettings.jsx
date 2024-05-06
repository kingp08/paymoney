import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {CreateWithdrawStyle} from '../CreateWithdraw/CreateWithdraw.style';
import {useTheme} from '@react-navigation/native';
import {depositStyle} from '../../SendMoney/CreateSendMoney/CreateSendMoneyStyle';
import SelectInput from '../../components/CustomTextInput/SelectInput/SelectInput';
import RightIcon from '../../../assets/svg/rightArrow.svg';
import {addWithdrawSettingsStyle} from './AddWithdrawSettings.style';
import EditPaypalOption from './EditPaypalOption';
import EditCryptoOption from './EditCryptoOption';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {WITHDRAW_SETTINGS} from '../../../navigation/routeName/routeName';
import {
  cryptoAddressValidation,
  validateEmail,
} from '../../utilities/Validation/Validation';
import {useDispatch, useSelector} from 'react-redux';
import {updateInfo} from '../../../features/auth/login/loginApi';
import {getAllWithdrawSettingsLists} from '../../../features/slices/WithdrawLists/getWithdrawSettingsLists';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import SelectCountryBottomSheet from '../../Profile/EditProfile/BottomSheet/SelectCountry/SelectCountryBottomSheet';
import {useRef} from 'react';
import {handleSetInfo} from '../../utilities/handleFromData/handleFromData';
import config from '../../../../config';
import Loader from '../../../utils/Loader/Loader';
import { rs } from '../../../utils/styles/responsiveSize';
import { memo } from 'react';
import BankWithdraw from './BankWithdraw';
const EditWithdrawSettings = ({route, navigation}) => {
  const {user: {token = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const {userInfo} = useSelector(state => state.profileReducer);
  const dispatch = useDispatch();
  const countryBottomSheetRef = useRef(null);
  const {t:trans} = useTranslation();
  const {item, setWithdrawMethod, setWithdrawCurrency} = route.params;

  const {colors} = useTheme();
  const createWithdrawstyle = CreateWithdrawStyle(colors);
  const [allCountries, setAllCountries] = useState([]);

  const style = addWithdrawSettingsStyle(colors);
  const [loading, setLoading] = useState(false);
  const handleCountryBottomSheet = () => {
    setAllCountries(userInfo?.countries);
    countryBottomSheetRef.current?.snapToIndex(0);
  };

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
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(errorText);
  const [validEmail, setValidEmail] = useState(true);
  const [cryptoError, setCryptoError] = useState(false);
  const [withdrawOptionPaypal, setWithdrawOptionPaypal] = useState(
    initialPaypalSettings,
  );

  const [withdrawOptionBank, setWithdrawOptionBank] =
    useState(initialBankSettings);

  const [withdrawOptionCrypto, setWithdrawOptionCrypto] = useState(
    initialCryptoSettings,
  );
  const handleError = () => {
    const {email} = withdrawOptionPaypal;
    const {
      account_holders_name,
      account_number,
      swift_code,
      bank_name,
      branch_name,
      branch_city,
      branch_address,
      country,
    } = withdrawOptionBank;
    const {code, crypto_address} = withdrawOptionCrypto;
    const errorEmail = email === '' ? true : false;
    const errorAccountName = account_holders_name === '' ? true : false;
    const errorAccountNumber = account_number === '' ? true : false;
    const errorSwiftCode = swift_code === '' ? true : false;
    const errorBankName = bank_name === '' ? true : false;
    const errorBranchName = branch_name === '' ? true : false;
    const errorBranchCity = branch_city === '' ? true : false;
    const errorBranchAddress = branch_address === '' ? true : false;
    const errorCountry = selectedCountry === '' || 'undefined' ? true : false;
    const errorCode = code === '' ? true : false;
    const errorCryptoAddress = crypto_address === '' ? true : false;
    setError({
      ...error,
      email: errorEmail,
      account_holders_name: errorAccountName,
      account_number: errorAccountNumber,
      swift_code: errorSwiftCode,
      bank_name: errorBankName,
      branch_name: errorBranchName,
      branch_city: errorBranchCity,
      branch_address: errorBranchAddress,
      country: errorCountry,
      code: errorCode,
      crypto_address: errorCryptoAddress,
    });
  };
  const handleChange = (value, name) => {
    if (item.hasOwnProperty('email')) {
      if (name === 'email') {
        if (validateEmail(value)) {
          setWithdrawOptionPaypal({...withdrawOptionPaypal, [name]: value});
          setError({...error, email: false});
          setValidEmail(true);
        } else {
          setWithdrawOptionPaypal({...withdrawOptionPaypal, [name]: value});
          setError({...error, email: true});
          setValidEmail(false);
        }
      }
    }
    if (item.hasOwnProperty('crypto_address')) {
      if (name === 'crypto_address' && !withdrawOptionCrypto.code) {
        setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
        setError({...error, crypto_address: false});
      } else if (name === 'crypto_address' && withdrawOptionCrypto.code) {
        if (cryptoAddressValidation(value, withdrawOptionCrypto.code)) {
          setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
          setError({...error, crypto_address: false});
          setCryptoError(false);
        } else {
          if (!value.length) {
            setCryptoError(false);
            setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
            setError({...error, crypto_address: true});
          } else {
            setCryptoError(true);
            setWithdrawOptionCrypto({...withdrawOptionCrypto, [name]: value});
            setError({...error, crypto_address: true});
          }
        }
      } else if ((name = 'code')) {
        if (withdrawOptionCrypto.crypto_address) {
          if (
            cryptoAddressValidation(withdrawOptionCrypto.crypto_address, value)
          ) {
            setError({...error, code: false, crypto_address: false});
            setCryptoError(false);
          } else {
            setError({...error, code: false, crypto_address: true});
            setCryptoError(true);
          }
        } else {
          setError({...error, code: false});
          setCryptoError(false);
        }
      }
    }
  };

  const handleSubmit = async () => {
    const {email} = withdrawOptionPaypal;
    const {
      account_holders_name,
      account_number,
      swift_code,
      bank_name,
      branch_name,
      branch_city,
      branch_address,
    } = withdrawOptionBank;
    const {valid_account_holders_name,
      valid_account_number,
      valid_swift_code,
      valid_bank_name,
      valid_branch_name,
      valid_branch_city,
      }=error
    const {code, crypto_address} = withdrawOptionCrypto;
    if (item.hasOwnProperty('email')) {
      if (email && validEmail) {
        setLoading(true);
        const paypalData = {
          ...withdrawOptionPaypal,
          payment_method: 'Paypal',
        };
        const updatedPaypalData = {
          email: paypalData.email,
          payment_method: 'Paypal',
        };
        const URL = `${config.BASE_URL_VERSION}/withdrawal-settings/${paypalData.id}`;
        const res = await updateInfo(updatedPaypalData, URL, token);
        const {records, status} = res.response;

        handleEditMethod(records, status);
      } else {
        setLoading(false);
        handleError();
      }
    } else if (item.hasOwnProperty('swift_code')) {
      if (
        account_holders_name &&
        account_number &&
        swift_code &&
        bank_name &&
        branch_name &&
        branch_city &&
        branch_address &&
        selectedCountry && 
        valid_account_holders_name &&
        valid_account_number &&
        valid_swift_code &&
        valid_bank_name && 
        valid_branch_city &&
        valid_branch_name
      ) {
        setLoading(true);
        const bankData = {...withdrawOptionBank,
          payment_method: 'Bank',
          account_name: account_holders_name,
          account_number: account_number,
          swift_code: swift_code,
          bank_name: bank_name,
          bank_branch_name: branch_name,
          bank_branch_city: branch_city,
          bank_branch_address: branch_address,
          country: selectedCountry.id,
        };

        const URL = `${config.BASE_URL_VERSION}/withdrawal-settings/${bankData.id}`;
        const res = await updateInfo(bankData, URL, token);
        const {records, status} = res.response;

        handleEditMethod(records, status);
      } else {
        setLoading(false);
        handleError();
      }
    } else if (item.hasOwnProperty('crypto_address')) {
      if (crypto_address && code && !cryptoError) {
        setLoading(true);
        const cryptoData = {
          ...withdrawOptionCrypto,
          payment_method: 'Crypto',
        };

        const URL = `${config.BASE_URL_VERSION}/withdrawal-settings/${cryptoData.id}`;
        const res = await updateInfo(cryptoData, URL, token);
        const {records, status} = res.response;

        handleEditMethod(records, status);
      } else {
        setLoading(false);
        handleError();
      }
    }
  };
  const handleEditMethod = async (records, status) => {
    if (Array.isArray(records)) {
      if (records.length === 0) {
        if (status.code === 200) {
          const URL = `${config.BASE_URL_VERSION}/withdrawal-settings`;
          const updatedSettingsList = await dispatch(
            getAllWithdrawSettingsLists({token, URL}),
          );
          handleToaster(
            trans('Payout settings updated successfully'),
            'success',
            colors,
          );
          navigation.navigate(WITHDRAW_SETTINGS,{
            setSelectedMethod :setWithdrawMethod,
            setSelectedCurrency:setWithdrawCurrency
          });
          if (setWithdrawMethod) {
            updatedSettingsList.payload.response.records.length > 0
              ? setWithdrawMethod(
                  updatedSettingsList.payload.response.records[0],
                )
              : (setWithdrawMethod(null), setWithdrawCurrency(null));
          }
        }
      }
    } else {
      setLoading(false);
      handleToaster(trans(Object.values(records)[0]), 'error', colors);
    }
  };
  return (
    <>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <View style={style.elememtsContainer}>
          <View style={createWithdrawstyle.methodContainer}>
            <Text style={depositStyle(colors).inputTitle}>{trans('Method')}</Text>
            <SelectInput
              style={createWithdrawstyle.transactionStepContainer}
              title={
                item.hasOwnProperty('email')
                  ? 'Paypal'
                  : item.hasOwnProperty('swift_code')
                  ? 'Bank'
                  : 'Crypto'
              }
              icon={<RightIcon fill={colors.manatee} />}
            />
          </View>
          {item.hasOwnProperty('email') && (
            <View>
              <EditPaypalOption
                item={item}
                withdrawOptionPaypal={withdrawOptionPaypal}
                setWithdrawOptionPaypal={setWithdrawOptionPaypal}
                handleChange={handleChange}
                error={error}
                validEmail={validEmail}
              />
            </View>
          )}
          {item.hasOwnProperty('swift_code') && (
            <View>
              <BankWithdraw
                item={item}
                withdrawOptionBank={withdrawOptionBank}
                setWithdrawOptionBank={setWithdrawOptionBank}
                handleChange={handleChange}
                error={error}
                setError={setError}
                setSelectedCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
                handleCountryBottomSheet={handleCountryBottomSheet}
              />
            </View>
          )}
          {item.hasOwnProperty('crypto_address') && (
            <View>
              <EditCryptoOption
                item={item}
                withdrawOptionCrypto={withdrawOptionCrypto}
                setWithdrawOptionCrypto={setWithdrawOptionCrypto}
                handleChange={handleChange}
                error={error}
                cryptoError={cryptoError}
              />
            </View>
          )}
          <View style={style.btnContainer}>
            <CustomButton
              onPress={!loading ? handleSubmit : null}
              style={createWithdrawstyle.customButton}
              bgColor={colors.cornflowerBlue}
              color={colors.white}
              title={
                !loading ? (
                  trans('Update')
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
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(WITHDRAW_SETTINGS)}>
              <Text style={depositStyle(colors).cancelBtn}>{trans('Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <SelectCountryBottomSheet
        data={allCountries}
        bottomSheetRef={countryBottomSheetRef}
        setSelectedItem={setSelectedCountry}
        selectedItem={selectedCountry}
        label={trans('Select Country')}
        name={'defaultCountry'}
        handleSetInfo={handleSetInfo}
      />
    </>
  );
};

export default memo(EditWithdrawSettings);
