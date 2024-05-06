import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {changePasswordStyle} from './changePassword.Style';
import {useTheme} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/CustomInput';
import EyeOffIcon from '../../../assets/svg/eye-off.svg';
import EyeIcon from '../../../assets/svg/eye.svg';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {handleSetInfo} from '../../utilities/handleFromData/handleFromData';
import {postInfo} from '../../../features/auth/login/loginApi';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import config from '../../../../config';
import {NetworkContext} from '../../../utils/Network/NetworkProvider';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import { rs } from '../../../utils/styles/responsiveSize';
import Loader from '../../../utils/Loader/Loader';
const initialState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const errorText = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
  old_passwordMatch: false,
};
const ChangePassword = ({navigation}) => {
  const {colors} = useTheme();
  const styles = changePasswordStyle(colors);
  const {
    user: {token},
  } = useSelector(state => state.loginUserReducer) || {};
  const {isConnected} = useContext(NetworkContext);
  const [showCPassword, setShowCPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [matchPassword, setMatchPassword] = useState(false);
  const [matchOldPassword, setMatchOldPassword] = useState(false);
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState(errorText);
  const [loading, setLoading] = useState(false);
  const {t:trans} = useTranslation();
  const handleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleError = () => {
    const {currentPassword, newPassword, confirmPassword} = password;
    const errorCurrentPassword = currentPassword === '' ? true : false;
    const errorNewPassword = newPassword === '' ? true : false;
    const errorConfirmPassword = confirmPassword === '' ? true : false;
    setError({
      ...error,
      currentPassword: errorCurrentPassword,
      newPassword: errorNewPassword,
      confirmPassword: errorConfirmPassword,
    });
  };
  const handleSubmit = async () => {
    Keyboard.dismiss();
    const {currentPassword, newPassword, confirmPassword} = password;
    if (
      currentPassword &&
      newPassword &&
      confirmPassword &&
      isConnected &&
      newPassword?.length >= 6
    ) {
      if (newPassword === confirmPassword) {
        if (currentPassword !== newPassword) {
          setMatchPassword(false);
          setLoading(true);
          const obj = {old_password: currentPassword, password: newPassword};
          const URL = `${config.BASE_URL_VERSION}/change-password`;
          const res = await postInfo(obj, URL, token, 'POST');
          if (res) {
            if (res?.response?.status?.code === 200) {
              handleToaster(
                trans(res?.response?.status?.message),
                'success',
                colors,
              );
              navigation.goBack();
            } else {
              setLoading(false);
              setError({
                ...error,
                old_passwordMatch: trans(res?.response?.status?.message),
              });
            }
          }
        } else {
          setMatchOldPassword(true);
        }
      } else {
        setMatchPassword(true);
      }
    } else {
      handleError();
    }
  };
  useEffect(() => {
    if (matchPassword) {
      if (password.confirmPassword === password.newPassword) {
        setMatchPassword(false);
      }
    }
    if (matchOldPassword) {
      if (password.currentPassword !== password.newPassword) {
        setMatchOldPassword(false);
      }
    }
  }, [
    password.confirmPassword,
    password.newPassword,
    matchPassword,
    matchOldPassword,
    password.currentPassword,
  ]);

  const handleCurrentPasswordError=(text)=>{
    setError({
      ...error,
      old_passwordMatch: false,
    });
    handleSetInfo(
      'currentPassword',
      text,
      setPassword,
      password,
      setError,
      error,
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        style={styles.scroll_view}
        keyboardShouldPersistTaps={'always'}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.headerText}>
              {trans('You are about to change your password. Make sure to use a strong password and keep it confidential')}
            </Text>
            <View style={styles.mb_24}>
              <CustomInput
                label={trans('Current Password')}
                placeholder={trans('Password')}
                value={password.currentPassword}
                onChangeText={text =>
                 handleCurrentPasswordError(text)
                }
                isError={
                  (error.currentPassword && !password.currentPassword) ||
                  error.old_passwordMatch ||
                  matchOldPassword
                }
                error={
                    error.old_passwordMatch
                    ? trans('Current Password is wrong'): !password.currentPassword
                    ? trans('This field is required.')
                    : ''
                }
                rightIcon={
                  <Pressable onPress={() => handleShowCPassword()}>
                    {showCPassword ? (
                      <EyeOffIcon fill={colors.btnQuaternary} />
                    ) : (
                      <EyeIcon fill={colors.btnQuaternary} />
                    )}
                  </Pressable>
                }
                secureTextEntry={showCPassword}
                style={styles.width}
                returnKeyType={'done'}
              />
            </View>
            <View style={styles.mb_24}>
              <CustomInput
                label={trans('New Password')}
                placeholder={trans('Password')}
                value={password.newPassword}
                onChangeText={text =>
                  handleSetInfo(
                    'newPassword',
                    text,
                    setPassword,
                    password,
                    setError,
                    error,
                  )
                }
                isError={
                  (error.newPassword && !password.newPassword) ||
                  matchOldPassword ||
                  (password.newPassword?.length < 6 && password.newPassword)
                }
                error={
                  password.newPassword?.length < 6 && password.newPassword
                    ? trans('Password should be at least 6 characters.')
                    : matchOldPassword
                    ? trans('New password match to old password.'): error.newPassword && !password.newPassword
                    ? trans('This field is required.')
                    : ''
                }
                secureTextEntry={showPassword}
                rightIcon={
                  <Pressable onPress={() => handleShowPassword()}>
                    {showPassword ? (
                      <EyeOffIcon fill={colors.btnQuaternary} />
                    ) : (
                      <EyeIcon fill={colors.btnQuaternary} />
                    )}
                  </Pressable>
                }
                style={styles.width}
                returnKeyType={'done'}
              />
            </View>
            <View style={styles.mb_20}>
              <CustomInput
                label={trans('Confirm Password')}
                placeholder={trans('Password')}
                value={password.confirmPassword}
                onChangeText={text =>
                  handleSetInfo(
                    'confirmPassword',
                    text,
                    setPassword,
                    password,
                    setError,
                    error,
                  )
                }
                isError={
                  (error.confirmPassword && !password.confirmPassword) ||
                  matchPassword ||
                  (password.confirmPassword?.length < 6 &&
                    password.confirmPassword)
                }
                secureTextEntry={showPassword}
                style={styles.width}
                returnKeyType={'done'}
                error={
                  password.confirmPassword?.length < 6 &&
                  password.confirmPassword
                    ? trans('Password should be at least 6 characters.')
                    : matchPassword
                    ? trans('Password did not match.')
                    : error.confirmPassword
                    ? trans('This field is required.')
                    : ''
                }
              />
            </View>
            <CustomButton
              title={
                !loading ? (
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
              onPress={!loading && handleSubmit}
              bgColor={colors.btnOctonary}
              style={styles.btn}
              color={colors.btnSenary}
            />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
