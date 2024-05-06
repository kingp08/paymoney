import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width, height} = Dimensions.get('screen');
export const successExchangeCurrencyStyle = colors =>
  StyleSheet.create({
    scroll_view: {
      flex: 1,
      height: height,
      backgroundColor: colors.bgTertiary,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.bgTertiary,
      paddingTop: rs(155),
    },
    success: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(20),
      lineHeight: rs(30),
      color: colors.textNonary,
      marginTop: rs(36),
    },
    successLoader: {
      width: rs(420),
      height: rs(320),
      position: 'absolute',
      top: rs(-25),
    },
    amountCont: {
      marginTop: rs(30),
      alignItems: 'center',
    },
    fromCurrencyStyle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      lineHeight: rs(20),
      color: colors.textNonary,
    },
    switchIcon: {
      marginVertical: rs(12),
    },
    toCurrencyStyle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(28),
      lineHeight: rs(34),
      color: colors.sunshade,
      marginBottom: rs(5),
    },
    feeTextStyle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      lineHeight: rs(15),
      color: colors.btnSeptenary,
    },
    submitStyle: {width: width - rs(80), marginTop: rs(30)},
    successStyle: {width: width - rs(80), marginTop: rs(36)},
    tryAgainStyle: {width: width - rs(80), marginTop: rs(14)},
    description: {
      color: colors.textDenary,
      textAlign: 'center',
      marginTop: rs(18),
      fontSize: rs(14),
      lineHeight: rs(22),
      paddingHorizontal: rs(44),
      fontFamily: 'Gilroy-Semibold',
    },
    backHomeBtn: {
      color: colors.textDenary,
      marginTop: rs(18),
      paddingVertical: rs(10),
      width: width - rs(80),
      textAlign: 'center',
      fontSize: rs(15),
      lineHeight: rs(27),
      fontFamily: 'Gilroy-Semibold',
    },
  });
