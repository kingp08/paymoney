import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const settingInfoStyle = (colors, last) =>
  StyleSheet.create({
    featuresCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: rs(16),
      paddingBottom: rs(14),
      borderBottomWidth: last ? 0 : 1,
      alignItems: 'center',
      borderBottomColor: colors.borderSenary,
    },
    featuresText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      lineHeight: rs(20),
      color: colors.textSecondary,
    },
    featuresTextCont: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightArrow: {
      marginLeft: rs(8),
    },
    features: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textQuaternaryVariant,
    },
  });
