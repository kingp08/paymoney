import {StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
export const transactionStyle = (colors, index) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: rs(20),
      backgroundColor: colors.bgSecondary,
    },
    transactionLottieCont: {
      marginTop: rs(26),      marginBottom: rs(-10),
      justifyContent:'center',
      alignContent:'center',
      flexDirection:'row'
    },
    noTransactionsCard: {
      marginTop: rs(24),
    },
    mt_24: {marginTop: index == 0 ? rs(24) : 0},
  });
