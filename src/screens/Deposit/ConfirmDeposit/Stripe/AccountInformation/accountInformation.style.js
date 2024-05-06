import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const accountInformationStyle = (colors, isError, isFocus, bgColor) =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      height: '100%',
      alignItems: 'center',
      paddingTop: rs(24),
      marginBottom: rs(100),
      backgroundColor: colors.bgSecondary,
    },
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
    },
    mb_16: {
      marginBottom: rs(16),
    },
    mb_20: {
      marginBottom: rs(20),
    },
    processed: {width: width - rs(80), marginBottom: rs(28)},
    cvcCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: rs(16),
      marginBottom: 4,
    },
    label: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    inputCont: {
      width: width - rs(80),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: isError
        ? colors.ifOctonary
        : isFocus
        ? colors.cornflowerBlue
        : colors.borderPrimary,
      borderRadius: 8,
      paddingHorizontal: rs(14),
      backgroundColor: isFocus
        ? bgColor || colors.bgSeptenary
        : colors.bgQuinary,
      height: rs(48),
      fontFamily: 'Gilroy-Semibold',
      color: colors.textSecondary,
      fontSize: rs(14),
      lineHeight: rs(17),
    },
    error: {
      marginTop: rs(8),
      color: colors.ifOctonary,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
    },
    flexCont: {flexDirection: 'row', width: width - rs(80)},
    selectButton: {width: width / 2 - rs(48), marginRight: rs(15)},
    stripeError: {
      width: width - rs(80),
      color: 'red',
      fontSize: rs(13),
    },
    contentWidth: {
      width: width - rs(80),
    },
    stepAlignment:{
      alignItems:'center'
    }
  });
