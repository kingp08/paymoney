import {StyleSheet, Dimensions} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const profileCardStyle = (colors, bgColor, valueColor) =>
  StyleSheet.create({
    profileCardCont: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: rs(12),
      paddingVertical: rs(14),
      backgroundColor:
        bgColor === 'wallets'
          ? colors.jacarta
          : bgColor === 'transactions'
          ? colors.cornflowerBlue
          : colors.white,
      width: width / 2 - rs(30),
      borderRadius: 8,
    },
    infoCard: {
      flex: 1,
    },
    textS: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: width <= 370 ? rs(9) : rs(12),
      lineHeight: width <= 370 ? rs(12) : rs(16),
      color: colors.white,
    },
    valueS: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(26),
      paddingLeft:rs(5),
      color:
        valueColor === 'wallets'
          ? colors.sunshade
          : valueColor === 'transactions'
          ? colors.white
          : colors.white,
    },
    lastUseS: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(9),
      color: colors.white,
      marginTop: rs(5),
    },
  });
