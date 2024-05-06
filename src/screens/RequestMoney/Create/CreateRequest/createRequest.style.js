import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const moneyRequestStyle = colors => {
  return StyleSheet.create({
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
    inputTitle: {
      marginBottom: rs(6),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    email: {
      marginTop: rs(20),
      marginBottom: rs(16),
    },
    mb_16: {
      marginBottom: rs(16),
    },
    mb_20: {
      marginBottom: rs(20),
    },
    qrButton:{padding: rs(10), marginLeft: rs(-10),},
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
      paddingVertical: rs(10),
      textAlign: 'center',
    },
    inputWidth: {
      width: width - rs(80),
    },
    lottie: {
      height: rs(40),
      width: rs(55),
      marginRight: rs(-15),
    },
    contentWidth: {
      width: width - rs(80),
    },
    transactionStep: {alignItems: 'center', width: width - rs(80)},
    addNote: {
      height: rs(100),
      width: width - rs(80),
    },
    btnWidth: {width: width - rs(80), marginBottom: rs(18)},
  });
};
