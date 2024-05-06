import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const successMoneyRequestStyle = colors =>
  StyleSheet.create({
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
    description: {
      color: colors.textDenary,
      textAlign: 'center',
      marginTop: rs(18),
      fontSize: rs(14),
      lineHeight: rs(22),
      paddingHorizontal: rs(44),
      fontFamily: 'Gilroy-Semibold',
    },
    customButton: {
      width: width - rs(80),
      marginTop: rs(20),
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
      marginTop: rs(18),
      paddingVertical: rs(10),
      width: width - rs(80),
      textAlign: 'center',
      fontSize: rs(15),
      lineHeight: rs(27),
      fontFamily: 'Gilroy-Semibold',
    },
    amountText: {
      color: colors.textPrimaryVariant,
      marginTop: rs(28),
      fontSize: rs(15),
      lineHeight: rs(27),
      fontFamily: 'Gilroy-Semibold',
    },
  });
