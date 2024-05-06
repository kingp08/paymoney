import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const checkWalletsStyle = (
  colors,
  bg,
  rightIconBg,
  leftIconBg,
  mainTextColor,
) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: rs(20),
    },
    card: {
      backgroundColor: bg ? bg : colors.jacarta,
      borderRadius: 8,
      overflow: 'hidden',
    },
    flex: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIconS: {
      paddingHorizontal: rs(14),
      paddingVertical: rs(16),
      backgroundColor: rightIconBg ? rightIconBg : colors.cornflowerBlue,
      borderRadius: rs(8),
    },
    textContainer: {
      marginLeft: rs(10),
    },
    headerTextS: {
      color: colors.white,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(18),
    },
    mainTextS: {
      color: mainTextColor ? mainTextColor : colors.sunshade,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      lineHeight: rs(20),
    },
    rightIconS: {
      paddingRight: rs(23),
      backgroundColor: leftIconBg && leftIconBg,
      borderRadius: rs(8),
    },
  });
