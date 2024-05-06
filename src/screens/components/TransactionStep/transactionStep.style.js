import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const transactionStepStyle = (
  colors,
  totalStep,
  index,
  presentColor,
  defaultColor,
  presentStep,
  gap,
  fixedWidth,
) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    currentPage: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(12),
      marginBottom: rs(8),
      color: colors.textPrimary,
    },
    stepCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    step: {
      backgroundColor:
        index <= presentStep
          ? presentColor || colors.cornflowerBlue
          : defaultColor || colors.ifPrimary,
      width:
        totalStep &&
        (width - rs(150) - rs(gap || 4) * (totalStep - 1)) / totalStep,
      height: rs(fixedWidth || 5),
      marginRight: index == totalStep ? 0 : rs(gap || 4),
      borderRadius: 98,
    },
    header: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      marginBottom: rs(12),
      lineHeight: rs(19),
      color: colors.textSecondary,
    },
    description: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      marginTop: rs(16),
      color: colors.textQuinary,
      textAlign: 'center',
      lineHeight: rs(20),
    },
  });
