import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const customInputStyle = (
  colors,
  isFocus,
  value,
  isError,
  layout,
  editable,
  isConvertible,
  bgColor,
  inputWidth,
) => {
  return StyleSheet.create({
    label: {
      marginBottom: 4,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    inputCont: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor:
        !editable && isConvertible
          ? colors.borderPrimary
          : !editable
          ? colors.btnQuinary
          : isError
          ? colors.ifOctonary
          : isFocus
          ? colors.cornflowerBlue
          : colors.borderPrimary,
      borderRadius: 8,
      paddingHorizontal: rs(14),
      backgroundColor:
        !editable && isConvertible
          ? colors.bgQuinary
          : !editable
          ? colors.bgSecondaryVariant
          : isFocus
          ? bgColor || colors.bgSeptenary
          : colors.bgQuinary,
      height: rs(48),
    },
    icon: {
      marginRight: rs(14),
    },
    input: {
      fontFamily: value === '' ? 'Gilroy-Medium' : 'Gilroy-Semibold',
      color:
        !editable && isConvertible
          ? colors.textOctonaryVariant
          : !editable
          ? colors.textQuaternaryVariant
          : colors.textSecondary,
      fontSize: rs(14),
      margin: 0,
      paddingLeft: 0,
      height: layout?.height || undefined,
      lineHeight: rs(17),
    },
    error: {
      marginTop: rs(8),
      color: colors.ifOctonary,
      width: layout?.width || undefined,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
    },
    info: {
      marginTop: rs(8),
      color: colors.textQuaternaryVariant,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(17),
      width: layout?.width || undefined,
    },
    mt: {
      marginTop: rs(8),
    },
    rightIconMargin: {
      marginLeft: rs(7),
    },
    inputWidth: {
      width: inputWidth,
    },
  });
};
