import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const transactionBottomSheetStyle = colors =>
  StyleSheet.create({
    container: {paddingHorizontal: rs(20)},
    bottomHeaderText: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(15),
      marginBottom: rs(12),
      color: colors.textQuaternary,
    },
    bottomMainHeader: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(18),
      lineHeight: rs(22),
      marginBottom: rs(6),
      color: colors.textSecondary,
    },
    bottomMoneyText: {
      textAlign: 'center',
      fontFamily: 'Gilroy-Bold',
      fontSize: rs(28),
      lineHeight: rs(35),
      marginBottom: rs(17),
      color: colors.textTertiaryVariant,
    },
    btnCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: rs(4),
      paddingHorizontal: rs(20),
    },
    btnCancel: {
      width: width / 2 - rs(27),
    },
    btnDelete: {
      width: width / 2 - rs(27),
    },
    btnOutline: {paddingHorizontal: rs(20), marginTop: rs(4)},
  });
