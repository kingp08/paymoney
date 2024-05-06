import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const signInStyle = colors =>
  StyleSheet.create({
    pageVisibility: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    safeArea:{flex:1, backgroundColor:colors.bgSecondary},
    signInContainer: {
      alignItems: 'center',
    },
    payMoneyIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: rs(24),
    },
    welcomeText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(20),
      lineHeight: rs(25),
      color: colors.ifDenary,
      marginTop: rs(25),
      marginBottom: rs(20),
    },
    passwordInputContainer: {
      marginTop: rs(16),
    },
    accountText: {
      fontFamily: 'Gilroy-Medium',
      color: colors.textQuinary,
    },
    registerText: {
      fontFamily: 'Gilroy-Semibold',
      color: colors.textNonaryVariant,
    },
    accountRegisterText: {
      marginTop: rs(24),
      fontSize: rs(14),
      lineHeight: rs(17),
      marginBottom: rs(30),
    },
    forgetPassSection: {
      marginTop: rs(17),
      marginBottom: rs(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width - rs(80),
    },
    inputWidth: {
      width: width - rs(80),
    },
    forgotPassText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(15),
      color: colors.textTertiary,
    },
    imageLogo: {height: rs(40), width: rs(160)},
    headerImageLogo: {height: rs(30), width: rs(120)},
  });
