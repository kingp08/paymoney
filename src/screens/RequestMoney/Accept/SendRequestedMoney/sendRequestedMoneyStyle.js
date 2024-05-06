import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const sendRequestedMoneyStyle = colors =>
  StyleSheet.create({
    onKeyboard: {
      flex: 1,
    },
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
    moneyCard: {marginTop: rs(20), marginBottom: rs(16)},
    sendAmountText: {
      color: colors.textSecondary,
      fontFamily: 'Gilroy-Semibold',
      fontZize: rs(14),
      lineHeight: rs(17),
      marginBottom: rs(6),
    },
    pb_4: {paddingBottom: rs(4)},
    cardCont: {
      width: width - rs(40),
      backgroundColor: colors.bgQuaternary,
      marginBottom: rs(16),
      paddingTop: rs(14),
      borderRadius: 8,
    },
    width_40: {width: width - rs(40)},
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
      paddingHorizontal: rs(12),
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
      paddingTop: rs(10),
      paddingBottom: rs(13),
      paddingHorizontal: rs(12),
    },
  });
