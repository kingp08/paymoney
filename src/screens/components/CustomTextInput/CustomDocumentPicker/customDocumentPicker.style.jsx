import {StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';

export const customDocumentPickerStyle = (colors, value, isError, layout) =>
  StyleSheet.create({
    documentPickerCont: {
      height: rs(48),
      borderWidth: 1,
      borderColor: isError
        ? colors.ifOctonary
        : value
        ? colors.cornflowerBlue
        : colors.borderPrimary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rs(16),
      backgroundColor: value ? colors.bgOctonary : colors.bgQuinary,
      borderRadius: 8,
    },
    label: {
      marginBottom: 4,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textOctonaryVariant,
    },
    verticalLine: {
      height: 22,
      width: 1.2,
      backgroundColor: colors.borderNonary,
      marginHorizontal: rs(11),
    },
    documentPickerText: {
      color: value ? colors.textSecondary : colors.textQuaternaryVariant,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      marginRight: rs(35),
    },
    error: {
      marginTop: rs(8),
      color: colors.ifOctonary,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      width: layout?.width - rs(5) || undefined,
    },
    info: {
      marginTop: rs(8),
      color: colors.textQuaternaryVariant,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      width: layout?.width - rs(5) || undefined,
    },
  });
