import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {RESET_PASSWORD, SIGN_UP} from '../../navigation/routeName/routeName';
import light_logo from '../../assets/image/logo/light_logo.png';
import dark_logo from '../../assets/image/logo/dark_logo.png';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {signInStyle} from './SignInStyle';
import CustomInput from '../../screens/components/CustomInput/CustomInput';
import MailIcon from '../../assets/svg/user-01.svg';
import LockIcon from '../../assets/svg/lock-unlocked.svg';
import EyeIcon from '../../assets/svg/eye.svg';
import EyeOffIcon from '../../assets/svg/eye-off.svg';
import {useState, useContext} from 'react';
import CustomButton from '../../screens/components/Buttons/CustomButton/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../features/auth/login/loginSlice';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {getInfo} from '../../features/auth/login/loginApi';
import config from '../../../config';
import {NetworkContext} from '../../utils/Network/NetworkProvider';
import {rs} from '../../utils/styles/responsiveSize';
import Loader from '../../utils/Loader/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = ({navigation}) => {
  const isFocused = useIsFocused();
  const {theme} = useSelector(state => state.themeReducer);
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {loginLoader} = useSelector(state => state.loginUserReducer);
  const {isConnected} = useContext(NetworkContext);

  const initialState = {
    email: '',
    password: '',
  };
  const errorText = {
    email: false,
    password: false,
  };

  const {
    signInContainer,
    payMoneyIcon,
    welcomeText,
    passwordInputContainer,
    accountRegisterText,
    accountText,
    registerText,
    forgetPassSection,
    inputWidth,
    forgotPassText,
    pageVisibility,
    imageLogo,safeArea
  } = signInStyle(colors);

  const [signInInfo, setSignInInfo] = useState(initialState);
  const [error, setError] = useState(errorText);
  const [eye, setEye] = useState(true);
  const [loginVia, setLoginVia] = useState('email_only');

  useEffect(() => {
    async function checkLoginPreferences() {
      const URL = `${config.BASE_URL_VERSION}/preference/check-login-via`;
      const loginViaRes = await getInfo('token', URL);
      if (loginViaRes?.response?.status?.code == 200) {
        const {loginVia} = loginViaRes?.response?.records;
        setLoginVia(loginVia);
      }
    }
    checkLoginPreferences();
  }, [isFocused]);

  const handleError = () => {
    const {email, password} = signInInfo;
    const errorEmail = email === '' ? true : false;
    const errorPassword = password === '' ? true : false;
    setError({
      ...error,
      email: errorEmail,
      password: errorPassword,
    });
  };

  const handleLogin = async () => {
    const {email, password} = signInInfo;
    if (!email || !password || !isConnected) {
      handleError();
      return;
    }
    Keyboard.dismiss();
    const res = await dispatch(loginUser(signInInfo));
    if (res) {
      loginHandler(res.payload);
      return;
    }
  };


  const loginHandler = res => {
    const { code, message } = res?.response?.status ?? {};
    if (code !== 200) {
      handleToaster(trans(message), 'warning', colors);
    }
  };

  const handleNavigation = (route) =>{
    navigation.navigate(route);
    setSignInInfo(initialState);
    setError(errorText);
    return;
  }
  return (
    <SafeAreaView style={safeArea}>
    <StatusBar
       backgroundColor={colors.bgSecondary}
       barStyle={theme === 'light' ?'dark-content':'light-content'}
      />

      <ScrollView style={pageVisibility} keyboardShouldPersistTaps={'always'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={signInContainer}>
            <View style={payMoneyIcon}>
              <Image
                style={imageLogo}
                source={theme === 'dark' ? dark_logo : light_logo}
                alt={trans('Logo')}
              />
            </View>
            <View>
              <Text style={welcomeText}>{trans('Welcome')}</Text>
            </View>
            <View style={passwordInputContainer}>
              <CustomInput
                style={inputWidth}
                leftIcon={<MailIcon fill={colors.mailIcon} />}
                placeholder={
                  loginVia == 'email_or_phone'
                    ? trans('Email or Phone')
                    : loginVia == 'email_only'
                    ? trans('Email')
                    : trans('Phone')
                }
                keyboardAppearance={'dark'}
                keyboardType={loginVia==='phone_only'?'phone-pad':'email-address'}
                inputMode={loginVia==='phone_only'?'tel':'email'}
                autoCapitalize={'none'}
                value={signInInfo.email}
                onChangeText={text =>
                  setSignInInfo({...signInInfo, email:text})
                }
                isError={error.email && !signInInfo.email}
                error={error.email ? trans('This field is required.') : ''}
                returnKeyType={'done'}
              />
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
                placeholder={trans('Password')}
                keyboardAppearance={'dark'}
                value={signInInfo.password}
                onChangeText={text =>
                  setSignInInfo({...signInInfo, password:text})
                }
                isError={error.password && !signInInfo.password}
                error={trans('This field is required.')}
                secureTextEntry={eye}
              />
            </View>
            <View style={forgetPassSection}>
              <Text
                style={forgotPassText}
                onPress={() => handleNavigation(RESET_PASSWORD)}>
                {`${trans('Forgot Password')}?`}
              </Text>
            </View>
            <CustomButton
              style={inputWidth}
              onPress={!loginLoader ? handleLogin : null}
              title={
                !loginLoader ? (
                  trans('Sign In')
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
              bgColor={colors.cornflowerBlue}
              color={colors.white}
            />
            <Text style={accountRegisterText}>
              <Text style={accountText}>
                {trans('Don’t have an account?')}{' '}
                <Text onPress={()=>handleNavigation(SIGN_UP)} style={registerText}>
                  {trans('Register Now')}
                </Text>
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      </SafeAreaView>
  );
};

export default SignIn;
