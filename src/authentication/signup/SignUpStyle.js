import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');

export const signUpStyle = (colors, phoneNumber) =>
  StyleSheet.create({
    passPrefText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      color: colors.textQuinary,
      marginTop: rs(8),
    },
    termsConditionsText: {
      textAlign: 'center',
      marginVertical: rs(18),
      fontSize: rs(11),
      lineHeight: rs(12),
      color: colors.textQuinary,
    },
    selectTextStyle: {
      fontFamily: 'Gilroy-Semibold',
      width: width - rs(80),
      fontSize: rs(13),
      lineHeight: rs(16),
      color: colors.textTertiary,
      marginTop: rs(20),
      marginBottom: rs(8),
    },
    accountTypeContainer: {
      flexDirection: 'row',
      width: width - rs(80),
      alignItems: 'center',
    },
    firstAccountType: {
      width: width / 2 - rs(50),
      marginRight: rs(15),
    },
    secondAccountType: {
      width: width / 2 - rs(50),
    },
    phnIconPos: {
      marginLeft: -rs(16),
    },
    downArrowPosition: {
      marginLeft: -rs(4),
    },
    phoneactiveBorder: {
      borderWidth: phoneNumber ? 1 : 0,
    },
  });
