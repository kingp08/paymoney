import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import Lottie from 'lottie-react-native';
import { successExchangeCurrencyStyle } from '../../ExchangeCurrency/SuccessExchangeCurrency/successExchangeCurrency.style';
import MyStatusBar from '../../../utils/MyStatusBar/MyStatusBar';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import { HOME, QR_PAY } from '../../../navigation/routeName/routeName';
const FailedPayment = ({navigation}) => {
  const {colors} = useTheme();
  const styles = successExchangeCurrencyStyle(colors);
  const {t: trans} = useTranslation();
  const ref = useRef();
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);
  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scroll_view}
      keyboardShouldPersistTaps={'always'}>
      <MyStatusBar backgroundColor={colors.bgTertiary} />
      <View style={styles.container}>
        <View style={styles.successLoader}>
          <Lottie
            ref={ref}
            source={require('../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={styles.success}>{trans('Payment Failed!')}!</Text>
        <Text style={styles.description}>
          {trans('Your merchant payment has failed due to server error or bug issue from the source.')}
        </Text>
        <CustomButton
          title={trans('Try Again')}
          onPress={() => navigation.navigate(QR_PAY)}
          bgColor={colors.white}
          style={styles.successStyle}
          color={colors.gunPowder}
        />
        <CustomButton
          title={trans('Back To Home')}
          onPress={() => navigation.navigate(HOME)}
          bgColor={colors.cornflowerBlue}
          style={styles.tryAgainStyle}
          color={colors.white}
        />
      </View>
    </ScrollView>
  );
};

export default FailedPayment;
