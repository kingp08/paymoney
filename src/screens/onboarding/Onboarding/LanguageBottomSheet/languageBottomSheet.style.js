import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const languageBottomSheetStyle = (colors, item, selectItem) =>
  StyleSheet.create({
    title: {
      color: colors.textSecondary,
      fontSize: rs(18),
      lineHeight: rs(22),
      fontFamily: 'Gilroy-Semibold',
      marginBottom: rs(24),
    },
    textContainer: {
      paddingVertical: rs(15),
      alignItems: 'center',
    },
    textStyle: {
      color: colors.textQuinary,
      fontSize: rs(14),
      lineHeight: rs(17),
      fontFamily: 'Gilroy-Semibold',
      alignItems: 'center',
      color:
        item === selectItem ? colors.textTertiaryVariant : colors.textQuinary,
    },
    textBottomBorder: {
      backgroundColor: colors.borderTertiary,
      width: width - rs(40),
      height: 1,
    },
    alignCenter: {
      alignItems: 'center',
    },
  });
