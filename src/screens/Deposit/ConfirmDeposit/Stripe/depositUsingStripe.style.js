import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const depositUsingStripeStyle = colors => {
  return StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
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
    },
    mb_16: {
      marginBottom: rs(16),
    },
    mb_20: {
      marginBottom: rs(20),
    },
    processButton: {width: width - rs(80), marginBottom: rs(28)},
    transactionStep: {alignItems: 'center', width: width - rs(80)},
    contentWidth: {
      width: width - rs(80),
    },
  });
};
