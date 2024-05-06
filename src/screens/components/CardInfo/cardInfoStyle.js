import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
export const cardInfoStyle = (
  colors,
  successColor,
  paddingH,
  layout,
  last,
  copy,
) =>
  StyleSheet.create({
    infoCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: rs(14),
      paddingBottom: rs(13),
      borderBottomWidth: last ? 0 : 1,
      borderBottomColor: colors.borderSecondary,
      paddingHorizontal: paddingH || rs(12),
    },
    title: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(13),
      lineHeight: rs(18),
      color: colors.textQuinary,
      width: layout || undefined,
    },
    textCont: {
      width: layout || undefined,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    text: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(13),
      lineHeight: rs(16),
      textAlign: 'right',
      color: successColor || colors.textOctonaryVariant,
      marginLeft: copy ? rs(6) : 0,
    },
  });
