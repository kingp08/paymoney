import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const successSendMoneyStyle = (...args) => {
  const [colors] = args;
  return StyleSheet.create({
    sendAgainBtn: {
      width: width - rs(80),
      marginTop: rs(20),
    },
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
  });
};
