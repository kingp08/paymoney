import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  BackHandler,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {resetPasswordStyle} from '../ResetPassword.style';
import CustomInput from '../../../../screens/components/CustomInput/CustomInput';
import EyeIcon from '../../../../assets/svg/eye.svg';
import EyeOffIcon from '../../../../assets/svg/eye-off.svg';
import LockIcon from '../../../../assets/svg/lock-unlocked.svg';
import {useState} from 'react';
import {useEffect} from 'react';
import CustomButton from '../../../../screens/components/Buttons/CustomButton/CustomButton';
import {
  PASSWORD_CHANGE_SUCCESS,
  RESET_PASSWORD,
  SIGN_IN,
} from '../../../../navigation/routeName/routeName';
import {handleSetInfo} from '../../../../screens/utilities/handleFromData/handleFromData';
import {postInfo} from '../../../../features/auth/login/loginApi';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import config from '../../../../../config';
import {useTranslation} from 'react-i18next';
import Loader from '../../../../utils/Loader/Loader';
import {rs} from '../../../../utils/styles/responsiveSize';

const URL = `${config.BASE_URL_VERSION}/forget-password/store`;

const AddNewPassword = props => {
  const {navigation} = props;
  const initialState = {
    newPassword: '',
    confirmPassword: '',
  };
  const errorText = {
    newPassword: false,
    confirmPassword: false,
  };
  const {t:trans} = useTranslation();

  const {colors} = useTheme();
  const styles = resetPasswordStyle(colors);
  const [showCPassword, setShowCPassword] = useState(true);

  useEffect(() => {
    const onBackPress = () => {
        navigation.navigate(RESET_PASSWORD);
        return true;
    };
    const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
    );
    return () => subscription.remove();
}, []);

  const handleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const [matchPassword, setMatchPassword] = useState(true);
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState(errorText);
  const [loader, setLoader] = useState(false);

  const handleError = () => {
    const {newPassword, confirmPassword} = password;
    const errorNewPassword = newPassword === '' ? true : false;
    const errorConfirmPassword = confirmPassword === '' ? true : false;
    setError({
      ...error,
      newPassword: errorNewPassword,
      confirmPassword: errorConfirmPassword,
    });
  };
  const handleSubmit = async () => {
    const {newPassword, confirmPassword} = password;
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setLoader(true);
        if (confirmPassword.length < 6) {
          setLoader(false);
          handleToaster(
            trans('Password should be at least 6 characters.'),
            'warning',
            colors,
          );
        } else {
          setMatchPassword(false);
          const changePasswordData = {
            ...props.route.params.data,
            password: confirmPassword,
          };
          const res = await postInfo(changePasswordData, URL, 'token', 'POST');
          handleResponse(res.response.records, res.response.status);
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
  }, [password.confirmPassword, password.newPassword, matchPassword]);

  const handleResponse = (records, status) => {
    setLoader(false);
    if (status.code === 200) {
      navigation.navigate(PASSWORD_CHANGE_SUCCESS);
    } else {
      handleToaster(trans(status.message), 'error', colors);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}
        keyboardShouldPersistTaps={'always'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[styles.textPos, styles.resetText]}>
            {trans('Enter New Password')}
          </Text>
          <Text style={[styles.textPos, styles.associatedEmailText]}>
          {trans('Your new password must be different from previous password.')}
          </Text>
          <View style={resetPasswordStyle(colors).mb_16}>
            <CustomInput
              placeholder={trans('Password')}
              leftIcon={<LockIcon fill={colors.textQuinary} />}
              rightIcon={
                <Pressable onPress={() => handleShowCPassword()}>
                  {showCPassword ? (
                    <EyeOffIcon fill={colors.btnQuaternary} />
                  ) : (
                    <EyeIcon fill={colors.btnQuaternary} />
                  )}
                </Pressable>
              }
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
              isPasswordStep={true}
              secureTextEntry={showCPassword}
              style={styles.contentWidth}
              isError={error.newPassword && !password.newPassword}
              error={trans('This field is required.')}
            />
          </View>
          <CustomInput
            placeholder={trans('Confirm Password')}
            leftIcon={<LockIcon fill={colors.textQuinary} />}
            isPasswordStep={true}
            style={styles.contentWidth}
            secureTextEntry={showCPassword}
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
              matchPassword ||
              (error.confirmPassword && !password.confirmPassword)
            }
            error={
              matchPassword
                ? trans('Password did not match')
                : error.confirmPassword
                ? trans('This field is required.')
                : ''
            }
          />
          <CustomButton
            title={
              !loader ? (
                trans('Reset Password')
              ) : (
                <View>
                  <Loader
                    source={require('../../../../assets/lottie/loader.json')}
                    size={{width: rs(65), height: rs(55)}}
                    color={colors.white}
                  />
                </View>
              )
            }
            onPress={!loader ? handleSubmit : null}
            bgColor={colors.btnOctonary}
            style={styles.resetBtn}
            color={colors.btnSenary}
          />
          <Pressable onPress={() => navigation.navigate(SIGN_IN)}>
            <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNewPassword;
