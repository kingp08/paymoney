import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const moneyRequestTransactionDetailsStyle = (colors, status) =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      height: '100%',
      alignItems: 'center',
      paddingTop: rs(24),
      marginBottom:rs(100),
      backgroundColor: colors.bgSecondary,
    },
    amountContainer: {
      marginBottom: rs(16),
    },
    cardCont: {
      width: width - rs(40),
      backgroundColor: colors.bgQuaternary,
      marginBottom: rs(20),

      paddingTop: rs(14),
      borderRadius: 8,
    },
    headerText: {
      color: colors.textSeptenaryVariant,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(15),
      lineHeight: rs(18),
      paddingHorizontal: rs(12),
    },
    noteText: {
      color: colors.textQuinary,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      lineHeight: rs(20),
      marginTop: rs(10),
      paddingBottom: rs(13),
      paddingHorizontal: rs(12),
    },
    dynamicStatus: {
      color:
        status === 'Successful'
          ? colors.green
          : status === 'Rejected'
          ? colors.sunshade
          : status === 'Pending'
          ? colors.textQuaternaryVariant
          : colors.sunshade,
    },
    footerCont: {
      position: 'absolute',
      left: 0,
      bottom: 0,
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
    contentWidth: {
      width: width - rs(40),
    },
    btnOutline: {width: width - rs(80), marginVertical: rs(16)},
  });
