import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../../utils/styles/responsiveSize';
const {height} = Dimensions.get('window');
export const paginationStyle = colors =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: height > 700 ? rs(26) : height > 590 ? rs(22) : rs(20),
    },
    dot: {
      width: rs(7),
      height: rs(7),
      borderRadius: 50,
      marginRight: rs(8),
    },
  });
