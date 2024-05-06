import {StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
export const passwordChangeSuccessStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.bgSecondary,
      paddingTop: rs(207),
    },
    successHeader: {
      marginTop: rs(36),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(20),
      lineHeight: rs(30),
      textAlign: 'center',
      color: colors.textSecondary,
    },
    description: {
      fontFamily: 'Gilroy-Medium',
      color: colors.textQuinary,
      fontSize: rs(14),
      lineHeight: rs(20),
      textAlign: 'center',
      marginTop: rs(16),
    },
    iconAlignment: {
      top: rs(8),
    },
  });
