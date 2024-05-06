import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import {signInStyle} from '../signin/SignInStyle';
import {useTheme} from '@react-navigation/native';
import UserIcon from '../../assets/svg/user-01.svg';
import LockIcon from '../../assets/svg/lock-unlocked.svg';
import EyeIcon from '../../assets/svg/eye.svg';
import EyeOffIcon from '../../assets/svg/eye-off.svg';
import MailIcon from '../../assets/svg/mail-01.svg';
import MechantIcon from '../../assets/svg/merchant.svg';
import light_logo from '../../assets/image/logo/light_logo.png';
import dark_logo from '../../assets/image/logo/dark_logo.png';
import CheckedIcon from '../../assets/svg/checkedFill.svg';
import {useState} from 'react';
import CustomInput from '../../screens/components/CustomInput/CustomInput';
import {signUpStyle} from './SignUpStyle';
import {rs} from '../../utils/styles/responsiveSize';
import CustomButton from '../../screens/components/Buttons/CustomButton/CustomButton';
import {MAIN_STACK, SIGN_IN} from '../../navigation/routeName/routeName';
import AccountType from '../../screens/components/AccountType/AccountType';
import PhnIcon from '../../assets/svg/phone.svg';
import CustomPhoneNumberInput from '../../screens/components/CustomTextInput/CustomPhoneNumberInput/CustomPhoneNumberInput';
import {handleSetInfo} from '../../screens/utilities/handleFromData/handleFromData';
import {registerUser} from '../../features/auth/registration/registrationSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {hideMessage} from 'react-native-flash-message';
import Loader from '../../utils/Loader/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { validName } from '../../screens/utilities/Validation/Validation';

