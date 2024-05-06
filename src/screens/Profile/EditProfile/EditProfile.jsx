import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  VirtualizedList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {editProfileStyle} from './editProfileStyle';
import {useTheme} from '@react-navigation/native';
import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postInfo} from '../../../features/auth/login/loginApi';
import BottomButton from '../../components/BottomButton/BottomButton';
import SelectCurrencyBottomSheet from './BottomSheet/SelectCurrency/SelectCurrencyBottomSheet';
import SelectCountryBottomSheet from './BottomSheet/SelectCountry/SelectCountryBottomSheet';
import SelectTimeZoneBottomSheet from './BottomSheet/SelectTimeZone/SelectTimeZoneBottomSheet';
import {getProfileSummary} from '../../../features/slices/user/getProfile/getProfile';
import {updateUserInfo} from '../../../features/auth/login/loginSlice';
import UploadImage from './UploadImage';
import InputComponent from './InputComponent';
import SelectInputComponent from './SelectInputComponent';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import config from '../../../../config';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import { rs } from '../../../utils/styles/responsiveSize';
import Loader from '../../../utils/Loader/Loader';
import { getMyWallets } from '../../../features/slices/myWallets/myWallets';
const initialError = {
  first_name: false,
  last_name: false,
  ownIdentity: false,
};
const EditProfile = ({navigation}) => {
  const {user: loginUserData} = useSelector(state => state.loginUserReducer);
  const {isConnected} = useContext(NetworkContext);
  const {token} = loginUserData || {};
  const {userInfo} = useSelector(state => state.profileReducer) || {};
  const {colors} = useTheme();
  const styles = editProfileStyle(colors);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [phnDetails, setPhnDetails] = useState({
    phone: '',
    code: '',
    countryCode: '',
  });
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [error, setError] = useState(initialError);
  const [allCountries, setAllCountries] = useState([]);
  const [allTimezones, setAllTimezones] = useState([]);
  const [allWallets, setAllWallets] = useState([]);
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [currency, setCurrency] = useState('');
  const currencyBottomSheetRef = useRef(null);
  const countryBottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const timezoneBottomSheetRef = useRef(null);
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const [validNumber, setValidNumber] = useState(true);
  const [checkValidIdentity, setCheckValidIdentity] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const {t:trans} = useTranslation();
  useEffect(() => {
    async function fetchData() {
      let isMounted = true;
      if (isMounted && Object.keys(userInfo)?.length === 0) {
        const res = await dispatch(getProfileSummary({token}));
        if (res?.payload) {
          updateProfile(res?.payload);
          dispatch(getMyWallets({token}));
        }
      } else {
        updateProfile(userInfo);
      }
      return () => {
        isMounted = false;
      };
    }
    fetchData();
  }, [dispatch]);
  const updateProfile = res => {
    const {
      address,
      city,
      phone,
      timezone,
      country_id,
      state,
      first_name,
      last_name,
      email,
      carrierCode,
      picture,
      defaultCountry,
      countries,
      wallets,
      formattedPhone,
    } = res || {};

    const exitsCountry = countries?.find(
      curr => curr?.id === Number(country_id),
    );
    const exitsCurrency = wallets?.find(curr => curr.is_default === 'Yes');
    setFirstName(first_name);
    setLastName(last_name);
    setEmail(email);
    setPhnDetails({
      ...phnDetails,
      phone: phone?.includes(carrierCode)
        ? phone?.split('+'+carrierCode)[1]
        : phone,
      code: carrierCode?.includes('+')
        ? carrierCode?.split('+')[1]
        : carrierCode,
      countryCode: defaultCountry,
    });
    setAddress(address);
    setCity(city);
    setState(state);
    setProfileImage(picture);
    setCountry(exitsCountry || '');
    setCurrency(exitsCurrency?.currency || '');
    setTimezone(timezone);
    const updateLoginInfo = {
      ...loginUserData,
      picture,
      first_name,
      last_name,
      email,
      formattedPhone,
    };
    const result =
      JSON.stringify(loginUserData) == JSON.stringify(updateLoginInfo);
    !result &&
      setTimeout(() => dispatch(updateUserInfo(updateLoginInfo)), 1000);
  };
  const handleCurrencyBottomSheet = () => {
    setAllWallets(userInfo?.wallets);
    currencyBottomSheetRef.current?.snapToIndex(0);
  };
  const handleCountryBottomSheet = () => {
    setAllCountries(userInfo?.countries);
    countryBottomSheetRef.current?.snapToIndex(0);
  };
  const handleTimezoneBottomSheet = () => {
    setAllTimezones(userInfo?.timezones);
    timezoneBottomSheetRef.current?.snapToIndex(0);
  };
  const handleError = () => {
    const errorFirst_name = firstName === '' ? true : false;
    const errorLast_name = lastName === '' ? true : false;
    setError({
      ...error,
      first_name: errorFirst_name,
      last_name: errorLast_name,
    });
  };
  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (
      firstName &&
      lastName &&
      validNumber &&
      !error?.ownIdentity &&
      isConnected
    ) {
      setUpdateProfileLoading(true);
      const URL = `${config.BASE_URL_VERSION}/profile/update`;
      const obj = {
        address_1: address,
        city: city,
        phone: phnDetails.phone,
        first_name: firstName,
        last_name: lastName,
        state: state,
        timezone: timezone,
        default_wallet: currency?.id,
        country_id: country.id,
        formattedPhone: `+${phnDetails.code + phnDetails.phone}`,
        defaultCountry: phnDetails.countryCode,
        carrierCode: phnDetails.code,
      };
      const res = await postInfo(obj, URL, token, 'PUT');
      if (res) {
        const {
          status: {code, message},
        } = res?.response;
        setUpdateProfileLoading(false);
        if (code === 200) {
          navigation.goBack();
          const updateLoginInfo = {
            ...loginUserData,
            first_name: firstName,
            last_name: lastName,
            formattedPhone: phnDetails.phone
              ? `+${phnDetails.code + phnDetails.phone}`
              : null,
          };
          handleToaster(trans("Profile successfully updated"), 'success', colors);
          dispatch(getProfileSummary({token}));
          dispatch(updateUserInfo(updateLoginInfo));
          dispatch(getMyWallets({token}));
        } else {
          handleToaster(trans(message), 'warning', colors);
        }
      }
    } else {
      handleError();
    }
  };
  const data = new Array(1).fill().map((_, index) => ({key: index.toString()}));
  const [fastLoad, setFastLoad] = useState(true);
  setTimeout(() => {
    setFastLoad(false);
  }, 0);
  setTimeout(() => setShowBottomSheet(true), 1000);
  if (fastLoad) return <View style={styles.scroll_view} />;
  return (
    <>
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <VirtualizedList
          data={data}
          style={styles.scroll_view}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <UploadImage
                  data={{
                    profileImage,
                    setProfileImage,
                    isConnected,
                    userInfo,
                    loginUserData,
                  }}
                />
                <View style={styles.inputCont}>
                  <InputComponent
                    data={{
                      firstName,
                      setFirstName,
                      lastName,
                      setLastName,
                      email,
                      setEmail,
                      address,
                      setAddress,
                      city,
                      setCity,
                      state,
                      setState,
                      validNumber,
                      setValidNumber,
                      error,
                      setPhnDetails,
                      phnDetails,
                      setCheckValidIdentity,
                      token,
                      setError,
                      isConnected,
                    }}
                  />
                  <SelectInputComponent
                    data={{
                      handleCountryBottomSheet,
                      handleTimezoneBottomSheet,
                      handleCurrencyBottomSheet,
                      country,
                      timezone,
                      currency,
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          getItemCount={() => data.length}
          getItem={(data, index) => data[index]}
          keyExtractor={item => item}
        />
        <BottomButton
          disable={checkValidIdentity ? true : false}
          yes={
            !updateProfileLoading ? (
              trans('Save Changes')
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
          onPress={
            !updateProfileLoading || checkValidIdentity ? handleSubmit : null
          }
          no={trans('Cancel')}
        />
      </KeyboardAvoidingView>
      {showBottomSheet && (
        <>
          <SelectCurrencyBottomSheet
            data={allWallets}
            bottomSheetRef={currencyBottomSheetRef}
            setSelectedItem={setCurrency}
            selectedItem={currency}
            label={trans('Select Currency')}
          />
          <SelectCountryBottomSheet
            data={allCountries}
            bottomSheetRef={countryBottomSheetRef}
            setSelectedItem={setCountry}
            selectedItem={country}
            label={trans('Select Country')}
          />
          <SelectTimeZoneBottomSheet
            data={allTimezones}
            bottomSheetRef={timezoneBottomSheetRef}
            setSelectedItem={setTimezone}
            selectedItem={timezone}
            label={trans('Select Timezone')}
          />
        </>
      )}
    </>
  );
};

export default EditProfile;
