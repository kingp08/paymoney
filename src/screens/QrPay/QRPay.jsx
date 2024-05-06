import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {resetPasswordStyle} from '../../authentication/signin/ResetPassword/ResetPassword.style';
import {useTranslation} from 'react-i18next';
import {rs} from '../../utils/styles/responsiveSize';
import AnimatedLottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import ProfileImage from '../components/ProfileImage/ProfileImage';
import {qrPayStyle} from './qRPay.style';
import QRPayMethod from './QRPayMethod/QRPayMethod';
import {qrElements} from './qrElements';

const QRPay = () => {
  const {walletsData} = useSelector(state => state.myWallets) || [];
  const {user: {first_name, last_name, email, picture} = {}} =
    useSelector(state => state.loginUserReducer) || {};
  const {t: trans} = useTranslation();
  const {colors} = useTheme();
  const resetStyles = resetPasswordStyle(colors);
  const styles = qrPayStyle(colors);
  const getWalletBalance = wallets => {
    if (wallets?.length > 0) {
      const wallet = wallets.find(wallet => wallet?.is_default === 'Yes');
      return wallet?.balance + ' ' + wallet?.curr_code;
    }
  };
  return (
    <KeyboardAvoidingView
      style={resetStyles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll_view}
        keyboardShouldPersistTaps={'always'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={[resetStyles.textPos, resetStyles.resetText]}>
              {trans('Transact using QR Code')}
            </Text>
            <Text
              style={[resetStyles.textPos, resetStyles.associatedEmailText]}>
              {trans('For the transactions below, use your phone’s camera to scan the QR code')}
            </Text>
            <AnimatedLottieView
              source={require('../../assets/lottie/scanner.json')}
              colorFilters={[
                {keypath: 'Scan Outlines', color: colors.stormGray},
                {keypath: 'Barcode Outlines', color: colors.stormGray},
              ]}
              style={styles.qrLoader}
              autoPlay
              loop
            />
            <View style={styles.mt_115}>
              <View style={styles.balanceCont}>
                <Text style={styles.defaultBalanceText}>
                  {trans('Default Balance') + ': '}
                </Text>
                <Text style={styles.balanceText}>
                  {getWalletBalance(walletsData)}
                </Text>
              </View>
              <View style={styles.userProfileCont}>
                <ProfileImage imageURL={picture} imageSize={rs(42)} />
                <View style={styles.pl_12}>
                  <Text style={styles.userNameText}>
                    {first_name?.concat(' ', last_name)}
                  </Text>
                  <Text style={styles.userEmail}>{email}</Text>
                </View>
              </View>
              <Text style={styles.scanDescription}>
                {trans('Select to open QR Scanner')}
              </Text>
              {qrElements(trans).map(method => (
                <QRPayMethod key={method?.id} method={method} styles={styles} />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default QRPay;
