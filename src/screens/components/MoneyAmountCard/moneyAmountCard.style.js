import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const moneyAmountCardStyle = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.ifTertiary,
      borderRadius: 8,
      flexDirection: 'column',
      alignItems: 'center',
    },
    headerText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(16),
      marginBottom: rs(6),
      marginTop: rs(21),
      textAlign: 'center',
      color: colors.textSecondary,
    },
    amountText: {
      color: colors.textTertiaryVariant,
      fontFamily: 'Gilroy-Bold',
      fontSize: rs(28),
      lineHeight: rs(34),
      textAlign: 'center',
      marginBottom: rs(17),
    },
  });
