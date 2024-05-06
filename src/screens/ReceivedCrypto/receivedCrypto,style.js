import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const receivedCrypto = colors => {
  return StyleSheet.create({
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(20)
    },
    container: {
      height: '100%',
      alignItems: 'center',
      marginTop: rs(75),
      marginBottom: rs(100),
      backgroundColor: colors.bgSecondary,
    },
    loaderStyle: {height: rs(60), width: rs(60)},
    qrCont: {
      alignItems: 'center',
      justifyContent: 'center',
      width: rs(212),
      height: rs(212),
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.lavenderGray,
      borderRadius: 8,
      padding: rs(28),
    },
    qrImg: {
      width: rs(158),
      height: rs(158),
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendAgainBtn: {
      width: width - rs(80),
      marginTop: rs(20),
    },
    alertCont: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: rs(70),
      marginBottom: rs(82),
    },
    alertText: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(15),
      color: colors.textQuinary,
      marginTop: rs(21),
    },
    receivedText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      textAlign: 'center',
      marginTop: rs(24),
      color: colors.textSecondary,
    },
    address: {
      fontFamily: 'Gilroy-Semibold',
      marginTop: rs(12),
      fontSize: rs(16),
      lineHeight: rs(19),
      textAlign: 'center',
      color: colors.textQuinary,
    },
    backToHome: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
      marginTop: rs(28),
      textAlign: 'center',
    },
  });
};
