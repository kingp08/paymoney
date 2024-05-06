import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const bottomSheetStyle = (colors, item='', selectItem=1) =>
  StyleSheet.create({
    titleContainer: {
      paddingTop: rs(18),
      marginBottom: rs(10),
    },
    title: {
      color: colors.textSecondary,
      fontSize: rs(18),
      lineHeight: rs(22),
      fontFamily: 'Gilroy-Semibold',
      marginBottom: rs(28),
    },
    textContainer: {
      paddingVertical: rs(15),
      alignItems: 'center',
    },
    textStyle: {
      color: item===selectItem?colors.textTertiaryVariant:colors.textQuinary,
      fontSize: rs(14),
      lineHeight: rs(17),
      fontFamily: 'Gilroy-Semibold',
      alignItems: 'center',
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
