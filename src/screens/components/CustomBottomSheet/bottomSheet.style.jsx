import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
export const bottomSheetStyles = (colors, indicatorColor, bgColor) =>
  StyleSheet.create({
    contentContainer: {
      paddingVertical: rs(18),
    },
    bottomSheetIndicator: {
      backgroundColor: indicatorColor || colors.bgDenary,
      height: 3,
      width: 32,
    },
    backgroundStyle: {
      backgroundColor: bgColor || colors.bgQuaternary,
      borderTopLeftRadius: rs(28),
      borderTopRightRadius: rs(28),
    },
  });
