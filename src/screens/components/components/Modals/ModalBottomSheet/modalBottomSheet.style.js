import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const modalBottomSheetStyle = colors =>
  StyleSheet.create({
    deleteConfirmationText: {
      width: width - rs(200),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(18),
      lineHeight: rs(24),
      color: colors.textSecondary,
      textAlign: 'center',
      marginBottom: rs(18),
      alignItems: 'center',
    },
    btnCont: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    btnCancel: {
      marginRight: 10,
      width: width / 2 - rs(60),
    },
    btnDelete: {
      width: width / 2 - rs(60),
    },
  });
