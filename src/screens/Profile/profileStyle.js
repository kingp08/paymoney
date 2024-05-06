import {StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
export const profileStyle = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      paddingTop: rs(24),
      paddingBottom: rs(40),
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(20),
    },
    profileCardsComponent: {
      flexDirection: 'row',
      marginTop: rs(12),
      marginBottom: rs(24),
      justifyContent: 'space-between',
      marginBottom: rs(6),
    },
    loading: {
      width: '100%',
      height: rs(70),
      alignItems: 'center',
      justifyContent: 'center',
    },
    qrButtonCont: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: rs(14),
      backgroundColor: colors.bgQuaternary,
      borderRadius: 8,
      borderColor: colors.borderSeptenary,
      borderWidth: 1,
      marginTop: rs(12),
      justifyContent: 'space-between',
    },
    qrCodeCont: {flexDirection: 'row', alignItems: 'center'},
    qrCodeText: {
      marginLeft: rs(8),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
  });
