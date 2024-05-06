import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const addWithdrawSettingsStyle = (colors) => {
  return StyleSheet.create({
    onKeyboard: {flex: 1},
    pageContainer: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    elememtsContainer: {
      alignItems: 'center',
    },
    btnContainer: {
      alignItems: 'center',
      marginTop: rs(20),
      marginBottom: rs(50),
    },
    mt_21: {
      marginTop: rs(21),
    },
  });
};
