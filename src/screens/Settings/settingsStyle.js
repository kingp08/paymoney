import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const settingsStyle = colors => {
  return StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      height: '100%',
      paddingTop: rs(24),
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(20),
    },
    themeText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      marginBottom: rs(8),
      color: colors.textSecondary,
      width: width - rs(30),
      textAlign: 'left',
      lineHeight: rs(20),
    },
    themeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    settingsFeatures: {
      marginTop: rs(8),
    },
  });
};
