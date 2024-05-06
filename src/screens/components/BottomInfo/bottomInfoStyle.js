import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
export const bottomInfoStyle = (
  colors,
  success,
  note,
  layout,
  text,
  last,
  copy,
) =>
  StyleSheet.create({
    infoCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: rs(15),
      paddingBottom: rs(12),
      borderBottomColor: colors.borderSecondary,
      borderBottomWidth: last ? 0 : 1,
    },
    title: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textQuinary,
      width: layout || undefined,
    },
    textContParent: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: layout || undefined,
    },
    textCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    text: {
      fontFamily: note ? 'Gilroy-Medium' : 'Gilroy-Semibold',
      fontSize: note ? rs(12) : rs(14),
      lineHeight: note ? rs(18) : rs(17),
      color: success || colors.textSecondary,
      textAlign: 'right',
      marginLeft: copy ? rs(6) : 0,
    },
    emailText: {
      fontFamily: !text ? 'Gilroy-Semibold' : 'Gilroy-Medium',
      paddingTop: !text ? 0 : rs(5),
      fontSize: !text ? rs(14) : rs(12),
      lineHeight: !text ? rs(18) : rs(14),
      color: !text ? colors.textSecondary : colors.textQuaternaryVariant,
    },
  });
