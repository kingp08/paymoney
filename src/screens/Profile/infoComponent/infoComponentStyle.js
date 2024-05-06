import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
export const infoComponentStyle = (...args) => {
  const [colors, layout, lastElement] = args;
  return StyleSheet.create({
    infoCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: rs(18),
      paddingBottom: rs(15),
      borderBottomWidth: 1,
      alignItems: 'center',
      borderBottomColor: colors.borderSenary,
      borderBottomWidth: lastElement ? 0 : 1,
    },
    info: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textQuaternaryVariant,
      width: layout || undefined,
    },
    textContParent: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: layout || undefined,
    },
    infoText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textTertiary,
    },
  });
};
