import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import MyStatusBar from '../../../utils/MyStatusBar/MyStatusBar';
import {successExchangeCurrencyStyle} from './successExchangeCurrency.style';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {HOME, MY_WALLET} from '../../../navigation/routeName/routeName';
import Switch from '../../../assets/svg/switch-vertical.svg';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import Lottie from 'lottie-react-native';
const SuccessExchangeCurrency = ({
  route: {params: {data} = {}, name},
  navigation,
}) => {
  const {colors} = useTheme();
  const styles = successExchangeCurrencyStyle(colors);
  const {t:trans} = useTranslation();
  const ref = useRef();
  const {
    destination_amount_formatted,
    total_amount_formatted,
    total_fees_formatted,
  } = data || {};
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
  const handleView = () => {
    navigation.navigate(MY_WALLET, {route: name});
  };
  return (
    <>
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
            {trans('You have successfully exchanged currency from your wallet balance.')}
          </Text>
          <View style={styles.amountCont}>
            <Text
              style={
                styles.fromCurrencyStyle
              }>{`${total_amount_formatted}`}</Text>
            <View style={styles.switchIcon}>
              <Switch fill={colors.switchIcon} />
            </View>
            <Text
              style={
                styles.toCurrencyStyle
              }>{`${destination_amount_formatted}`}</Text>
            {Number(total_fees_formatted) !== 0 && (
              <Text style={styles.feeTextStyle}>
                {trans('Fee')} {`${total_fees_formatted}`}
              </Text>
            )}
          </View>

          <CustomButton
            title={trans('Check Balance')}
            onPress={handleView}
            bgColor={colors.cornflowerBlue}
            style={styles.submitStyle}
            color={colors.white}
          />
          <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
            <Text style={styles.backHomeBtn}>{trans('Back to Home')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default SuccessExchangeCurrency;
