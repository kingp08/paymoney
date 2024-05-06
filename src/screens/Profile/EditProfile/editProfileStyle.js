import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const editProfileStyle = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      height: '100%',
      paddingTop: rs(24),
      marginBottom: rs(20),
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(40),
      alignItems: 'center',
    },
    inputTitle: {
      marginBottom: rs(6),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    inputCont: {
      width: width - rs(80),
      marginTop: rs(40),
    },
    flexCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: rs(16),
    },
    selectInput: {
      width: width / 2 - rs(47),
    },
    mb_16: {
      marginBottom: rs(16),
    },
    inputWidth: {
      width: width - rs(80),
    },
  });
