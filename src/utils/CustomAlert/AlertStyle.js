import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const customAlertStyle = (...args) => {
  const [colors, type] = args;
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: type.includes('internet') ? 0 : rs(12),
    },
    flashMessage: {
      borderRadius: type.includes('internet') ? 0 : 8,
      margin: type.includes('internet') ? 0 : rs(40),
      width:(type == 'internet-warning' || type == 'internet-success')?width:width-rs(80),
      bottom:(type == 'internet-warning' || type == 'internet-success')? -12 : rs(30),
      alignSelf: "center",
      backgroundColor:
        type == 'internet-warning'
          ? '#D9204C'
          : type == 'internet-success'
          ? '#2AAA5E'
          : type == 'qrScan' ? colors.ifOctonary 
          : colors.ifPrimaryVariant,
      textAlign: 'center',
    },
    textIconContainer: {
      flexDirection: 'row',
      paddingLeft: type.includes('internet') ? 0 : rs(15),
      textAlign: type.includes('internet') ? 'center' : 'left',
    },
    iconStyle: {
      marginRight: rs(10),
      marginTop: rs(3),
    },
    messageContainer: {
      paddingVertical: type.includes('internet') ? rs(0) : rs(15),
      paddingLeft: type.includes('internet-warning')
        ? rs((width * 1) / 3)
        : type.includes('internet-success')
        ? rs((width * 1) / 2.5)
        : rs(15),
    },
    messageStyle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: type.includes('internet') ? rs(1) : rs(22),
      lineHeight: rs(18),
      color: colors.textNonary,
    },
  });
};
