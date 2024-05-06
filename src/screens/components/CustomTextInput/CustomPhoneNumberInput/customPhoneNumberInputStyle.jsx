import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const customPhoneNumberInputStyle = (...args) => {
  let [
    colors,
    bgColor,
    codeTextColor,
    phnTextColor,
    borderColor,
    phnIcon,
    phnNumLength,
    error,
    layout,
  ] = args;

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    activeBorderColor: {
      borderColor:
        phnNumLength > 0 ? !error && borderColor : error && colors.ifOctonary,
    },
    phoneContainer: {
      width: width - rs(60),
      height: rs(50),
      backgroundColor: bgColor || colors.bgQuinary,
      borderRadius: 8,
      paddingLeft: phnIcon ? rs(31) : rs(0),
      paddingRight: 10,
      borderColor: error
        ? colors.ifOctonary
        : phnNumLength > 0
        ? colors.cornflowerBlue
        : colors.borderPrimary,
      borderWidth: 1,
      borderRadius: 8,
    },
    textInput: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      backgroundColor: bgColor,
      borderRadius: 8,
      marginLeft: -rs(7),
    },
    codeText: {
      color: codeTextColor || colors.textQuinary,
      fontSize: rs(14),
      lineHeight: rs(17),
      fontFamily: 'Gilroy-Semibold',
    },
    phnText: {
      color: phnTextColor || colors.textOctonaryVariant,
      fontSize: rs(14),
      fontFamily: 'Gilroy-Semibold',
      textAlignVertical: 'center',
      paddingLeft: -rs(20),
    },
    phnIconStyle: {
      paddingLeft: 0,
      position: 'absolute',
      top: rs(19),
      left: rs(33),
      zIndex: 100,
    },
    flagBtnStyle: {
      marginLeft: -rs(4),
    },
    icon:{
      paddingLeft: 0,
      position: 'absolute',
      right: 0,
      top:3,
      zIndex: 100,
    },
    inputTitle: {
      marginBottom: rs(6),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    error: {
      marginTop: rs(8),
      color: colors.ifOctonary,
      width: layout?.width || undefined,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
    },
    ml_4: {marginLeft: -rs(4)},
  });
};
