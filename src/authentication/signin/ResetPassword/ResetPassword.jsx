import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
import {resetPasswordStyle} from './ResetPassword.style';
import {useTheme} from '@react-navigation/native';
import MailIcon from '../../../assets/svg/mail-01.svg';
import CheckIcon from '../../../assets/svg/check-eucalyptus.svg';
import {useState} from 'react';
import CustomButton from '../../../screens/components/Buttons/CustomButton/CustomButton';
import CustomInput from '../../../screens/components/CustomInput/CustomInput';
import {ACCOUNT_VERIFY} from '../../../navigation/routeName/routeName';
import {handleSetInfo} from '../../../screens/utilities/handleFromData/handleFromData';
import {postInfo} from '../../../features/auth/login/loginApi';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import config from '../../../../config';
import {useSelector} from 'react-redux';
import Loader from '../../../utils/Loader/Loader';
import {rs} from '../../../utils/styles/responsiveSize';
const URL = `${config.BASE_URL_VERSION}/forget-password`;
const ResetPassword = props => {
  const {t:trans} = useTranslation();
  const {navigation} = props;
  const {theme} = useSelector(state => state.themeReducer);
  const {colors} = useTheme();
  const styles = resetPasswordStyle(colors);
  const [formData, setFormData] = useState({email: ''});
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState({email: error});
  const [loader, setLoader] = useState(false);

  const handleSend = async () => {
    if (validEmail) {
      setLoader(true);
      const res = await postInfo(formData, URL, 'token', 'POST');
      handleResponse(res.response.status);
    } else {
      setError({...error, email: true});
    }
  };


  const handleResponse = status => {
    setLoader(false);
    if (status.code === 200) {
      navigation.navigate(ACCOUNT_VERIFY, {
        email: formData.email
      });
      setFormData({...formData, email:""})
    } else {
      handleToaster(trans(status.message), 'warning', colors);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme === 'dark' ? '#2E2446' : '#392F6B'}
        barStyle={'light-content'}
      />
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={[styles.textPos, styles.resetText]}>
              {trans('Reset Your Password')}
            </Text>
            <Text style={[styles.textPos, styles.associatedEmailText]}>
            {trans('Don’t worry. Please enter the email address associated with your account')}
            </Text>
            <View style={styles.inputContainer}>
              <CustomInput
                style={styles.inputWidth}
                leftIcon={<MailIcon fill={colors.mailIcon} />}
                rightIcon={validEmail  && formData.email && <CheckIcon />}
                placeholder={trans('Email Address')}
                keyboardAppearance={'dark'}
                value={formData.email}
                keyboardType={'email-address'}
                inputMode={'email'}
                autoCapitalize={'none'}
                onChangeText={text =>
                  handleSetInfo(
                    'email',
                    text,
                    setFormData,
                    formData,
                    setError,
                    error,
                    setValidEmail,
                    setEmailError,
                  )
                }
                isError={emailError || (error.email && !formData.email)}
                error={
                  emailError
                    ? trans('Your email is not valid!')
                    : error.email
                    ? trans('This field is required.')
                    : ''
                }
              />
            </View>
            <View style={styles.btnContainer}>
              <CustomButton
                onPress={!loader ? handleSend : null}
                style={styles.inputWidth}
                title={
                  !loader ? (
                    trans('Send')
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
            </View>
            <View>
              <Text style={styles.backText} onPress={() => navigation.goBack()}>
                {trans('Back to Sign in')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPassword;
