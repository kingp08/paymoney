import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const errorMessageStyle = (bg, colors) =>
  StyleSheet.create({
    textStyle: {
      backgroundColor: bg ? bg : colors.ifOctonary,
      paddingVertical: rs(5),
      color: colors.white,
      textAlign: 'center',
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(24),
      paddingHorizontal: rs(40),
    },
  });
