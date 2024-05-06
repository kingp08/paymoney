import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {height} = Dimensions.get('screen');
export const verifyAccount = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: rs(40),
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(40),
      height:height,
    },
    error: {
      marginTop: rs(12),
      color: colors.ifOctonary,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      textAlign: 'center',
    },
    textPos: {
      textAlign: 'center',
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
    resendText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      lineHeight: rs(20),
      color: colors.textQuinary,
      marginTop: rs(32),
    },
    flexCont: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    otpInput: {
      margin: rs(8),
    },
    nbText: {
      marginTop:'30%',
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(20),
      color: colors.textQuinary,
      textAlign: 'center',
    },
  });
