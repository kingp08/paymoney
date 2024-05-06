import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const changePasswordStyle = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      alignItems: 'center',
      paddingTop: rs(24),
      paddingHorizontal: rs(40),
    },
    headerText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(20),
      color: colors.textQuinary,
      marginBottom: rs(20),
      textAlign: 'center',
    },
    inputTitle: {
      marginBottom: rs(6),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    mb_24: {
      marginBottom: rs(24),
    },
    mb_20: {
      marginBottom: rs(20),
    },
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
      textAlign: 'center',
      paddingVertical: rs(10),
      width: width - rs(80),
    },
    width: {width: width - rs(80)},
    btn: {width: width - rs(80), marginBottom: rs(18)},
  });
