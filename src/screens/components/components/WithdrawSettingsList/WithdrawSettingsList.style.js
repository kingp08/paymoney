import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');

export const withdrawSettingsListStyle = (...args) => {
  const [colors] = args;
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      marginVertical: rs(10),
      backgroundColor: colors.bgQuaternary,
      width: width - rs(60),
      paddingTop: rs(14),
      borderRadius: 8,
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'Gilroy-Semibold',
      color: colors.textTertiaryVariant,
      fontSize: rs(15),
      lineHeight: rs(18),
      marginBottom: rs(10),
    },
  });
};
