import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const withdrawMethodBottomSheetStyle = (...args) => {
  const [colors] = args;
  return StyleSheet.create({
    title: {
      color: colors.textSecondary,
      fontSize: rs(18),
      lineHeight: rs(22),
      fontFamily: 'Gilroy-Semibold',
      marginBottom: rs(28),
    },
    textContainer: {
      paddingVertical: rs(15),
      width: width - rs(80),
      textAlign: 'center',
      alignItems: 'center',
    },
    textStyle: {
      color: colors.textQuinary,
      fontSize: rs(15),
      lineHeight: rs(18),
      fontFamily: 'Gilroy-Semibold',
    },
    textBottomBorder: {
      backgroundColor: colors.borderTertiary,
      width: width - rs(40),
      height: 1,
    },
    alignCenter: {
      alignItems: 'center',
      paddingHorizontal: rs(20),
    },
  });
};
