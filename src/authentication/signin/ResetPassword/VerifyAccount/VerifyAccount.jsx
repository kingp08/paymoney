import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import CustomOtpInput from '../../../../screens/components/CustomTextInput/CustomOtpInput/CustomOtpInput';
import {verifyAccount} from './verifyAccount.style';
import {ADD_NEW_PASSWORD} from '../../../../navigation/routeName/routeName';
import {postInfo} from '../../../../features/auth/login/loginApi';
import CustomLoader from '../../../../screens/components/CustomLoader/CustomLoader';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import {hideMessage} from 'react-native-flash-message';
import config from '../../../../../config';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const VerifyAccount = ({
  navigation,
  route: {
    params: { email },
  },
}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const styles = verifyAccount(colors);
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);
  const otp5Ref = useRef(null);
  const otp6Ref = useRef(null);

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');

  const [errorOTP, setErrorOTP] = useState(false);
  const [loader, setLoader] = useState(false);

  const emailCrypto = email => {
    const [localPart, domainPart] = email.split('@');
    const localPartLength = localPart.length;
    let abbreviatedPart = localPart;
  
    if (localPartLength >= 3) {
      abbreviatedPart = `${localPart.slice(0, 3)}...`;
    } else if (localPartLength >= 2) {
      abbreviatedPart = `${localPart.slice(0, 2)}...`;
    }
  
    return `${abbreviatedPart}@${domainPart}`;
  };
  

  const handleOTPCheck = async () => {
    if (!otp1 || !otp2 || !otp3 || !otp4 || !otp5 || !otp6) {
      return;
    }
    setLoader(true);
    Keyboard.dismiss();
    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    const data = { email, code: otp };
    const URL = `${config.BASE_URL_VERSION}/forget-password/verify`;
    const res = await postInfo(data, URL, 'token', 'POST');
    handleResponse(res.response.status, data);
  };
  
  useEffect(() => {
    handleOTPCheck();
  }, [otp1, otp2, otp3, otp4, otp5, otp6]);
  

  const handleResponse = (status, data) => {
    setLoader(false);
    if (status.code === 200) {
      hideMessage();
      setErrorOTP(false);
      navigation.navigate(ADD_NEW_PASSWORD, { data });
    } else {
      setErrorOTP(true);
    }
  };
  

  const clearInput = () => {
    setOtp1('');
    setOtp2('');
    setOtp3('');
    setOtp4('');
    setOtp5('');
    setOtp6('');
  };

  const handleResend = async () => {
    clearInput();
    const URL = `${config.BASE_URL_VERSION}/forget-password`;
    const formData = { email };
    const response = await postInfo(formData, URL, 'token', 'POST');
    const { records, status } = response.response;
    handleResendResponse(records, status);
  };
  

  const handleResendResponse = (records, status) => {
    status.code === 200
      ? handleToaster(trans(records.message), 'success', colors)
      : handleToaster(trans(status.message), 'warning', colors);
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
              {trans('Check Your Inbox')}
            </Text>
            <Text style={[styles.textPos, styles.associatedEmailText]}>
              {`${trans('A 6 digit code has been sent to')} ${emailCrypto(email)} ${trans('Use the code here')}`}
            </Text>
            <View style={styles.flexCont}>
              <CustomOtpInput
                style={styles.otpInput}
                Ref={otp1Ref}
                value={otp1}
                onChangeText={otp1 => {
                  setOtp1(otp1);
                  if (otp1 != '') {
                    otp2Ref.current.focus();
                  }
                }}
              />
              <CustomOtpInput
                style={styles.otpInput}
                Ref={otp2Ref}
                value={otp2}
                onChangeText={otp2 => {
                  setOtp2(otp2);
                  if (otp2 != '') {
                    otp3Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    setOtp1('');
                    otp1Ref.current.focus();
                  }
                }}
              />
              <CustomOtpInput
                style={styles.otpInput}
                Ref={otp3Ref}
                value={otp3}
                onChangeText={otp3 => {
                  setOtp3(otp3);
                  if (otp3 != '') {
                    otp4Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    setOtp2('');
                    otp2Ref.current.focus();
                  }
                }}
              />
              <CustomOtpInput
                Ref={otp4Ref}
                style={styles.otpInput}
                value={otp4}
                onChangeText={otp4 => {
                  setOtp4(otp4);
                  if (otp4 != '') {
                    otp5Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    setOtp3('');
                    otp3Ref.current.focus();
                  }
                }}
              />
              <CustomOtpInput
                style={styles.otpInput}
                Ref={otp5Ref}
                value={otp5}
                onChangeText={otp5 => {
                  setOtp5(otp5);
                  if (otp5 != '') {
                    otp6Ref.current.focus();
                  }
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    setOtp4('');
                    otp4Ref.current.focus();
                  }
                }}
              />
              <CustomOtpInput
                Ref={otp6Ref}
                style={styles.otpInput}
                value={otp6}
                onChangeText={async otp6 => {
                  setOtp6(otp6);
                }}
                onKeyPress={e => {
                  if (e.nativeEvent.key === 'Backspace') {
                    if (otp6 === '') {
                      setOtp5('');
                      otp5Ref.current.focus();
                    } else {
                      setOtp6('');
                      otp6Ref.current.focus();
                    }
                  }
                }}
              />
            </View>
            {errorOTP && (
              <Text style={styles.error}>
                {trans('Code is incorrect, try again or resend the code.')}
              </Text>
            )}
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>{trans('Resend Code')}</Text>
            </TouchableOpacity>

            <Text style={styles.nbText}>
              {trans('Did not receive any code? Check your spam folder, or resend the code again.')}
            </Text>
          </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {loader && <CustomLoader />}
    </KeyboardAvoidingView>
  );
};

export default VerifyAccount;