const SignUp = ({navigation}) => {
  const {colors} = useTheme();
  const {theme} = useSelector(state => state.themeReducer);
  const dispatch = useDispatch();
  const {registrationLoader} = useSelector(state => state.registrationReducer);
  const {t:trans} = useTranslation();

  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    type: 'user',
    code: '',
    phone: '' ,
    countryCode: ''
  };
  const errorText = {
    first_name: false,
    last_name: false,
    email: false,
    phone: false,
    password: false,
  };
  const [signUpInfo, setSignUpInfo] = useState(initialState);
  const [error, setError] = useState(errorText);
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [eye, setEye] = useState(true);
  const [isCheckedIcon, setIsCheckedIcon] = useState(true);
  const [isChekedUser, setIsChekedUser] = useState(true);
  const [isChekedMerchant, setIsChekedMerchant] = useState(false);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const handleError = () => {
    const {first_name, last_name, email, phone, password} = signUpInfo;
    const errorFirstName = first_name === '' ? true : false;
    const errorLastName = last_name === '' ? true : false;
    const errorEmail = email === '' ? true : false;
    const errorPhone = phone === '' ? true : false;
    const errorPassword = password === '' ? true : false;
    setError({
      ...error,
      first_name: errorFirstName,
      last_name: errorLastName,
      email: errorEmail,
      password: errorPassword,
      phone: errorPhone,
    });
  };
  const handleSubmit = async () => {
    const { first_name, last_name, email, password, phone, type } = signUpInfo;
    if (!first_name || !last_name || !email || !password || !validEmail || !isValidNumber && phone || !validFirstName || !validLastName) {
      handleError();
      return;
    }
    if (password.length < 6) {
      handleToaster(
        trans('Password should be at least 6 characters.'),
        'warning',
        colors,
      );
      return;
      }
      const obj = {
        first_name, last_name,
        email,
        defaultCountry: signUpInfo.phone? signUpInfo.countryCode:'',
        phone: signUpInfo.phone ? ( signUpInfo.phone) : '',
        carrierCode: signUpInfo.code,
        formattedPhone: signUpInfo.phone ? ('+'+signUpInfo.code+signUpInfo.phone) : '',
        password, type,
      }
      
    const res = await dispatch(registerUser(obj));
    handleRegistration(
      res.payload.response.records,
      res.payload.response.status,
    );
  }
  

  const handleRegistration = async (records, status) => {
    if (status.code == 200) {
      handleToaster(trans(records[0].message), 'success', colors);
      navigation.replace('show-always', {screen: MAIN_STACK});
    } else {
      handleToaster(trans(Object.values(records)[0][0]), 'warning', colors);
    }
  };

  const {
    signInContainer,
    payMoneyIcon,
    welcomeText,
    passwordInputContainer,
    accountRegisterText,
    accountText,
    registerText,
    inputWidth,
    pageVisibility,
    imageLogo,safeArea
  } = signInStyle(colors);

  const {
    termsConditionsText,
    selectTextStyle,
    accountTypeContainer,
    firstAccountType,
    secondAccountType,
    phnIconPos,
  } = signUpStyle(colors, signUpInfo.phone);

  const handleSelection = type => {
    if (type == 'user') {
      setSignUpInfo({...signUpInfo, type: 'user'});
      setIsChekedUser(true);
      setIsChekedMerchant(false);
    } else {
      setSignUpInfo({...signUpInfo, type: 'merchant'});
      setIsChekedUser(false);
      setIsChekedMerchant(true);
    }
  };
  const handleSigninNavigation = () => {
    navigation.navigate(SIGN_IN);
    hideMessage();
  };
  const handlePhoneNumber = (value)=>{
    setSignUpInfo(prevState=>({...prevState, phone:value}))
  }
  const checkNameValidation = (value, setValue)=>{
    if(validName(value)){
      setValue(true);
      return;
    }
    setValue(false);
  }
  return (
    <SafeAreaView style={safeArea}>
    <StatusBar
       backgroundColor={colors.bgSecondary}
       barStyle={theme === 'light' ?'dark-content':'light-content'}
      />
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={pageVisibility}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <View style={signInContainer}>
          <View style={payMoneyIcon}>
            <Image
              style={imageLogo}
              source={theme === 'dark' ? dark_logo : light_logo}
              alt={trans('Logo')}
            />
          </View>
          <View>
            <Text style={welcomeText}>{trans('Join us now')}</Text>
          </View>
          <View style={passwordInputContainer}>
            <CustomInput
              style={inputWidth}
              leftIcon={<UserIcon fill={colors.mailIcon} />}
              placeholder={trans('First Name')}
              keyboardAppearance={'dark'}
              value={signUpInfo.first_name}
              onChangeText={text =>
                (checkNameValidation(text, setValidFirstName),
                handleSetInfo(
                  'first_name',
                  text,
                  setSignUpInfo,
                  signUpInfo,
                  setError,
                  error,
                ))
              }
              isError={error.first_name && !signUpInfo.first_name || !validFirstName && signUpInfo.first_name}
              error={!validFirstName  && signUpInfo.first_name && trans('Please enter a valid name without special characters or numbers.')||trans('This field is required.')}
            />
          </View>
          <View style={passwordInputContainer}>
            <CustomInput
              style={inputWidth}
              leftIcon={<UserIcon fill={colors.mailIcon} />}
              placeholder={trans('Last Name')}
              keyboardAppearance={'dark'}
              value={signUpInfo.last_name}
              onChangeText={text =>
                (checkNameValidation(text, setValidLastName),handleSetInfo(
                  'last_name',
                  text,
                  setSignUpInfo,
                  signUpInfo,
                  setError,
                  error,
                ))
              }
              isError={error.last_name && !signUpInfo.last_name || !validLastName && signUpInfo.last_name}
              error={!validLastName  && signUpInfo.last_name && trans('Please enter a valid name without special characters or numbers.')||trans('This field is required.')}
            />
          </View>
          <View style={passwordInputContainer}>
            <CustomInput
              style={inputWidth}
              leftIcon={<MailIcon fill={colors.mailIcon} />}
              placeholder={trans('Email Address')}
              keyboardAppearance={'dark'}
              keyboardType={'email-address'}
              inputMode={'email'}
              autoCapitalize={'none'}
              value={signUpInfo.email}
              onChangeText={text =>
                handleSetInfo(
                  'email',
                  text,
                  setSignUpInfo,
                  signUpInfo,
                  setError,
                  error,
                  setValidEmail,
                  setEmailError,
                )
              }
              isError={(error.email && !signUpInfo.email) || emailError}
              error={
                emailError
                  ? trans('Your email is not valid!')
                  : error.email
                  ? trans('This field is required.')
                  : ''
              }
            />
          </View>
          <View style={passwordInputContainer}>
            <CustomPhoneNumberInput
              phnDetails={signUpInfo}
              setPhnDetails={setSignUpInfo}
              setIsValidNumber={setIsValidNumber}
              style={inputWidth}
              handlePhoneNumber={handlePhoneNumber}
              phnIcon={
                <PhnIcon
                  fill={colors.mailIcon}
                  width={rs(16)}
                  height={rs(16)}
                  style={phnIconPos}
                />
              }
              error={!isValidNumber  && signUpInfo.phone}
              isError={
                ((!isValidNumber  && signUpInfo.phone) ?
                trans('This number is Invalid.'):'')
              }/>
          </View>
          <View style={passwordInputContainer}>
            <CustomInput
              style={inputWidth}
              leftIcon={<LockIcon fill={colors.mailIcon} />}
              rightIcon={
                <TouchableOpacity onPress={() => setEye(!eye)}>
                  {eye ? (
                    <EyeOffIcon fill={colors.btnQuaternary} />
                  ) : (
                    <EyeIcon fill={colors.btnQuaternary} />
                  )}
                </TouchableOpacity>
              }
              info={'*'+trans('Password should contain minimum 6 characters')}
              placeholder={trans('Password')}
              keyboardAppearance={'dark'}
              value={signUpInfo.password}
              onChangeText={text =>
                handleSetInfo(
                  'password',
                  text,
                  setSignUpInfo,
                  signUpInfo,
                  setError,
                  error,
                )
              }
              isError={error.password && !signUpInfo.password}
              error={error.password && !signUpInfo.password ? trans('This field is required.'):''}
              secureTextEntry={eye}
            />
          </View>
          <Text style={selectTextStyle}>{trans('Select Account Type')}</Text>
          <View style={accountTypeContainer}>
            <Pressable onPress={() => handleSelection('user')}>
              <AccountType
                style={firstAccountType}
                Icon={
                  <UserIcon
                    fill={isChekedUser ? colors.userIcon : colors.textQuinary}
                  />
                }
                typeofText={trans('User')}
                CheckedIcon={<CheckedIcon fill={colors.cornflowerBlue} />}
                isChecked={isChekedUser}
                isCheckedIcon={isChekedUser ? isCheckedIcon : !isCheckedIcon}
              />
            </Pressable>
            <Pressable onPress={() => handleSelection('merchant')}>
              <AccountType
                style={secondAccountType}
                Icon={
                  <MechantIcon
                    fill={
                      isChekedMerchant ? colors.userIcon : colors.textQuinary
                    }
                  />
                }
                typeofText={trans('Merchant')}
                CheckedIcon={<CheckedIcon fill={colors.cornflowerBlue} />}
                isChecked={isChekedMerchant}
                isCheckedIcon={
                  isChekedMerchant ? isCheckedIcon : !isCheckedIcon
                }
              />
            </Pressable>
          </View>

          <View style={inputWidth}>
            <Text style={termsConditionsText}>
              {trans('By creating an account, you agree to our terms & conditions')}
            </Text>
          </View>
          <View>
            <CustomButton
              style={inputWidth}
              bgColor={colors.cornflowerBlue}
              color={colors.white}
              onPress={!registrationLoader ? handleSubmit : null}
              title={
                !registrationLoader ? (
                  trans('Create Account')
                ) : (
                  <View>
                    <Loader
                      source={require('../../assets/lottie/loader.json')}
                      size={{width: rs(65), height: rs(55)}}
                      color={colors.white}
                    />
                  </View>
                )
              }
            />
          </View>
          <Text style={accountRegisterText}>
            <Text style={accountText}>
              {trans('Already have an account?')}{' '}
              <Text onPress={handleSigninNavigation} style={registerText}>
                {trans('Sign in Now')}
              </Text>
            </Text>
          </Text>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
