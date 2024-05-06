import {StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';

export const buttonOutlineStyle = (
  colors,
  bgColor,
  color = colors.textQuinary,
  borderColor = colors.btnQuaternary,
  disabled = false,
  icon,
  title,
) =>
  StyleSheet.create({
    btnOutlineCont: {
      height: rs(44),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: disabled ? colors.btnQuinary : borderColor,
      borderRadius: rs(8),
      backgroundColor:
        disabled && ((title && typeof icon === 'object') || title)
          ? colors.btnQuinary
          : bgColor,
    },
    btnOutlineText: {
      color: disabled ? colors.textSenaryVariant : color,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      marginLeft: typeof icon === 'object' && title ? rs(7) : undefined,
    },
  });
