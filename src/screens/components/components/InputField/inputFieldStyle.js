import {StyleSheet, Dimensions} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';

const {width} = Dimensions.get('screen');

export const inputFieldStyle = colors =>
  StyleSheet.create({
    cont: {
      flex: 1,
      backgroundColor: colors.bgSecondary,
      paddingHorizontal: rs(15),
    },
    card: {
      padding: rs(15),
      borderWidth: 1,
      borderRadius: 6,
      borderStyle: 'dashed',
      borderColor: colors.cornflowerBlue,
    },
    mt: {
      marginTop: rs(15),
    },
    subCont: {
      marginBottom: 15,
    },
    subCont2: {flexDirection: 'row', marginVertical: 15},
    label: {
      marginVertical: rs(10),
      color: colors.textSecondary,
    },
    error: {
      marginTop: rs(12),
      color: colors.ifOctonary,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      textAlign: 'center',
    },
    flexCont: {
      flexDirection: 'row',
    },
    flexCont2: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    submitBtn: {
      marginVertical: rs(15),
    },
    customInput: {
      marginRight: 10,
      width: width / 2 - rs(35),
    },
    selectInput: {
      width: width / 2 - rs(35),
      marginRight: 10,
    },
    otpInput: {
      marginRight: 17,
    },
    customButton: {
      marginRight: 10,
      width: width / 2 - rs(35),
    },
    customBtn: {marginTop: 15},
    btmSheet: {},
    img: {height: 100, width: 100, marginRight: 10},

    customPhoneContainer: {
      borderWidth: 1,
      borderRadius: 8,
      borderStyle: 'dashed',
      borderColor: colors.cornflowerBlue,
    },
    singlePhoneAlignment: {
      marginTop: 10,
      marginBottom: 10,
    },
  });
