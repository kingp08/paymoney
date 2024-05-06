import {StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';

export const customButtonStyle = (
  colors,
  bgColor = colors.cornflowerBlue,
  color = colors.white,
  disabled,
  icon,
  title,
) =>
  StyleSheet.create({
    btnCont: {
      backgroundColor:
        disabled && ((title && typeof icon === 'object') || title)
          ? colors.btnQuinary
          : bgColor,
      borderRadius: rs(8),
      height: rs(48),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: disabled ? colors.textSenaryVariant : color,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      marginLeft: typeof icon === 'object' && title ? rs(7) : undefined,
    },
  });
