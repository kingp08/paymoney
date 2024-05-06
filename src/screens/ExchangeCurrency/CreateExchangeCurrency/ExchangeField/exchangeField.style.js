import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const exchangeFieldStyle = colors =>
  StyleSheet.create({
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    selectInput: {
      width: width / 3.5 - rs(25),
    },
    customInput: {
      width: width / 1.5 - rs(45),
    },
    labelText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      marginBottom: rs(6),
      color: colors.textSecondary,
    },
    balanceText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      marginTop: rs(8),
      color: colors.textQuaternary,
    },
    lottie: {
      height: rs(40),
      width: rs(60),
      left:rs(-5)
    },
    display_none: {display: 'none'},
  });
