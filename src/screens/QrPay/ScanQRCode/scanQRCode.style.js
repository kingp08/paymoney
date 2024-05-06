import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const scanQRCodeStyles = colors =>
  StyleSheet.create({
    svgCont: {
      alignSelf: 'center',
      top:'20%'
    },
    scanDescCont: {
      bottom: rs(20),
      position: 'absolute',
      alignSelf: 'center',
      width: width - rs(40),
    },
    scanDesc: {
      paddingHorizontal: rs(18),
      paddingVertical: rs(16),
      flexDirection: 'row',
      backgroundColor: 'rgba(60, 55, 71, 0.85)',
      borderRadius: 8,
    },
    scanDescText: {
      color: colors.white,
      paddingLeft: rs(12),
      paddingRight: rs(38),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      lineHeight: rs(20),
    },
  });
