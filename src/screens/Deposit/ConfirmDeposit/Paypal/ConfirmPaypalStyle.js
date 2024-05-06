import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width, height} = Dimensions.get('window');

export const ConfirmPaypalStyle = colors => {
  return StyleSheet.create({
    webView: {width: width},
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      height: height - rs(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeIndicator:{
      position:"absolute", 
      zIndex:9999, 
      left: width/2, 
      top: rs(13)
    }
  });
};
