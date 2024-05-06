import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import Lottie from 'lottie-react-native';
import {successExchangeCurrencyStyle} from '../../ExchangeCurrency/SuccessExchangeCurrency/successExchangeCurrency.style';
import {HOME} from '../../../navigation/routeName/routeName';
import MyStatusBar from '../../../utils/MyStatusBar/MyStatusBar';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {successMoneyRequestStyle} from '../../RequestMoney/Create/SucessRequest/successMoneyRequest.style';
const SuccessPayment = ({route: {params: {data} = {}}, navigation}) => {
  const {colors} = useTheme();
  const styles = successExchangeCurrencyStyle(colors);
  const rmStyles = successMoneyRequestStyle(colors);
  const {t: trans} = useTranslation();
  const ref = useRef();
  const {merchantBusinessName, amount} = data || {};
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
        <Text style={styles.success}>{trans('Success')}!</Text>
        <Text style={styles.description}>
          {trans('You have successfully paid')}{' '}
          <Text style={rmStyles.amountText}>{amount}</Text>
          {trans(' for your purchase to')} {trans(merchantBusinessName)}
        </Text>
        <CustomButton
          title={trans('Back To Home')}
          onPress={() => navigation.navigate(HOME)}
          bgColor={colors.cornflowerBlue}
          style={styles.successStyle}
          color={colors.white}
        />
      </View>
    </ScrollView>
  );
};

export default SuccessPayment;
