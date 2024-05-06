import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const depositUsingBankStyle = colors =>
  StyleSheet.create({
    mb_24: {marginBottom: rs(24)},
    accountNameCont: {
      width: width - rs(80),
    },
    bankInfoCont: {
      flexDirection: 'row',
      width: width - rs(80),
    },
    labelText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(15),
      marginBottom: rs(6),
      color: colors.textQuaternaryVariant,
    },
    valueText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(18),
      color: colors.textSecondary,
    },
    accountNumberCont: {width: width / 2 - rs(80), marginRight: rs(34)},
    bankNameCont: {width: width / 2 - rs(70), marginRight: rs(34)},
    header: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      paddingHorizontal: rs(12),
      color: colors.textSeptenaryVariant,
      marginBottom: rs(4),
    },
  });
