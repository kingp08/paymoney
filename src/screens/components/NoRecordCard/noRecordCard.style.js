import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const noRecordCardStyle = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.bgQuaternary,
      paddingTop: rs(27),
      paddingBottom: rs(25),
      borderRadius: 8,
      paddingHorizontal: rs(20),
    },
    textStyle: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(20),
      color: colors.manatee,
    },
  });
