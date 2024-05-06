import {StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
import {dynamicStatusColor} from '../../utilities/dynamicStatusColor/dynamicStatusColor';
export const recentActivitiesStyle = (
  colors,
  bg,
  statusColor,
  borderColor,
  feeColor,
  index
) =>
  StyleSheet.create({
    container: {
      marginBottom: rs(10),
      borderRadius: 8,
      overflow: 'hidden',
      marginTop:index===0? rs(24):0
    },
    card: {
      overflow: 'hidden',
    },
    flex: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: bg ? bg : colors.bgQuaternary,
      borderRadius: 8,
      paddingHorizontal: rs(12),
      borderWidth: 1,
      borderColor: borderColor ? borderColor : colors.ifSecondary,
    },
    leftCont: {flexDirection: 'row', alignItems: 'center'},
    imageCont: {paddingVertical: rs(16)},
    actionCont: {
      marginLeft: rs(10),
    },
    actionTypeS: {
      color: colors.textSecondary,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      marginVertical: rs(5),
    },
    nameTextS: {
      color: colors.textQuaternaryVariant,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(10),
      lineHeight: rs(12),
    },
    feeText: {
      color: feeColor ? feeColor : colors.textQuaternaryVariant,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(10),
      lineHeight: rs(12),
    },
    feeCont: {
      alignItems: 'flex-end',
    },
    statusText: {
      color: dynamicStatusColor(statusColor, colors),
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(10),
      lineHeight: rs(12),
    },
    amountText: {
      color: colors.textSecondary,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      marginVertical: rs(5),
    },
  });
