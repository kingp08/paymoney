import {StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';

export const selectInputStyle = (colors, title, isError, layout) =>
  StyleSheet.create({
    selectInputCont: {
      height: rs(48),
      borderWidth: 1,
      borderColor: isError
        ? colors.ifOctonary
        : title
        ? colors.cornflowerBlue
        : colors.borderPrimary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: rs(16),
      backgroundColor: title ? colors.bgOctonary : colors.bgQuinary,
      borderRadius: 8,
    },
    selectInputText: {
      color: title ? colors.textSecondary : colors.manatee,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      marginRight: 5,
    },
    label: {
      marginBottom: 4,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    error: {
      marginTop: rs(8),
      color: colors.ifOctonary,
      width: layout?.width - rs(5) || undefined,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
    },
  });
