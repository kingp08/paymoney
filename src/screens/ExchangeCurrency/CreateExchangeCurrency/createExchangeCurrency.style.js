import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const createExchangeCurrencyStyle = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      height: '100%',
      paddingTop: rs(24),
      marginBottom: rs(100),
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(40),
    },
    convertContainer: {
      marginTop: rs(24),
    },
    switchIcon: {
      marginTop: rs(7),
      flexDirection: 'row-reverse',
    },
    exchangeRateContainer: {
      marginTop: rs(24),
      alignItems: 'center',
    },
    exchangeDate: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(10),
      lineHeight: rs(12),
      marginBottom: rs(8),
      color: colors.textQuaternaryVariant,
    },
    exchangeText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      lineHeight: rs(15),
      color: colors.textTertiary,
    },
    customButton: {
      width: width - rs(80),
      marginBottom: rs(28),
      marginTop: rs(20),
    },
    width_80: {width: width - rs(80)},
    mt_24: {
      marginTop: rs(24),
    },
    mt_8: {marginTop: rs(8)},
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
      paddingVertical: rs(10),
      width: width - rs(80),
      textAlign: 'center',
    },
  });
