import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const withdrawSettingsOptionStyle = (...args) => {
  const [colors, containerHorizontalGap, bgColor, titleColor] = args;
  return StyleSheet.create({
    container: {
      marginVertical: rs(10),
      backgroundColor: bgColor,
      width: containerHorizontalGap
        ? width - rs(containerHorizontalGap)
        : width - rs(60),
      paddingTop: rs(14),
      borderRadius: 8,
      justifyContent: 'center',
    },
    containerPadding: {
      paddingVertical: rs(14),
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: rs(12),
    },
    title: {
      fontFamily: 'Gilroy-Semibold',
      color: titleColor,
      fontSize: rs(15),
      lineHeight: rs(18),
    },
    textStyle: {
      color: colors.textSecondary,
    },
    emailText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(13),
      lineHeight: rs(16),
      color: colors.textSecondary,
      width: width - rs(180),
    },
    nameText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
      marginBottom: rs(5),
    },
    addressText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(15),
      color: colors.textQuaternaryVariant,
      width: width - rs(180),
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: rs(12),
      paddingRight: rs(21.33),
      paddingVertical: rs(14),
    },
    bottomBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.borderPrimaryVariant,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionIcon: {
      marginRight: rs(16),
    },
    deleteIcon:{
      width: 30, 
      paddingLeft: rs(8),
    },
    editIcon:{
      width: 40, 
      paddingLeft: rs(16),
    }
  });
};
