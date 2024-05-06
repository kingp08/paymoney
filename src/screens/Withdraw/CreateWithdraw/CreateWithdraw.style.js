import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const CreateWithdrawStyle = (...args) => {
  const [colors] = args;
  return StyleSheet.create({
    KeyboardAvoidingView: {
      flex: 1,
    },
    setUpBtnContainer: {
      backgroundColor: colors.btnSecondary,
      paddingBottom: rs(30),
      paddingTop: rs(16),
      borderTopWidth: 1,
      borderTopColor: colors.borderPrimaryVariant,
    },
    transactionStepContainer: {
      width: width - rs(80),
    },
    methodContainer: {
      marginBottom: rs(16),
      marginTop: rs(21),
    },
    currencyContainer: {
      marginBottom: rs(16),
    },
    customButton: {
      width: width - rs(80),
      marginBottom: rs(20),
    },
    contentWidth: {
      width: width - rs(80),
    },
    feeContainer: {
      fontFamily: 'Gilroy-Semibold',
      marginTop: rs(4),
      color: colors.textQuinary,
      width: width - rs(80),
    },
    bottomButton: {marginHorizontal: rs(40)},
  });
};
