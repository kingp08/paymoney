import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const MyWalletStyle = (colors, amountColor, currencyIconFill) =>
  StyleSheet.create({
    walletSections: {
      alignItems: 'center',
      flexGrow: 1,
      paddingBottom: rs(40),
      paddingTop: rs(14),
    },
    walletContainer: {
      marginTop: rs(12),
    },
    singleWalletContainer: {
      borderWidth: 1,
      borderColor: colors.borderPrimaryVariant,
      borderRadius: 8,
    },
    flex:{
      width: width - 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.bgQuaternary,
      paddingVertical: rs(20),
      paddingHorizontal: rs(14),
    },
    currencyNameIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencyIcon: {
      backgroundColor: colors.bgOctonary,
      height: rs(30),
      width: rs(30),
      borderRadius: rs(50),
      marginRight: rs(12),
    },
    currencyName: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(18),
      lineHeight: rs(20),
      color: colors.textSecondary,
    },
    defaultText: {
      fontFamily: 'Gilroy-Medium',
      marginLeft: rs(6),
      fontSize: rs(12),
      lineHeight: rs(15),
      color: colors.textTertiaryVariant,
    },
    amountText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(18),
      lineHeight: rs(20),
      color: amountColor ? amountColor : colors.textSecondary,
    },
    rightArrow: {
      marginLeft: rs(13),
    },
    currencySymbol: {
      fontSize: rs(17),
      color: currencyIconFill,
      paddingLeft: rs(10),
      paddingTop: rs(3),
      paddingRight: rs(8)
    },
  });
