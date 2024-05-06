import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const confirmExchangeCurrencyStyle = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
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
      paddingHorizontal: rs(40),
    },
    moneyCard: {marginTop: rs(20), marginBottom: rs(16)},
    detailsCardCont: {
      width: width - rs(40),
      backgroundColor: colors.bgQuaternary,
      marginBottom: rs(20),
      paddingTop: rs(14),
      borderRadius: 8,
    },
    width_40: {
      width: width - rs(40),
    },
    headerText: {
      color: colors.textSeptenaryVariant,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      lineHeight: rs(18),
      paddingHorizontal: rs(12),
    },
    pb_4: {paddingBottom: rs(4)},
  });
