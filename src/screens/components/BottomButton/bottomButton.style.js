import {Dimensions, Platform, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const bottomButtonStyle = (colors, disable) =>
  StyleSheet.create({
    footerCont: {
      zIndex: -999,
      height: Platform.OS === 'ios' ? rs(100) : rs(80),
      width: width,
      backgroundColor: colors.btnSecondary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.ifSecondary,
      paddingBottom: Platform.OS === 'ios' ? rs(20) : 0,
    },
    cancel: {
      width: width / 2 - rs(20),
      marginLeft: rs(20),
    },
    depositNowBtn: {
      width: width / 2 - rs(20),
      backgroundColor: !disable ? colors.btnOctonary : 'gray',
      marginRight: rs(20),
      height: rs(80) - rs(32),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
    },
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
      textAlign: 'center',
    },
    btnColor: {
      color: colors.btnSenary,
    },
  });
