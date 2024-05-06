import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const profileQRCodeStyle = colors =>
  StyleSheet.create({
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      paddingTop: rs(24),
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(20),
    },
    qrContainer: {
      marginTop: rs(12),
      backgroundColor: colors.bgQuaternary,
      borderRadius: 8,
      borderColor: colors.borderSeptenary,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: rs(20),
      paddingBottom: rs(28),
      paddingHorizontal: rs(37),
    },
    description: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(20),
      color: colors.textQuinary,
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
    updateScanText: {
      textDecorationLine: 'underline',
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      textAlign: 'center',
      lineHeight: rs(17),
      color: colors.textSecondary,
      padding: rs(4),
    },
    qrCodeCont: {
      alignItems: 'center',
      justifyContent: 'center',
      height: rs(180),
      width: rs(180),
      backgroundColor: 'white',
      borderColor: '#E0DFEF',
      borderWidth: 1,
      marginTop: rs(24),
      marginBottom: rs(28),
    },
    loaderStyle: {height: rs(60), width: rs(60)},
    qrCode: {
      width: rs(158),
      height: rs(158),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textAlign: {alignItems:"center"}
  });
