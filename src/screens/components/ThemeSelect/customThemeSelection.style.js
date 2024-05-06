import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const customThemeSelection = (colors, theme, fixedWidth, isChecked) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor:
        isChecked && theme === 'light'
          ? colors.borderQuaternary
          : !isChecked && theme === 'light'
          ? colors.white
          : isChecked && theme === 'dark'
          ? colors.borderQuinary
          : !isChecked && theme === 'dark'
          ? colors.bastille
          : '',
      backgroundColor:
        theme == 'light'
          ? colors.white
          : theme == 'dark'
          ? colors.bastille
          : colors.white,
      width: fixedWidth || width / 2 - rs(27),
      borderRadius: 8,
      paddingHorizontal: rs(8),
      paddingTop: rs(8),
      flexDirection: 'row',
      marginRight: rs(15),
    },
    selectionBorder: {
      borderWidth: !isChecked ? 1 : 0,
      width: !isChecked ? rs(14) : 0,
      height: !isChecked ? rs(14) : 0,
      borderRadius: !isChecked ? 50 : 0,
      borderColor:
        !isChecked && theme === 'light'
          ? `${colors.lavenderGray}`
          : !isChecked && theme === 'dark'
          ? `${colors.manatee}`
          : '',
    },
    checkboxSize: {
      width: rs(14),
    },
    middleCont: {
      marginBottom: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    themeContainer: {
      marginTop: rs(6),
      marginBottom: rs(15),
      marginLeft: rs(14),
    },
    mb_5: {
      marginBottom: rs(5),
    },
    mb_6: {
      marginBottom: rs(6),
    },
    mb_4: {
      marginBottom: rs(4),
    },
  });
