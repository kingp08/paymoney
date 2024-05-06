import {Dimensions, StyleSheet, Platform} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {height, width} = Dimensions.get('window');
export const onboardingStyle = (colors, dWidth) =>
  StyleSheet.create({
    onboardingPage: {
      backgroundColor: colors.cornflowerBlue,
      flex: 1,
    },
    languageTranslator: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    languageTranslatorContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop:
        Platform.OS === 'ios'
          ? (height > 667 ? 0 : rs(14))
          : height > 700
          ? rs(14)
          : height > 590
          ? rs(12)
          : rs(8),
    },
    languageText: {
      fontFamily: 'Gilroy-Semibold',
      color: colors.white,
      marginHorizontal: rs(6),
      fontSize: rs(16),
      lineHeight: rs(20),
    },
    onboardingContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: height > 700 ? rs(14) : height > 590 ? rs(12) : rs(8),
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: height > 700 ? rs(20) : height > 590 ? rs(18) : rs(16),
      lineHeight: height > 700 ? rs(42) : height > 590 ? rs(38) : rs(34),
      color: colors.white,
    },
    subtitle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: height > 700 ? rs(42) : height > 590 ? rs(36) : rs(30),
      lineHeight: height > 700 ? rs(49) : height > 590 ? rs(41) : rs(33),
      color: colors.white,
    },
    description: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Semibold',
      marginTop: height > 700 ? rs(15) : height > 590 ? rs(13) : rs(11),
      fontSize: height > 700 ? rs(15) : height > 590 ? rs(16) : rs(13),
      lineHeight: height > 700 ? rs(24) : height > 590 ? rs(20) : rs(20),
      width: width - rs(80),
      color: colors.white,
    },
    buttonContainer: {
      width: width,
      alignItems: 'center',
      marginBottom: Platform.OS === 'ios' ? (height > 667 ? 0 : rs(18)) : rs(18),
    },
    registerButton: {
      width: width - rs(80),
    },
    signinButton: {
      width: width - rs(80),
      marginTop: rs(16),
    },
    dynamicWidth: {
      width: dWidth,
    },
  });
