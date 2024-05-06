import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const depoBankConfirmStyle = () => {
  return StyleSheet.create({
    horizontal_padding: {
      paddingHorizontal: rs(20),
    },
    transactionStep: {
      alignItems: 'center',
      width: width - rs(40),
    },
    contentWidth: {
      width: width - rs(40),
    },
  });
};
