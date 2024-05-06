import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const confirmSendMoneyStyle = colors =>
  StyleSheet.create({
    amountContainer: {
      alignItems: 'center',
      backgroundColor: colors.bgQuaternary,
      width: width - rs(50),
      paddingVertical: rs(16),
      marginTop: rs(20),
      marginBottom: rs(16),
      borderRadius: 8,
    },
    sendAmountText: {
      color: colors.textSecondary,
      fontFamily: 'Gilroy-Semibold',
      fontZize: rs(14),
      lineHeight: rs(17),
      marginBottom: rs(6),
    },
    amountText: {
      color: colors.btnTertiary,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(28),
      lineHeight: rs(35),
    },
    headerText: {
      color: colors.textSeptenaryVariant,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      lineHeight: rs(18),
    },
    reviewText: {
      textAlign: 'center',
      width: width - rs(40),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      color: colors.textSecondary,
    },
    noteText: {
      color: colors.textQuinary,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      lineHeight: rs(20),
      marginTop: rs(8),
    },
  });
