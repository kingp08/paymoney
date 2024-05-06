import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const actionsCardStyle = (
  colors,
  bg,
  textColor,
  borderColor,
  last,
  fixedWidth,
) =>
  StyleSheet.create({
    card: {
      backgroundColor: bg ? bg : colors.bgQuaternary,
      borderColor: borderColor ? borderColor : colors.ifSecondary,
      borderWidth: 1,
      paddingHorizontal: rs(17),
      height: rs(96),
      width: fixedWidth ? fixedWidth : width / 3 - rs(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    container: {
      marginBottom: last ? rs(0) : rs(12),
      borderRadius: 8,
      overflow: 'hidden',
    },
    flex: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textS: {
      marginTop: rs(10),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(22),
      color: textColor ? textColor : colors.textSecondary,
    },
  });
