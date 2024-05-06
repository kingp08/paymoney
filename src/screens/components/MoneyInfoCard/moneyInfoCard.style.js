import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const moneyInfoCardStyle = colors =>
  StyleSheet.create({
    container: {
      paddingHorizontal: rs(20),
      paddingVertical: rs(20),
      backgroundColor: colors.ifTertiary,
      borderRadius: 8,
      flexDirection: 'column',
      alignItems: 'center',
    },
    headerTextStyle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      lineHeight: rs(19),
      marginBottom: rs(8),
      textAlign: 'center',
      color: colors.textSecondary,
    },
    amountText: {
      color: colors.textTertiaryVariant,
      fontFamily: 'Gilroy-Bold',
      fontSize: rs(28),
      lineHeight: rs(34),
      textAlign: 'center',
    },
    nameText: {
      marginTop: rs(8),
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(16),
      textAlign: 'center',
      color: colors.textSecondary,
    },
    emailText: {
      marginTop: rs(5),
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(14),
      textAlign: 'center',
      color: colors.textQuaternaryVariant,
    },
  });
