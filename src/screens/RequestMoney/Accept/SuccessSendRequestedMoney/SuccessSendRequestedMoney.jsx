import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import MyStatusBar from '../../../../utils/MyStatusBar/MyStatusBar';
import {HOME, TRANSACTIONS} from '../../../../navigation/routeName/routeName';
import {useTheme} from '@react-navigation/native';
import CustomButton from '../../../components/Buttons/CustomButton/CustomButton';
import {successSendRequestedMoney} from './successSendRequestedMoney.style';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import Lottie from 'lottie-react-native';
const SuccessSendRequestedMoney = ({
  navigation,
  route: {
    params: {
      data: {email, phone, amount, currency},
    },
    name,
  },
}) => {
  const {colors} = useTheme();
  const styles = successSendRequestedMoney(colors);
  const {t:trans} = useTranslation();
  const ref = useRef();
  let controlBackHandler;
  useEffect(() => {
    controlBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
  }, [navigation]);
  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, []);
  const handleSubmit = () => {
    navigation.navigate(TRANSACTIONS, {route: name});
    controlBackHandler?.remove();
  };
  return (
    <>
      <MyStatusBar backgroundColor={colors.bgTertiary} />
      <View style={styles.container}>
        <View style={styles.successLoader}>
          <Lottie
            ref={ref}
            source={require('../../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={styles.success}>{trans('Success')}!</Text>
        <Text style={styles.description}>
          {trans('You have successfully accepted a request of')}{' '}
          <Text style={styles.amountText}>
            {amount} {currency}
          </Text>{' '}
          {trans('from')} ({email || phone})
        </Text>
        <CustomButton
          title={trans('View Details')}
          onPress={handleSubmit}
          bgColor={colors.cornflowerBlue}
          style={styles.customButton}
          color={colors.white}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(HOME);
            controlBackHandler?.remove();
          }}>
          <Text style={styles.backHomeBtn}>{trans('Back to Home')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SuccessSendRequestedMoney;
