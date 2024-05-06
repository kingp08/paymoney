import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const bottomTabBarQRIconStyle = (colors, focused) =>
  StyleSheet.create({
    cont: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    qrCode: {
      top: rs(-5),
      width: rs(62),
      height: rs(62),
      borderRadius: rs(31),
      backgroundColor: colors.cornflowerBlue,
      shadowColor: colors.cornflowerBlue,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3.5,
      elevation: 5,
    },
    label: {
      color: colors.tabIconUnfocused,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(10),
      lineHeight: rs(30),
      marginBottom: rs(35),
    },
  });
