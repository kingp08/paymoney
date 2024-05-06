import {StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';

export const customOtpInputStyle = (
  colors,
  isFocus,
  isError,
  value,
  bgColor,
) => {
  return StyleSheet.create({
    inputCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: value
        ? colors.cornflowerBlue
        : isError
        ? colors.ifOctonary
        : isFocus
        ? colors.cornflowerBlue
        : colors.borderPrimary,
      borderRadius: 8,
      backgroundColor: value
        ? bgColor || colors.bgOctonary
        : isFocus
        ? colors.bgSeptenary
        : colors.bgQuinary,
      height: rs(61),
      width: rs(61),
    },
    input: {
      fontFamily: 'Gilroy-Bold',
      color: colors.textTertiaryVariant,
      fontSize: rs(16),
      margin: 0,
      paddingLeft: 0,
      textAlign: 'center',
      width: '100%',
    },
  });
};
