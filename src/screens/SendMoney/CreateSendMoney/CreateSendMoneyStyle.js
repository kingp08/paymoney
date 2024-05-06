import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const depositStyle = (...args) => {
  const [colors] = args;
  return StyleSheet.create({
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      height: '100%',
      alignItems: 'center',
      paddingTop: rs(24),
      marginBottom: rs(100),
      backgroundColor: colors.bgSecondary,
    },
    step: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(13),
      marginBottom: rs(8),
      color: colors.textPrimary,
    },
    header: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      marginBottom: rs(12),
      color: colors.textSecondary,
    },
    description: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      marginBottom: rs(21),
      color: colors.textQuinary,
      marginHorizontal: rs(50),
      textAlign: 'center',
      lineHeight: rs(21),
    },
    inputTitle: {
      marginBottom: rs(6),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    proceedBtn: {
      width: '100%',
      textAlign: 'center',
      color: '#FFFFFF',
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      lineHeight: rs(18),
    },
    cancelBtn: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      color: colors.textQuinary,
      lineHeight: rs(18),
      paddingVertical: rs(10),
      textAlign: 'center',
    },
    currencyContainer: {
      marginBottom: rs(16),
    },
    AddnoteContainer: {
      marginBottom: rs(21),
    },
    feeText: {
      fontFamily: 'Gilroy-Semibold',
      marginTop: rs(4),
      color: colors.textQuinary,
      width: width - rs(80),
    },
    AddNoteheight: {
      height: rs(100),
    },
    customButtonMargin: {
      marginBottom: rs(20),
    },
    pageVisibility: {
      flex: 1,
    },
  });
};
