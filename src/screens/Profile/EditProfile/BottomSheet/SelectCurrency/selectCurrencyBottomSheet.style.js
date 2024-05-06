import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const selectCurrencyBottomSheetStyle = colors =>
  StyleSheet.create({
    title: {
      color: colors.textSecondary,
      fontSize: rs(18),
      lineHeight: rs(22),
      fontFamily: 'Gilroy-Semibold',
      textAlign: 'center',
      marginBottom: rs(24),
    },
    sheetCont: {
      paddingHorizontal: rs(40),
    },
    textContainer: {
      paddingVertical: rs(15),
      alignItems: 'center',
    },
    textStyle: {
      color: colors.textOctonaryVariant,
      fontSize: rs(15),
      lineHeight: rs(18),
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
    emptyCont: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: rs(48),
    },
    notFoundText: {
      marginVertical: rs(16),
      textAlign: 'center',
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      lineHeight: rs(25),
      color: colors.textQuaternaryVariant,
    },
    notFoundDesc: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(20),
      color: colors.textQuaternaryVariant,
    },
    cancelBtn: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pt_18: {paddingTop: rs(18)},
    textInput: {
      marginHorizontal: rs(40),
      backgroundColor: colors.bgQuaternary,
      marginBottom: rs(9),
    },
    mb_24: {
      marginBottom: rs(24),
    },
    loadingText: {textAlign: 'center', marginTop: rs(8)},
    width_80: {width: width - rs(80)},
    itemText: {
      alignItems: 'flex-start',
      width: width - rs(80),
    },
    btmsheetHorizontalPadding: {
      paddingHorizontal: rs(8),
    },
  });
