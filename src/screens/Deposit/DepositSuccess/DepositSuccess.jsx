import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import React from 'react';
import {rs} from '../../../utils/styles/responsiveSize';
import {CREATE_DEPOSIT, HOME} from '../../../navigation/routeName/routeName';
import {useTheme} from '@react-navigation/native';
import CustomButton from '../../components/Buttons/CustomButton/CustomButton';
import {useEffect} from 'react';
import MyStatusBar from '../../../utils/MyStatusBar/MyStatusBar';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {depositMoneyCurrencies} from '../../../features/slices/getCurrencies/getDepositMoneyCurrencies';
import {successMoneyRequestStyle} from '../../RequestMoney/Create/SucessRequest/successMoneyRequest.style';
import Lottie from 'lottie-react-native';
import {useRef} from 'react';

const DepositSuccess = ({
  navigation,
  route: {
    params: {
      setAmount = {},
      setError = {},
      errorText = {},
      paymentInfo,
      currency,
      amount,
    },
  },
}) => {
  const {colors} = useTheme();
  const ref = useRef();
  let controlBackHandler;
  const styles = depositSuccessStyle(colors);
  const SuccessMoneyReqstyles = successMoneyRequestStyle(colors);
  const {t:trans} = useTranslation();
  const {user: {token = '', user_id = ''} = {}} = useSelector(
    state => state.loginUserReducer,
  );
  const dispatch = useDispatch();

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

  const handleView = () => {
    setAmount('');
    setError(errorText);
    dispatch(depositMoneyCurrencies({token}));
    navigation.navigate(CREATE_DEPOSIT);
    controlBackHandler?.remove();
  };
  const handleBackHome = () => {
    controlBackHandler?.remove();
    navigation.navigate(HOME);
  };

  return (
    <>
      <MyStatusBar backgroundColor={colors.bgTertiary} />
      <View style={styles.container}>
        <View style={SuccessMoneyReqstyles.successLoader}>
          <Lottie
            ref={ref}
            source={require('../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={styles.success}>{`${trans('Success')}!`}</Text>
        <Text style={styles.description}>
          {trans('You have successfully deposited')}{' '}
          <Text
            style={{
              ...styles.backHomeBtn,
              ...styles.primaryVariantColor,
            }}>
            {amount}{' '}
          </Text>
          {paymentInfo?.currency?.code && paymentInfo?.currency?.code}
          {currency && currency} {trans('to your account.')}
        </Text>

        <CustomButton
          title={trans('Deposit Again')}
          onPress={handleView}
          bgColor={colors.cornflowerBlue}
          style={styles.depositAgainBtn}
          color={colors.white}
        />
        <TouchableOpacity onPress={handleBackHome}>
          <Text style={styles.backHomeBtn}>{trans('Back to Home')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DepositSuccess;

const {width} = Dimensions.get('screen');

export const depositSuccessStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.bgTertiary,
      paddingTop: rs(155),
    },
    success: {
      fontFamily: 'Gilroy-Bold',
      fontSize: rs(20),
      lineHeight: rs(30),
      color: colors.textNonary,
      marginTop: rs(36),
    },
    description: {
      color: colors.textDenary,
      textAlign: 'center',
      marginTop: rs(18),
      fontSize: rs(14),
      lineHeight: rs(22),
      paddingHorizontal: rs(44),
      fontFamily: 'Gilroy-Semibold',
    },
    balanceText: {
      color: colors.white,
      marginTop: rs(36),
      fontSize: rs(18),
      lineHeight: rs(20),
      fontFamily: 'Gilroy-Semibold',
    },
    balance: {
      color: colors.sunshade,
      marginTop: rs(8),
      fontSize: rs(28),
      lineHeight: rs(34),
      fontFamily: 'Gilroy-Semibold',
    },
    backHomeBtn: {
      color: colors.textDenary,
      marginTop: rs(28),
      fontSize: rs(15),
      lineHeight: rs(27),
      fontFamily: 'Gilroy-Semibold',
    },
    primaryVariantColor: {
      color: colors.textPrimaryVariant,
    },
    depositAgainBtn: {
      width: width - rs(80),
      marginTop: rs(20),
    },
  });
