import {StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';

export const cardButtonStyle = (colors, textColor) =>
  StyleSheet.create({
    cartBtnCont: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      color: textColor || colors.btnTertiary,
      marginRight: rs(4),
      lineHeight: rs(15),
    },
  });
