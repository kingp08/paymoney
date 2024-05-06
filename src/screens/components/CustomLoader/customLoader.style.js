import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {height, width} = Dimensions.get('window');
export const customLoaderStyle = colors =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      height: height,
      width: width,
      marginTop: rs(-50),
    },
    loader: {
      height: rs(80),
      width: rs(80),
      backgroundColor: colors.bgSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      zIndex: 2,
    },
    backgroundLoader: {
      zIndex: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      position: 'absolute',
      height: height,
      width: width,
    },
  });
