import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const depositUsingStripeDetailsStyle = colors =>
  StyleSheet.create({
    cardCont: {
      width: width - rs(80),
      backgroundColor: colors.bgQuaternary,
      marginBottom: rs(20),
      paddingTop: rs(14),
      borderRadius: 8,
    },
    header: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(15),
      paddingHorizontal: rs(12),
      color: colors.textQuinary,
      marginBottom: rs(10),
    },
    stripeIcon: {
      paddingHorizontal: rs(12),
      marginBottom: rs(16),
    },
    paypalText: {
      color: colors.textQuinary,
    },
  });
