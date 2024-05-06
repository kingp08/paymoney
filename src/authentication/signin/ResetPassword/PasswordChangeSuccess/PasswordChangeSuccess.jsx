import {
  View,
  Text,
  useColorScheme,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import MyStatusBar from '../../../../utils/MyStatusBar/MyStatusBar';
import {passwordChangeSuccessStyle} from './passwordChangeSuccess.style';
import {SIGN_IN} from '../../../../navigation/routeName/routeName';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import Lottie from 'lottie-react-native';
import {successMoneyRequestStyle} from '../../../../screens/RequestMoney/Create/SucessRequest/successMoneyRequest.style';

const PasswordChangeSuccess = ({navigation}) => {
  const {t: trans} = useTranslation();
  const {colors} = useTheme();
  const styles = passwordChangeSuccessStyle(colors);
  const SuccessMoneyReqstyles = successMoneyRequestStyle(colors);
  const ref = useRef();
  const scheme = useColorScheme();
  useEffect(() => {
    const controlBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    setTimeout(() => {
      controlBackHandler?.remove();
      navigation.navigate(SIGN_IN);
    }, 3000);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, []);

  return (
    <>
      <MyStatusBar
        backgroundColor={colors.bgSecondary}
        barStyle={scheme === 'light' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        <View
          style={{
            ...SuccessMoneyReqstyles.successLoader,
            ...styles.iconAlignment,
          }}>
          <Lottie
            ref={ref}
            source={require('../../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={styles.successHeader}>
          {trans('Password Changed Successfully.')}
        </Text>
        <Text style={styles.description}>
          {trans('Use your new password to sign in now.')}
        </Text>
      </View>
    </>
  );
};

export default PasswordChangeSuccess;
