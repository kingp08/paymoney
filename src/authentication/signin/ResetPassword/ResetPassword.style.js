import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const resetPasswordStyle = (...args) => {
  const [colors] = args;

  return StyleSheet.create({
    onKeyboard: {flex: 1},
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: rs(40),
      backgroundColor: colors.bgSecondary,
    },
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    textPos: {
      textAlign: 'center',
      width: width - rs(80),
    },
    resetText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(20),
      lineHeight: rs(25),
      color: colors.textSecondary,
      marginBottom: rs(12),
    },
    associatedEmailText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(20),
      color: colors.textTertiary,
      marginBottom: rs(24),
    },
    inputWidth: {
      width: width - rs(80),
    },
    inputContainer: {
      marginBottom: rs(14),
    },
    btnContainer: {
      marginBottom: rs(28),
    },
    backText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textQuinary,
    },
    flexCont: {
      flexDirection: 'row',
    },
    otpInput: {
      marginRight: 17,
    },
    mb_16: {
      marginBottom: rs(16),
    },
    contentWidth: {
      width: width - rs(80),
    },
    resetBtn: {
      width: width - rs(80),
      marginBottom: rs(28),
      marginTop: rs(16),
    },
  });
};
