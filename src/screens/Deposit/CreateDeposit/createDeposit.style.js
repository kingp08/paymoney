import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const crateDepositStyle = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    transactionStep: {
      alignItems: 'center',
    },
    container: {
      height: '100%',
      alignItems: 'center',
      paddingTop: rs(24),
      marginBottom: rs(100),
      backgroundColor: colors.bgSecondary,
    },
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
      paddingVertical: rs(10),
      textAlign: 'center',
    },
    mb_16: {
      marginBottom: rs(16),
    },
    mb_20: {
      marginBottom: rs(20),
    },
    processed: {width: width - rs(80), marginBottom: rs(20)},
    feesLimitText: {
      color: colors.textSecondary,
      width: width - rs(80),
    },
    contentWidth: {
      width: width - rs(80),
    },
    feeText: {
      fontFamily: 'Gilroy-Semibold',
      marginTop: rs(4),
      color: colors.textQuinary,
      width: width - rs(80),
    },
    transactionStep: {
      alignItems: 'center',
    },
  });
