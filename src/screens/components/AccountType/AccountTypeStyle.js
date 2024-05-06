import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const accountTypeStyle = colors =>
  StyleSheet.create({
    accountTypeCon: {
      textAlign: 'left',
      marginBottom: rs(8),
    },
    selectTextStyle: {
      color: colors.textSecondary,
    },
    typeofContainer: {
      flexDirection: 'row',
      paddingVertical: rs(20),
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    activetypeofContainer: {
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: colors.bgOctonary,
      borderColor: colors.cornflowerBlue,
    },
    inactivetypeofContainer: {
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: colors.bgQuinary,
      borderColor: colors.borderPrimary,
    },
    firstTypeofContainer: {
      marginRight: rs(15),
    },
    typeofTextStyle: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: width <= 370 ? rs(9) : rs(14),
      lineHeight: width <= 370 ? rs(24) : rs(17),
    },
    activeTypeofTextStyle: {
      color: colors.userIcon,
    },
    inactiveTypeofTextStyle: {
      color: colors.textQuinary,
    },
    iconStyle: {
      marginRight: rs(10),
    },
    checkedIconPosition: {
      position: 'absolute',
      top: 0,
      left: 5,
      top: 5,
    },
  });
