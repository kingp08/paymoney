import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const requestReviewStyle = (...args) => {
  const [colors] = args;
  return StyleSheet.create({
    onKeyboard: {
      flex: 1,
    },
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
      paddingHorizontal: rs(40),
    },
    email: {
      marginTop: rs(20),
      marginBottom: rs(16),
    },
    mb_16: {
      marginBottom: rs(16),
    },
    mb_20: {
      marginBottom: rs(20),
    },
    width_80: {width: width - rs(80)},
    height_100: {width: width - rs(80), height: rs(100)},
    mb_28: {marginBottom: rs(18)},
    inputTitle: {
      marginBottom: rs(6),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    proceedBtn: {
      width: '100%',
      textAlign: 'center',
      color: colors.white,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      lineHeight: rs(18),
    },
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      color: colors.textQuinary,
      lineHeight: rs(17),
      paddingVertical: rs(10),
      width: width - rs(80),
      textAlign: 'center',
    },
    errorText: {
      marginTop: rs(24),
      textAlign: 'center',
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      marginTop: rs(16),
      color: colors.textQuinary,
      textAlign: 'center',
      lineHeight: rs(20),
    },
  });
};
