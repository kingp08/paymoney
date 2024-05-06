import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const stepperStyle = (
  colors,
  totalStep,
  index,
  presentColor,
  defaultColor,
  presentStep,
  gap,
  layout,
  fixedHeight,
) =>
  StyleSheet.create({
    stepCont: {
      flexDirection: 'row',
    },
    step: {
      backgroundColor:
        index <= presentStep
          ? presentColor || colors.cornflowerBlue
          : defaultColor || colors.ifPrimary,
      width:
        ((layout ? layout : width) - rs(gap || 4) * (totalStep - 1)) /
        totalStep,
      height: rs(fixedHeight || 5),
      marginRight: index == totalStep ? 0 : rs(gap || 4),
      borderRadius: 98,
    },
  });
